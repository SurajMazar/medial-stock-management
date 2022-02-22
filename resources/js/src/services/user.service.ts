import { Dispatch } from "redux";
import { fetchUserFail, fetchUsersRequest, fetchUsersSuccess } from "../store/action-reducer/user.slice";
import { setUrl } from "../utils/helper.utils";
import instance from '../utils/axios'
import { message } from "antd";

export const fetchUsersService = (params:any = {page:1}) =>{
  return async (dispatch:Dispatch) =>{
    dispatch(fetchUsersRequest());
    try{
      let url = setUrl(params,`api/users`)
      const response = await instance().get(url);
      let data = {
        users:response.data.data,
        meta:response.data.meta
      }
      dispatch(fetchUsersSuccess(data));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(fetchUserFail(e.response.data));
      }else{
        const errorRep = e.response.data;
        if(errorRep && errorRep.message){
          dispatch(fetchUserFail(e.response.data.message));
          message.error(e.response.data.message)
          if(errorRep.data && errorRep.data.errors){
            Object.values(errorRep.data.errors).map((value:any)=>{
              console.log(value);
              
              message.error(value[0])
            })
          }
        }else{
          dispatch(fetchUserFail("Something went wrong"));
          message.error("Something went wrong");
        }
      }
    }
  }
}

export const createUpdateUser = async (formData:FormData,id:string|undefined = undefined, callback:any = undefined)=>{
    try{
      if(id){
        await instance().post('/api/users/'+id,formData);
        message.success('User updated!');
      }else{
        await instance().post('/api/users',formData);
        message.success('User added!');
      }
      if(callback){
        callback()
      }
    }catch(e:any){
      const errorRep = e.response.data;
      if(errorRep && errorRep.message){
        message.error(e.response.data.message)
        if(errorRep.data && errorRep.data.errors){
          Object.values(errorRep.data.errors).map((value:any)=>{
            console.log(value);
            
            message.error(value[0])
          })
        }
      }else{
        message.error("Something went wrong");
      }
    }
}


export const fetchUserById = async (id:string)=> {
  try{
    const response = await instance().get(`api/users/${id}`);
    return response.data.data;
  }catch(e:any){
    const errorRep = e.response.data;
    if(errorRep && errorRep.message){
      message.error(e.response.data.message)
      if(errorRep.data && errorRep.data.errors){
        Object.values(errorRep.data.errors).map((value:any)=>{
          console.log(value);
          
          message.error(value[0])
        })
      }
    }else{
      message.error("Something went wrong");
    }
    return
  }
}


export const deleteUserService = async(id:string) => {
  try{
    await instance().delete(`api/users/${id}`);
    message.success('User was deleted');
  }catch(e:any){
    if(e && e.response && e.response.data && e.response.data.message){
      message.error(e.response.data.message)
    }else{
      message.error("Something went wrong");
    }
    return 
  }
}

export const changePassword =  async (id:string,formData:FormData) =>{
  try{
    await instance().post(`api/user/change-password/${id}`,formData);
    message.success('Password updated');
  }catch(e:any){
    if(e && e.response && e.response.data && e.response.data.message){
      message.error(e.response.data.message)
    }else{
      message.error("Something went wrong");
    }
  }
}



export const fetchDashboardOverview = async () => {
  try{
    const response = await instance().get('api/dashboard')
    return response.data.data;
  }catch(e:any){
    if(e && e.response && e.response.data && e.response.data.message){
      message.error(e.response.data.message)
    }else{
      message.error("Something went wrong");
    }
    return
  }
}