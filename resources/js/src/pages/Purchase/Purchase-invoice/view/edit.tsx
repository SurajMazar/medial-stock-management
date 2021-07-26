import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, Input, Popconfirm, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import CustomSelect from '../../../../components/DataTable/select';
import Preloader from '../../../../components/Preloader';
import { purchase } from '../../../../model/purchase.model';
import { fetchCurrencies } from '../../../../services/currency.service';
import { deletePurchaseItem, fetchSinglePurchaseInvoice,updatePurchaseInvoice } from '../../../../services/purchase.service';
import { fetchVendors } from '../../../../services/vendor.service';
import { StoreInterface } from '../../../../store/store';
import { removeNullItems, setFormdata } from '../../../../utils/helper.utils';
import CreateEditPurchase from  './add-edit-purchase-item';

interface params{
  id:string
}

interface alterations{
  name:string,
  operation:"add"|"sub",
  amount:number
}

const EditPurchaseInvoice:React.FC = () =>{

  const [form] = Form.useForm();
  const {id} = useParams<params>();
  const dispatch = useDispatch();

  const state = useSelector((state:StoreInterface)=>state);
  const {currency,vendor,purchase} = state;


  const loadCurrency = (params:any) =>{
    dispatch(fetchCurrencies(params));
  }
  const loadVendors = (params:any) =>{
    dispatch(fetchVendors(params));
  }

  const [foreignCurrency,setForeignCurrency] = useState<boolean>(false);

  //editing
  const loadEditPurchaseInvoice = () =>{
    dispatch(fetchSinglePurchaseInvoice(id))
  }

  useEffect(()=>{
    loadEditPurchaseInvoice();
  },[]);


  const {purchaseInvoice,purchases} = purchase; // from store

  useEffect(() => {
    if(purchaseInvoice){
      if(purchaseInvoice.currency_id){setForeignCurrency(true);}
        form.setFieldsValue({
          ...purchaseInvoice,
          vendor_id:purchaseInvoice.vendor.id || '',
          currency_id:purchaseInvoice.currency? purchaseInvoice.currency.id : '',
          invoice_issue_date:moment(purchaseInvoice.invoice_issue_date),
          transaction_date:moment(purchaseInvoice.transaction_date),
        })
      if(JSON.parse(purchaseInvoice.alterations)){
        setAlt(JSON.parse(purchaseInvoice.alterations));
      }
    }
  }, [purchaseInvoice]);
  //editing


  //purchases
  const [showProductItemModel,setSPIM] = useState<boolean>(false);

  const deletePItem = (id:any)=>{
    dispatch(deletePurchaseItem(id));
  }
 

  //currency formatting
  const getCurrency = () =>{
    if(purchaseInvoice?.currency){
      return purchaseInvoice.currency?.symbol + " ";
    }
    return "Rs";
  }

  // bill total
  const [total,setTotal] = useState<number>(0);
  const calculateTotal = () =>{
    if(purchase.purchases && purchase.purchases.length){
      const purchases = purchase.purchases;
      let total = 0;
      purchases.forEach(p=>{
        total = total + Number(p.amount);
      })
      setTotal(total)
    }else{
      setTotal(0);
    }
  }

  useEffect(()=>{
    calculateTotal();
  },[purchase.purchases])//eslint-disable-line


  // alterations
  const [alt,setAlt] = useState<Array<alterations>>([]);

  const addAlt = () =>{
    const newAlt:alterations = {
      name:'',
      operation:'add',
      amount:0
    }
    let oldAlt = [...alt] ;
    setAlt(oldAlt.concat([newAlt]));
  }


  const onAltChange = (e:React.ChangeEvent<HTMLInputElement>
    |React.ChangeEvent<HTMLSelectElement>,i:number,type:'name'|'operation'|'amount') =>{
    const value:any = e.target.value;
    let obj = alt.find((item,index)=>index===i);
    let oldObj:any = {...obj}
    oldObj[type] = value 
    let oldArray = [...alt];
    oldArray[i] = oldObj
    setAlt(oldArray);
  }

  const removeAlteration = (i:number) =>{
    let oldObj = [...alt];
    oldObj = oldObj.filter((item,index)=>index !== i);
    setAlt(oldObj);
  }



  //grand total
  const [grandTotal,setGrandTotal] = useState<number>(0);

  const calculateGrandTotal = () =>{
    if(alt && alt.length){
      let gt = total;
      alt.forEach(item=>{
        if(item.operation === 'sub'){
          gt = parseFloat(gt.toString()) - parseFloat(item.amount.toString());
        }else{
          gt = parseFloat(gt.toString()) + parseFloat(item.amount.toString());
        }
      })
      setGrandTotal(gt);
    }
    else{
      setGrandTotal(total);
    }
  }

  useEffect(()=>{
    calculateGrandTotal();
  },[total,alt])//eslint-disable-line


  //update purchase invoice
  const updatePI = (values:any) =>{
    values = removeNullItems(values);
    const formDate = setFormdata({
      ...values,
      _method:'PUT',
      alterations:JSON.stringify(alt),
      total:grandTotal
    });
    dispatch(updatePurchaseInvoice(id,formDate))
  }


  //update purchase item
  const [editPI,setEditPI] = useState<purchase|undefined>(undefined);
  const openEditPIModal = (data:purchase)=>{
    setEditPI(data);
    setSPIM(true);
  }

  return(
    <>
    <Form
      form={form}
      layout={"vertical"}
      onFinish={updatePI}
    > 
    {purchase.loadingPurchaseInvoice?<Preloader/>:
    <>
      <div className="row">
        <div className="col-md-4">
          <Form.Item 
            label="Invoice no."
            name="invoice_number"
            rules={
              [{required:true,message:'Invoice number is required!'}]
            }
          >
            <Input placeholder="Invoice number" className="form-control"/>
          </Form.Item>                                         
        </div>

        <div className="col-md-4">
          <CustomSelect
            label="Vendor"
            name="vendor_id"
            loading={vendor.loading}
            options={vendor.vendors || []}
            placeholder="Select vendors"
            required={true}
            search={loadVendors}
          />
        </div>

        

        <div className="col-md-4">
          <Form.Item 
            label="Invoice issue date"
            name="invoice_issue_date"
            rules={
              [{required:true,message:'This field is required!'}]
            }
          >
            <DatePicker placeholder="Invoice issued date" className="form-control"/>
          </Form.Item>                                         
        </div>


        <div className="col-md-3">
          <Form.Item 
            label="Transaction date"
            name="transaction_date"
            rules={
              [{required:true,message:'This field is required!'}]
            }
          >
            <DatePicker placeholder="Transaction date" className="form-control"/>
          </Form.Item>                                         
        </div>

        <div className="col-md-3 mb-4">
          <Checkbox checked={foreignCurrency} onChange={
            (e)=>{
              if(e.target.checked){
                setForeignCurrency(true);
              }else{
                setForeignCurrency(false);
              }
            }
          }>
            foreign currency?
          </Checkbox>
        </div>


        {
          foreignCurrency?
          <div className="col-md-3">
            <CustomSelect
              label="Currency"
              name="currency_id"
              loading={currency.loading}
              options={currency.currencies || []}
              placeholder="Select currency"
              required={true}
              search={loadCurrency}
              displayValue={["country","name","symbol"]}
            />                                      
          </div>
        :''}

        <div className="col-md-3">
        <Form.Item 
            label="Note"
            name="note"
          >
            <TextArea className="form-control" rows={4}/>
          </Form.Item>
        </div>
        
      </div>

      <div className="row">

        <div className="col-12 d-flex align-items-center mb-2">
          <h3 className="text-16 d-flex">Purchase items<hr/></h3>
        </div>

        <div className="table-responsive p-05">
          <table className="table fix-width">
            <thead>
              <tr>
                <th>Sn</th>
                <th>Code</th>
                <th>Item Description</th>
                <th></th>
                <th>Pack</th>
                <th>Batch</th>
                <th>Exp.Date</th>
                <th>Qty</th>
                <th>Rate ({getCurrency()})</th>
                <th>Amount ({getCurrency()})</th>
                <th>M.R.P ({getCurrency()})</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                purchases && purchases.length?
                
                purchases.map((item,i)=>(
                  <tr key={item.id}>
                    <td>{i+1}</td>
                    <td>{item.code}</td>
                    <td>{item.product?.name}</td>
                    <td>{Number(item.free)?"Free":''}</td>
                    <td>{item.pack}</td>
                    <td>{item.batch}</td>
                    <td>{moment(item.expiry_date).format("YYYY-MM-DD")}</td>
                    <td>{item.quantity}</td>
                    <td>{Number(item.free)? item.free_rate +' ('+ item.free_rate_type+')': item.rate}</td>
                    <td>{item.amount}</td>
                    <td>{item.marked_price}</td>
                    <td>
                    <EditOutlined className="text-20px-primary mr-2" onClick={()=>openEditPIModal(item)}/>
                    <Popconfirm
                      placement="topRight"
                      title={"Are you sure wanna delete this item?"}
                      onConfirm={()=>deletePItem(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                     <DeleteOutlined className="text-20px-primary"/>
                    </Popconfirm>
                    </td>
                  </tr>
                )):
                <tr>
                  <td colSpan={12} className="text-center"> Sorry no items added</td>
                </tr>
              }

              <tr>
                <td colSpan={12}>
                  <div  className='d-flex justify-content-center'>
                    <Button type="link" size='small' 
                    icon={<PlusCircleOutlined />} onClick={()=>setSPIM(true)}>Add item</Button>
                  </div>
                </td>
              </tr>
              
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={9} className="text-center">Total</th>
                <th className="text-center" colSpan={1}>{total}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* alterations */}
      <div className="row mt-3">
        <div className="offset-md-6 col-md-6">

          <div className="row">
            <div className="col-md-12">
              <Button onClick={addAlt} htmlType="button" shape="round" type="primary">Add alteration</Button>
            </div>
          </div>

          <div className="row mt-3 pt-2 pb-2" style={{borderTop:"1px solid #bcbcbc",borderBottom:"1px solid #bcbcbc"}}>
            <div className="col-4">
              <h3 className="text-14px">Alteration name</h3>
            </div>
            <div className="col-2">
              <h3 className="text-14px">Operation</h3>
            </div>
            <div className="col-4">
              <h3 className="text-14px">Amount</h3>
            </div>
            <div className="col-2">
            </div>
          </div>

          <div className="mt-2">
          {
            alt && alt.length ?
            alt.map((item,i)=>(
              <div className="row mt-2" key={i} >
                <div className="col-4">
                  <input type="text"
                    onChange={(e)=>onAltChange(e,i,'name')}
                   className="form-control" placeholder="Alter. name" value={item.name}/>
                </div>
                <div className="col-2">
                  <select value={item.operation} className="form-control"
                  onChange={(e)=>onAltChange(e,i,'operation')}>
                    <option value="add">+</option>
                    <option value="sub">-</option>
                  </select>
                </div>
                <div className="col-4">
                  <input type="text" 
                  onChange={(e)=>onAltChange(e,i,'amount')}
                  className="form-control"  placeholder="Alter. name" value={item.amount}/>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <DeleteOutlined onClick={ ()=>removeAlteration(i)} className="btn btn-outline-danger"/>
                </div>
              </div>
            )):
            <div className="mt-2 text-center">
              Sorry no alterations found!
            </div>
          }
          </div>

          <div className="row mt-3 pt-2 pb-2" style={{borderTop:"1px solid #bcbcbc",borderBottom:"1px solid #bcbcbc"}}>
            <div className="col-6">
              <h4 className="text-center text-14px">Grand Total</h4>
            </div>
            <div className="col-6">
              <h4 className="text-center text-14px">{getCurrency()+grandTotal}</h4>
            </div>
            <div className="col-12 mt-3">
              <Form.Item 
                name="total_in_words"
                label="Total amount in words"
                rules={
                  [{required:true,message:'This field is required!'}]
                }
              >
                <Input placeholder="Total in words" className="form-control"/>
              </Form.Item>
            </div>
          </div>

        </div>
      </div>
      {/** end alterations */}
      
        
      <div className="row mt-4 justify-content-center">
        <Button className="btn btn-success mr-2" shape="round"  loading={purchase.loadingPurchaseInvoice}
        size="large" htmlType="submit">
          Save
        </Button>
        
        <Link to={`/vendors/${purchaseInvoice?.vendor?.id}/payments`}>
          <Button type="primary" shape="round" 
          size="large" htmlType="button">
            Add payment 
          </Button>
        </Link>
      </div>
    </>

    }
      
    </Form>
    <CreateEditPurchase 
    visible={showProductItemModel} 
    purchases={purchases} 
    editData={editPI}
    closeModal={()=>{
      setSPIM(false);
      setEditPI(undefined)
      }} />
    </>
  );
}

export default EditPurchaseInvoice;