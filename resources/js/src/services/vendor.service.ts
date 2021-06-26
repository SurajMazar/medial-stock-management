
import { message } from "antd";
import { Dispatch } from "redux";
import {fetchVendorFail,fetchVendorSuccess,fetchVendorRequest} from '../store/action-reducer/vendor.actionreducer';
import instance from "../utils/axios";
import { setUrl } from "../utils/helper.utils";


export const fetchVendors = (params:any = {page:1})=>{
  return async (dispatch:Dispatch) =>{
    dispatch(fetchVendorRequest());
    try{
      let url = setUrl(params,`api/vendors`)
      const response = await instance.get(url);
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


export const createVendor = (formData:FormData)=>{
  return async(dispatch:Dispatch)=>{
    dispatch(fetchVendorRequest());
    try{
      await instance.post('/api/vendors',formData);
      message.success("Vendor created successfully");
      
    }catch(e){
      message.error("Something went wrong")
    }
  }
}