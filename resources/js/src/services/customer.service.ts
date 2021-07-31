import { message } from 'antd';
import { push } from 'connected-react-router';
import { Dispatch } from 'redux';
import {
  fetchCustomerFail,
  fetchCustomerRequest,
  fetchCustomerSuccess,

  createUpdateCustomerRequest,
  createUpdateCustomerSuccess,

  fetchEditingSuccess,
  removeEditingData
} from '../store/action-reducer/customer.actionreducer';

import instance from '../utils/axios';
import { setUrl } from '../utils/helper.utils';



export const fetchCustomerService = (params:any = {page:1}) =>{
  return async (dispatch:Dispatch) =>{
    dispatch(fetchCustomerRequest());
    try{
      let url = setUrl(params,`api/customers`)
      const response = await instance().get(url);
      let data = {
        customers:response.data.data,
        meta:response.data.meta
      }
      dispatch(fetchCustomerSuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchCustomerFail(e.response.data));
      }else{
        dispatch(fetchCustomerFail("Something went wrong"));
        message.error("Something went wrong");
      }
    }
  }
}

export const createUpdateCustomer = (formData:FormData,id:string|undefined = undefined)=>{
  return async (dispatch:Dispatch)=>{
    dispatch(createUpdateCustomerRequest());
    try{
      if(id){
        const response = await instance().post('/api/customers/'+id,formData);
        dispatch(createUpdateCustomerSuccess());
        message.success('Customer updated!');
        dispatch(push('/customers/view/'+response.data.data.id))
      }else{
        const response = await instance().post('/api/customers',formData);
        dispatch(createUpdateCustomerSuccess());
        message.success('Customer added!');
        dispatch(push('/customers/view/'+response.data.data.id))
      }
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchCustomerFail(e.response.data));
      }else{
        dispatch(fetchCustomerFail("Something went wrong"));
        message.error("Something went wrong");
      }
    }
  }
}


export const fetchCustomerById = (id:string) =>{
  return async (dispatch:Dispatch) =>{
    dispatch(fetchCustomerRequest());
    try{
      const response = await instance().get(`api/customers/${id}`);
      let data = response.data.data;
      dispatch(fetchEditingSuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchCustomerFail(e.response.data));
      }else{
        dispatch(fetchCustomerFail("Something went wrong"));
        message.error("Something went wrong");
      }
    }
  }
}


export const removeEditingCustomer = ()=>{
  return (dispatch:Dispatch)=>{
    dispatch(removeEditingData())
  }
}