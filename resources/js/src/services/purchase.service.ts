
import {
  fetchPurchasInvoicesRequest,
  fetchPurchaseInvoiceSuccess,
  fetchPurchaseInvoiceFail,
  updatePurchaseInvoiceRequest,
  updatePurchaseInvoiceSuccess,
  deletePurchaseInvoiceSuccess,

  fetchSinglePurchaseInvoiceRequest,
  fetchSinglePurchaseInvoiceSuccess,

  addPurchase,
  updatePurchase,
  deletePurchase

} from '../store/action-reducer/purchase.actionreducer';
import { Dispatch } from 'redux';
import { setUrl } from '../utils/helper.utils';
import instance from '../utils/axios';
import { message } from 'antd';
import { push } from 'connected-react-router';
import httpBase from '../utils/axios';

export const fetchPurchaseInvoice= (params:any = {page:1}) => {
  return async (dispatch:Dispatch) =>{
    dispatch(fetchPurchasInvoicesRequest());
    try{
      let url = setUrl(params,`api/purchase_invoice`)
      const response = await instance().get(url);
      let data = {
        purchaseInvoices:response.data.data,
        meta:response.data.meta
      }
      dispatch(fetchPurchaseInvoiceSuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchPurchaseInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}

export const createPurchaseInvoice = (formData:FormData,callBack:any = undefined)=>{
  return async(dispatch:Dispatch)=>{
    try{
      const response = await instance().post(`api/purchase_invoice`,formData);
      message.success("Purchase invoice created successfully!");
      if (callBack) callBack();
      dispatch(push('/purchase-invoices/view/'+ response.data.data.id));
      return;
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchPurchaseInvoiceFail(e.response.data));
      }else{
        dispatch(fetchPurchaseInvoiceFail("Something went wrong"))
      }
    }
  }
}

export const updatePurchaseInvoice = (id:string,formData:FormData,showMesssage:boolean = false)=>{
  return async(dispatch:Dispatch)=>{
    dispatch(updatePurchaseInvoiceRequest());
    try{
      const response = await instance().post(`api/purchase_invoice/${id}`,formData);
      dispatch(updatePurchaseInvoiceSuccess(response.data.data));
      if(showMesssage) message.success("Purchase invoice updated!");
    }catch(e:any){
      if(e.response && e.response.data){
        message.error(e.response.data.message);
        dispatch(fetchPurchaseInvoiceFail(e.response.data));
      }else{
        message.error("Something went wrong");
        dispatch(fetchPurchaseInvoiceFail('Something went wrong'));
      }
    }
  }
}

export const fetchSinglePurchaseInvoice = (id:string)=>{
  return async(dispatch:Dispatch) =>{
    dispatch(fetchSinglePurchaseInvoiceRequest());
    try{
      const response = await instance().get(`api/purchase_invoice/`+id);
      dispatch(fetchSinglePurchaseInvoiceSuccess(response.data.data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchPurchaseInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}


export const deletePurchaseInvoiceService = (id:string)=>{
  return async(dispatch:Dispatch) =>{
    dispatch(fetchSinglePurchaseInvoiceRequest());
    try{
       await instance().delete(`api/purchase_invoice/trash/`+id);
      dispatch(deletePurchaseInvoiceSuccess(id));
      dispatch(push('/purchase-invoices'))
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchPurchaseInvoiceFail(e.response.data));
      }else{
        dispatch(fetchPurchaseInvoiceFail("Something went wrong"));
        message.error("Something went wrong");
      }
    }
  }
}


export const createPurchase = (formData:FormData,callback:any = undefined)=>{
  return async (dispatch:Dispatch)=>{
    dispatch(fetchSinglePurchaseInvoiceRequest());
    try{
      const response = await instance().post(`api/purchases`,formData);
      dispatch(addPurchase(response.data.data));
      if(callback) callback();
      message.success("Item added successfully!");
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchPurchaseInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}


export const updatePurchaseItem = (id:number,formData:FormData,callback:any = undefined)=>{
  return async (dispatch:Dispatch)=>{
    dispatch(fetchSinglePurchaseInvoiceRequest());
    try{
      const response = await instance().post(`api/purchases/${id}`,formData);
      dispatch(updatePurchase(response.data.data));
      if(callback) callback();
      message.success("Item updated successfully!");
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchPurchaseInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}



export const deletePurchaseItem = (id:string)=>{
  return async (dispatch:Dispatch)=>{
    dispatch(fetchSinglePurchaseInvoiceRequest());
    try{
      await httpBase().delete(`api/purchases/${id}`);
      dispatch(deletePurchase(id));
      message.success("Item deleted successfully!");
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchPurchaseInvoiceFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}