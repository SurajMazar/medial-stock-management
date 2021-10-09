import { message } from "antd";
import { Dispatch } from "redux"
import {
  fetchLTfail,
  fetchLTrequest,
  fetchLTsuccess,

  fetchLIRequest,
  fetchLIfail,
  fetchLIsuccess

} from '../store/action-reducer/labTests.actionreducer';
import instance from '../utils/axios';
import { setUrl } from "../utils/helper.utils";
import history from "../utils/history.util";

export const fetchLabTests = (params:any = {page:1}) =>{
  return async (dispatch:Dispatch) =>{
    dispatch(fetchLTrequest());
    try{
      let url = setUrl(params,`api/lab-tests`)
      const response = await instance().get(url);
      let data = {
        lt:response.data.data,
        meta:response.data.meta
      }
      dispatch(fetchLTsuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchLTfail(e.response.data));
      }else{
        dispatch(fetchLTfail("Something went wrong"));
        message.error("Something went wrong");
      }
    }
  }
}



export const createlabTest = async(formData:FormData)=>{
  try{
    const response = await instance().post('api/lab-tests',formData);
    message.success("Lab test created!");
    history.push(`/lab-tests/edit/${response.data.data.id}`)
  }catch(e:any){
    message.error("Something went wrong");
  }
}



export const updatelabTest = async(id:string|number,formData:FormData)=>{
  try{
    await instance().post('api/lab-tests/'+id,formData);
    message.success("Lab test updated!");
  }catch(e:any){
    message.error("Something went wrong");
  }
}


export const fetchLabTestById = async (id:number|string) =>{
  try{
    const response =await instance().get(`api/lab-tests/${id}`);
    return response.data.data;
  }catch(e:any){
    message.error("Something went wrong");
    return undefined;
  }
}



export const fetchLabInvoices = (params:any = {page:1}) =>{
  return async (dispatch:Dispatch) =>{
    dispatch(fetchLIRequest());
    try{
      let url = setUrl(params,`api/lab-invoices`)
      const response = await instance().get(url);
      let data = {
        li:response.data.data,
        meta:response.data.meta
      }
      dispatch(fetchLIsuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchLIfail(e.response.data));
      }else{
        dispatch(fetchLIfail("Something went wrong"));
        message.error("Something went wrong");
      }
    }
  }
}


export const createLabInvoice = async(formData:FormData)=>{
  try{
    const response = await instance().post('api/lab-invoices',formData);
    message.success("Lab Invoice created!");
    history.push(`/lab-invoices/edit/${response.data.data.id}`)
  }catch(e:any){
    message.error("Something went wrong");
  }
}


export const updateLabInvoice = async(id:number|string,formData:FormData,notify = true)=>{
  try{
    const response = await instance().post('api/lab-invoices/'+id,formData);
    if(notify) {message.success("Lab Invoice updated!");}
    // history.push(`/lab-tests/edit/${response.data.data.id}`)
  }catch(e:any){
    message.error("Something went wrong");
  }
}

export const deleteLabInvoice = async(id:number|string)=>{
  try{
    const response = await instance().delete('api/lab-invoices/'+id);
    message.success("Lab Invoice deleted!");
  }catch(e:any){
    message.error("Something went wrong");
  }
}


export const fetchLabInvoiceByID = async(id:number|string)=>{
  try{
    const response = await instance().get('api/lab-invoices/'+id);
    return response.data.data
    // history.push(`/lab-tests/edit/${response.data.data.id}`)
  }catch(e:any){
    message.error("Something went wrong");
    return undefined
  }
}

