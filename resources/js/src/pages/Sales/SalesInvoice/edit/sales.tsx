import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sale } from '../../../../model/sales.model';
import { deleteSaleItem, updateSalesInvoiceService } from '../../../../services/sales.service';
import { removeNullItems, salesQuantityFormatter, setFormdata } from '../../../../utils/helper.utils';
import {useParams} from 'react-router-dom'
import useAfterEffect from '../../../../hooks/useAfterEffect';

interface Props {
  sales: Array<sale> | undefined,
  form:any,
  alterations:string | undefined,
  openModel:()=>void
}

interface alterations{
  name:string,
  operation:"add"|"sub",
  amount:number
}

const SalesInSalesInvoice: React.FC<Props> = (props) => {
  //props
  const { sales, form ,alterations,openModel} = props
  const dispatch = useDispatch();
  const {id} = useParams<any>()
  // state
  const [alt,setAlt] = useState<Array<alterations>>([]);
  const [total,setTotal] = useState<number>(0);
  const [grandTotal,setGrandTotal] = useState<number>(0);
  const [updating,setUpdating] = useState(false)

  const calculateTotal = () =>{
    if(sales && sales.length){
      let total = 0;
      sales.forEach(p=>{
        total = total + Number(p.total);
      })
      setTotal(total)
    }else{
      setTotal(0);
    }
  }

  useEffect(()=>{
    calculateTotal();
  },[sales])//eslint-disable-line
  // end total with out alterations

  // alterations

  const addAlt = () =>{
    const newAlt:alterations = {
      name:'',
      operation:'add',
      amount:0
    }
    let oldAlt = [...alt] ;
    setAlt(oldAlt.concat([newAlt]));
  }


  useEffect(()=>{
    if(alterations && JSON.parse(alterations)){
      setAlt(JSON.parse(alterations))
    }
  },[alterations])


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


  const calculateGrandTotal = () =>{
    if(alt && alt.length){
      let gt = total;
      alt.forEach(item=>{
        if(item.operation === 'sub'){
          gt = parseFloat(gt.toString()) - parseFloat(item.amount?item.amount.toString():"0");
        }else{
          gt = parseFloat(gt.toString()) + parseFloat(item.amount?item.amount.toString():"0");
        }
      })
      setGrandTotal(gt);
    }
    else{
      setGrandTotal(total);
    }
  }

  useEffect(()=>{
    if(sales) calculateGrandTotal();
  },[total,alt])//eslint-disable-line


  const handleSubmit = (notify:boolean=true) =>{
    if(notify) setUpdating(true)
    let values = form.getFieldsValue()
    values.amount = grandTotal
    values._method = 'PUT'
    values.alterations = JSON.stringify(alt)
    const formData = setFormdata(removeNullItems(values))
    dispatch(updateSalesInvoiceService(id,formData,()=>setUpdating(false),notify))
  }


  useAfterEffect(()=>{
    handleSubmit(false)
  },[grandTotal]);



  // delete item
  const deleteSItem = (id:any) =>{
    dispatch(deleteSaleItem(id))
  }


  

  return (
    <>
      <div className="row">

        <div className="col-12 d-flex align-items-center mb-2">
          <h3 className="text-16 d-flex">Sales items<hr /></h3>
        </div>

        <div className="table-responsive p-05">
          <table className="table fix-width">
            <thead>
              <tr>
                <th>Sn</th>
                <th>Item Description</th>
                <th>Batch</th>
                <th>Qty (Rs)</th>
                <th>Rate (Rs)</th>
                <th>Amount (Rs)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

            {
                sales && sales.length?
                
                sales.map((item,i)=>(
                  <tr key={item.id}>
                    <td>{i+1}</td>
                    <td>
                      {item.purchase?item.purchase.product?.name:''}
                      {/* <Link to={`/products/view/${item.product?.id}`}>
                      </Link> */}
                    </td>
                    <td>
                      {item.purchase?item.purchase.batch:''}  
                    </td>
                    <td>
                      {salesQuantityFormatter(item)}
                    </td>
                    <td>{item.rate}</td>
                    <td>{item.total}</td>
                    <td>
                    {/* <EditOutlined className="text-20px-primary mr-2" onClick={()=>openEditPIModal(item)}/> */}
                    <Popconfirm
                      placement="topRight"
                      title={"Are you sure wanna delete this item?"}
                      onConfirm={()=>deleteSItem(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined className="text-20px-primary"/>
                    </Popconfirm>
                    </td>
                  </tr>
                )):
                <tr>
                  <td colSpan={7} className="text-center"> Sorry no items added</td>
                </tr>
              }

              <tr>
                <td colSpan={7}>
                  <div  className='d-flex justify-content-center'>
                    <Button type="link" size='small' 
                    icon={<PlusCircleOutlined />} 
                    onClick={openModel}
                    >Add item</Button>
                  </div>
                </td>
              </tr>

            </tbody>
            <tfoot>
              <tr>
                <th colSpan={5} className="text-center">Total</th>
                <th className="text-left" colSpan={1}>Rs {total}</th>
              </tr>
            </tfoot>
          </table>

        <div className="d-flex mt-4">
          <div className="col-md-6 offset-6">
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
                <h4 className="text-center text-14px">
                  Rs {grandTotal}
                </h4>
              </div>
            </div>

            {/* <div className="col-md-12 mt-2 text-center text-15px-primary">
              Please update the total amount before exiting
            </div> */}

          </div>
        </div>
          
        </div>

        <div className="floating-button">
          <Button size="middle" shape="round" className="btn-success"
          onClick={()=>handleSubmit()}
          loading={updating}
          // disabled={total===0}
          >Update</Button>
        </div>
      </div>
    </>
  );
}

export default SalesInSalesInvoice;