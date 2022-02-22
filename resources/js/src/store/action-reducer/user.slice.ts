import { createSlice } from "@reduxjs/toolkit";
import PageMeta from "../../model/page_meta.model";
import User from "../../model/user.model";

export interface UserStore {
  Users:Array<User>,
  meta:PageMeta|undefined,
  loading:boolean,
  errors:any
}

const initialState:UserStore = {
  Users:[],
  errors:undefined,
  loading:false,
  meta:undefined
}


const UserSlice = createSlice({
  name:'users',
  initialState:initialState,
  reducers:{

    fetchUsersRequest(state){
      state.loading = true
    },


    fetchUsersSuccess(state,actions){
      state.Users = actions.payload.users
      state.meta = actions.payload.meta
      state.loading = false
    },

    fetchUserFail(state,actions){
      state.Users = []
      state.meta = undefined
      state.errors = actions.payload
      state.loading = false
    }

  }
})


export const {
  fetchUserFail,
  fetchUsersRequest,
  fetchUsersSuccess
} = UserSlice.actions

export default UserSlice.reducer