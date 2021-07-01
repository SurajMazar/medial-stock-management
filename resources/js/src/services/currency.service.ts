import { message } from 'antd';
import { Dispatch } from 'redux';
import {
fetchCurrencyFail,
fetchCurrencyRequest,
fetchCurrencySuccess,

createCurrencySuccess,
updateCurrencySuccess
} from '../store/action-reducer/currency.actionreducer';
import instance from '../utils/axios';
import { setUrl } from '../utils/helper.utils';


export const fetchCurrencies = (params:any = {page:1}) =>{
  return async (dispatch:Dispatch) =>{
    dispatch(fetchCurrencyRequest());
    try{
      let url = setUrl(params,`api/currency`)
      const response = await instance.get(url);
      let data = {
        currencies:response.data.data,
        meta:response.data.meta
      }
      dispatch(fetchCurrencySuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchCurrencyFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}


export const createCurrency = (formdata:FormData,callback:any = undefined) => {
  return async (dispatch:Dispatch) =>{
    dispatch(fetchCurrencyRequest());
    try{
      const response = await instance.post(`api/currency`,formdata);
      dispatch(createCurrencySuccess(response.data.data));
      message.success("Currency added!")
      if(callback) callback();
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchCurrencyFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}

export const updateCurrency = (id:number,formdata:FormData,callback:any = undefined) => {
  return async (dispatch:Dispatch) =>{
    dispatch(fetchCurrencyRequest());
    try{
      const response = await instance.post(`api/currency/${id}`,formdata);
      dispatch(updateCurrencySuccess(response.data.data));
      message.success("Currency updated!")
      if(callback) callback();
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchCurrencyFail(e.response.data));
      }
      message.error("Something went wrong");
    }
  }
}