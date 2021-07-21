import { createSlice } from "@reduxjs/toolkit";
import User from "../../model/user.model";

export interface AuthStore{
  token:string|undefined,
  authenticated:boolean,
  user:User|undefined,
  loading:boolean,
  error:any
}

const token = localStorage.getItem('auth_token');

const initialState:AuthStore = {
  token:token?token:undefined,
  authenticated:token?true:false,
  user:undefined,
  loading:false,
  error:undefined,
}

const AuthSlice = createSlice({
  name:'auth',
  initialState:initialState,
  reducers:{

    loginRequest(state){
      state.loading = true;
    },

    loginSuccess(state,actions){
      state.loading = false;
      state.authenticated = true;
      state.token = actions.payload.token;
      state.user = actions.payload.user;
    },

    loginFail(state,actions){
      state.loading = false;
      state.authenticated = false;
      state.error = actions.payload;
    },


    logout(state){
      state.loading = false;
      state.authenticated = false;
      state.token = undefined;
      state.user = undefined;
    }

  }
})

export const {
  loginFail,
  loginRequest,
  loginSuccess,
  logout
} = AuthSlice.actions;

export default AuthSlice.reducer;



