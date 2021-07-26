import { FunctionOutlined } from '@ant-design/icons';
import { message } from 'antd';
import axios from 'axios';
import { Logout } from '../services/auth.service';
import store from '../store/store';

const state = store.getState();

let metaElement:any = document.head.querySelector('meta[name="api-base-url"]');

const httpBase = (login:boolean = false) =>{
  const baseURL = metaElement?.content || "";

const state = store.getState();

const instance = axios.create({
  baseURL:baseURL,
  headers:{
    Authorization:'Bearer ' + state.auth.token
  }
})

if(!login){
  instance.interceptors.request.use(function (config):any {
    // Do something before request is sent
    if(state.auth.authenticated) return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
}

instance.interceptors.response.use((response)=>response,
  (error)=>{
    if(error &&  error.response && error.response.status === 401 && state.auth.authenticated){
      store.dispatch(Logout(false));
      message.error('Login expired!')
    }else{
      return Promise.reject(error);
    }
  }
)
return instance;
}


export default httpBase;