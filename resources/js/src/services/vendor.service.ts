
import { message } from "antd";
import { push } from "connected-react-router";
import { Dispatch } from "redux";
import {
  fetchVendorFail,
  fetchVendorSuccess,
  fetchVendorRequest,
  
  fetchSingleVendorFail,
  fetchSingleVendorRequest,
  fetchSingleVendorSuccess,
} from '../store/action-reducer/vendor.actionreducer';
import instance from "../utils/axios";
import { setUrl } from "../utils/helper.utils";


export const fetchVendors = (params:any = {page:1})=>{
  return async (dispatch:Dispatch) =>{
    dispatch(fetchVendorRequest());
    try{
      let url = setUrl(params,`api/vendors`)
      const response = await instance().get(url);
      let data = {
        vendors:response.data.data,
        meta:response.data.meta
      }
      dispatch(fetchVendorSuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchVendorFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
  
}


export const createVendor = (formData:FormData,callback:any|null = null)=>{
  return async(dispatch:Dispatch)=>{
    dispatch(fetchVendorRequest());
    try{
      const response = await instance().post('/api/vendors',formData);
      if(callback) callback();
      message.success("Vendor created successfully");
      dispatch(push('/vendors/'+response.data.data.id+'/details'));
    }catch(e){
      message.error("Something went wrong")
    }
  }
}


export const fetchVendor = (id:string) =>{
  return async (dispatch:Dispatch)=>{
    dispatch(fetchSingleVendorRequest());
    try{
      const response = await instance().get('/api/vendors/'+id);
      dispatch(fetchSingleVendorSuccess(response.data.data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchSingleVendorFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}


export const updateVendor = (id:string,formData:FormData) =>{
  return async (dispatch:Dispatch)=>{
    dispatch(fetchSingleVendorRequest());
    try{
      const response = await instance().post('/api/vendors/'+id,formData);
      dispatch(fetchSingleVendorSuccess(response.data.data));
      message.success("Vendor updated successfully");
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchSingleVendorFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}