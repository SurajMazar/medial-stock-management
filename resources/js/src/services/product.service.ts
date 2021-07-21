import {
  fetchCatFail,
  fetchCatRequest,
  fetchCatSuccess,

  createPCrequest,
  createPCsuccess,

  updatePCsuccess,

  fetchProductsFail,
  fetchProductsRequest,
  fetchProductsSuccess,

  createProductSuccess

} from '../store/action-reducer/products.actionreducer';

import instance from "../utils/axios";
import { setUrl } from "../utils/helper.utils";
import { Dispatch } from "redux";
import { message } from 'antd';
import { push } from 'connected-react-router';


export const fetchProductCategory = (params:any = {page:1}) => {
  return async (dispatch:Dispatch) =>{
    dispatch(fetchCatRequest());
    try{
      let url = setUrl(params,`api/product_category`)
      const response = await instance().get(url);
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
      const response = await instance().post(`api/product_category`,formdata);
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
      const response = await instance().post(`api/product_category/${id}`,formdata);
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


export const fetchProducts = (params:any = {page:1}) => {
  return async (dispatch:Dispatch) =>{
    dispatch(fetchProductsRequest());
    try{
      let url = setUrl(params,`api/products`)
      const response = await instance().get(url);
      let data = {
        products:response.data.data,
        meta:response.data.meta
      }
      dispatch(fetchProductsSuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchProductsFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}


export const createProduct = (formdata:FormData,callback:any = undefined) => {
  return async (dispatch:Dispatch) =>{
    dispatch(fetchProductsRequest());
    try{
      const response = await instance().post(`api/products`,formdata);
      dispatch(createProductSuccess(response.data.data));
      message.success("Product created!")
      dispatch(push('/products/view/'+response.data.data.id))
      if(callback) callback();
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchProductsFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}

export const fetchProductByID = async(id:string)=>{
  try{
    const response = await instance().get(`api/products/${id}`);
    return response.data.data;
  }catch(e:any){
    if(e.response && e.response.data){
      message.error(e.response.data.message);
      return undefined;
    }else{
      message.error("Something went wrong");
      return undefined;
    }
  }
}


export const updateProduct = async(id:string,formData:FormData)=>{
  try{
    await instance().post(`api/products/${id}`,formData);
    message.success("Product updated successfully!");
    return;
  }catch(e:any){
    if(e.response && e.response.data){
      message.error(e.response.data.message);
      return undefined;
    }else{
      message.error("Something went wrong");
      return undefined;
    }
  }
}