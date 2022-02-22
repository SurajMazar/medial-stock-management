import { message } from "antd";
import { push } from "connected-react-router";
import { Dispatch } from "redux";
import {
  loginSuccess,
  loginRequest,
  loginFail,
  logout
} from '../store/action-reducer/auth.actionreducer';
import instance from "../utils/axios";



export const login = (form:FormData) =>{
  return async(dispatch:Dispatch)=>{
    dispatch(loginRequest());
    try{
      const response = await instance(true).post('/api/login',form);
      let data = {
        token:response.data.data.token,
        user:response.data.data.user,
        role:response.data.data.role
      }
      localStorage.setItem('auth_token',data.token);
      localStorage.setItem('userId',data.user.id);
      localStorage.setItem('role',data.role)
      dispatch(loginSuccess(data));
      dispatch(push('/'));
    }catch(e:any){
      if(e.response && e.response.data){
        dispatch(loginFail(e.response.data.message));
        message.error(e.response.data.message);
        return undefined;
      }else{
        dispatch(loginFail("Something went wrong"));
        message.error("Something went wrong");
        return undefined;
      }
    }
  }
}

export const Logout = (mess:boolean = true) =>{
  return (dispatch:Dispatch)=>{
    dispatch(logout());
    dispatch(push('/login'));
    localStorage.clear();
    if(mess)  message.success('Logged out successfully!!')
  }
}