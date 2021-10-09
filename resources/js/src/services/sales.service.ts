
import { message } from 'antd';
import { push } from 'connected-react-router';
import httpBase from '../utils/axios';
import { Dispatch } from 'redux';
import { setUrl } from '../utils/helper.utils';
import {
  fetchSaleInvoiceFail,
  fetchSaleInvoiceRequest,
  fetchSaleInvoiceSuccess,
  fetchSaleInvoiceByIdSuccess,
  addSale,
  updateSale,
  deleteSale
} from '../store/action-reducer/sales.actionreducer';

export const fetchSalesInvoice = (params:any = {page:1}) =>{
  return async (dispatch:Dispatch) =>{
    dispatch(fetchSaleInvoiceRequest());
    try{
      let url = setUrl(params,`api/sale-invoice`)
      const response = await httpBase().get(url);
      let data = {
        saleInvoices:response.data.data,
        meta:response.data.meta
      }
      dispatch(fetchSaleInvoiceSuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchSaleInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}

export const CreateSalesInvoiceService = (formData:FormData, callback:any = undefined) =>{
  return async (dispatch:Dispatch)=>{
    try{
      const response = await httpBase().post('api/sale-invoice',formData);
      dispatch(push('/sales-invoices/edit/'+ response.data.data.id));
      message.success('Sales invoice created successfully!!')
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchSaleInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }finally{
      if(callback){
        callback()
      }
    }
  }
}


export const updateSalesInvoiceService = (id:string|number ,formData:FormData, callback:any = undefined, notify=true) =>{
  return async (dispatch:Dispatch)=>{
    try{
      const response = await httpBase().post('api/sale-invoice/'+id,formData);
      if(notify) message.success('Sales invoice updated successfully!!')
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchSaleInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }finally{
      if(callback){
        callback()
      }
    }
  }
}

export const fetchSalesInvoiceByID = (id:number|string) =>{
  return async(dispatch:Dispatch)=>{
    dispatch(fetchSaleInvoiceRequest());
    try{
      const response =await httpBase().get(`api/sale-invoice/${id}`);
      dispatch(fetchSaleInvoiceByIdSuccess(response.data.data))
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchSaleInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}


export const createSaleItem = (formData:FormData,callback:any = undefined)=>{
  return async (dispatch:Dispatch)=>{
    dispatch(fetchSaleInvoiceRequest());
    try{
      const response = await httpBase().post(`api/sales`,formData);
      dispatch(addSale(response.data.data));
      if(callback) callback();
      message.success("Item added successfully!");
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchSaleInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}


export const updateSaleItem = (id:number,formData:FormData,callback:any = undefined)=>{
  return async (dispatch:Dispatch)=>{
    dispatch(fetchSaleInvoiceRequest());
    try{
      const response = await httpBase().post(`api/sales/${id}`,formData);
      dispatch(updateSale(response.data.data));
      if(callback) callback();
      message.success("Item updated successfully!");
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchSaleInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}



export const deleteSaleItem = (id:string)=>{
  return async (dispatch:Dispatch)=>{
    dispatch(fetchSaleInvoiceRequest());
    try{
      await httpBase().delete(`api/sales/${id}`);
      dispatch(deleteSale(id));
      message.success("Item deleted successfully!");
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchSaleInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}