import { message } from "antd";
import { push } from "connected-react-router";
import { Dispatch } from "redux"
import {
  fetchLTfail,
  fetchLTrequest,
  fetchLTsuccess
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
    return undefined;
    message.error("Something went wrong");
  }
}