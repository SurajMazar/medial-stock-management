import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, Input, Popconfirm, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CustomSelect from '../../../../components/DataTable/select';
import Preloader from '../../../../components/Preloader';
import { fetchCurrencies } from '../../../../services/currency.service';
import { deletePurchaseItem, fetchSinglePurchaseInvoice } from '../../../../services/purchase.service';
import { fetchVendors } from '../../../../services/vendor.service';
import { StoreInterface } from '../../../../store/store';
import CreateEditPurchase from  './add-edit-purchase-item';

interface params{
  id:string
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
    return "Rs ";
  }


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

  return(
    <>
    <Form
      form={form}
      layout={"vertical"}
    > 
    {purchase.loadingPurchaseInvoice?<Preloader/>:
    <>
      <div className="row">
        <div className="col-md-4">
          <Form.Item 
            label="Invoice no."
            name="invoice_number"
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
          >
            <DatePicker placeholder="Invoice issued date" className="form-control"/>
          </Form.Item>                                         
        </div>


        <div className="col-md-3">
          <Form.Item 
            label="Transaction date"
            name="transaction_date"
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
        <table className="table fix-width text-center">
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
                <th></th>
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
                    <td>{JSON.parse(item.free||'')?"Free":''}</td>
                    <td>{item.pack}</td>
                    <td>{item.batch}</td>
                    <td>{moment(item.expiry_date).format("YYYY-MM-DD")}</td>
                    <td>{item.quantity}</td>
                    <td>{JSON.parse(item.free||'')? item.rate +' ('+ item.free_rate_type+')': item.rate}</td>
                    <td>{item.amount}</td>
                    <td>{item.marked_price}</td>
                    <td>
                    <Popconfirm
                      placement="topRight"
                      title={"Are you sure wanna delete this item?"}
                      onConfirm={()=>deletePItem(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                     <DeleteOutlined className="text-primary"/>
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
    </>
    }
    </Form>
    <CreateEditPurchase visible={showProductItemModel} closeModal={()=>setSPIM(false)} />
    </>
  );
}

export default EditPurchaseInvoice;