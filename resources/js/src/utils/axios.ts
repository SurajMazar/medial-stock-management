import { message } from 'antd';
import axios from 'axios';
import { Logout } from '../services/auth.service';
import store from '../store/store';


let metaElement:any = document.head.querySelector('meta[name="api-base-url"]');

const httpBase = () =>{
  const baseURL = metaElement?.content || "";

const state = store.getState();

const instance = axios.create({
  baseURL:baseURL,
  headers:{
    Authorization:'Bearer ' + state.auth.token
  }
})

instance.interceptors.response.use((response)=>response,
  (error)=>{
    if(error &&  error.response && error.response.status === 401){
      store.dispatch(Logout());
      message.error('Login expired!')
    }else{
      return Promise.reject(error);
    }
  }
)
return instance;
}


export default httpBase;