import {
  fetchCatFail,
  fetchCatRequest,
  fetchCatSuccess,

  createPCrequest,
  createPCsuccess,

  updatePCsuccess

} from '../store/action-reducer/products.actionreducer';

import instance from "../utils/axios";
import { setUrl } from "../utils/helper.utils";
import { Dispatch } from "redux";
import { message } from 'antd';


export const fetchProductCategory = (params:any = {page:1}) => {
  return async (dispatch:Dispatch) =>{
    dispatch(fetchCatRequest());
    try{
      let url = setUrl(params,`api/product_category`)
      const response = await instance.get(url);
      let data = {
        categories:response.data.data,
        meta:response.data.meta
      }
      dispatch(fetchCatSuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchCatFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}


export const createProductCategory = (formdata:FormData,callback:any = undefined) => {
  return async (dispatch:Dispatch) =>{
    dispatch(createPCrequest());
    try{
      const response = await instance.post(`api/product_category`,formdata);
      dispatch(createPCsuccess(response.data.data));
      message.success("Product category created!")
      if(callback) callback();
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchCatFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}


export const updateProductCategory = (id:number,formdata:FormData,callback:any = undefined) => {
  return async (dispatch:Dispatch) =>{
    dispatch(createPCrequest());
    try{
      const response = await instance.post(`api/product_category/${id}`,formdata);
      dispatch(updatePCsuccess(response.data.data));
      message.success("Product category updated!")
      if(callback) callback();
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchCatFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}