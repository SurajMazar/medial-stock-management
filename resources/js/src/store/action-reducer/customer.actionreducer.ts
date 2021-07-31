import { createSlice } from "@reduxjs/toolkit";
import Customer from "../../model/customer.model";
import PageMeta from "../../model/page_meta.model";


export interface CustomerStoreInterface{
  customers:Array<Customer>|undefined,
  loading:boolean,
  metaCustomers:PageMeta|undefined,
  error:any,

  currentEditing:Customer|undefined
}


const initialState:CustomerStoreInterface = {
  customers:undefined,
  loading:false,
  metaCustomers:undefined,
  error:undefined,

  currentEditing:undefined
}


const CustomerSlice = createSlice({
  name:'customer',
  initialState:initialState,
  reducers:{
    fetchCustomerRequest(state){
      state.loading = true;
    },
    
    fetchCustomerSuccess(state,actions){
      state.loading = false;
      state.customers = actions.payload.customers;
      state.metaCustomers = actions.payload.meta;
    },

    fetchCustomerFail(state,actions){
      state.loading = false;
      state.error = actions.payload;
    },

    // create update
    createUpdateCustomerRequest(state){
      state.loading = true;
    },

    createUpdateCustomerSuccess(state){
      state.loading = false;
    },

    // fetch current editing data
    fetchEditingSuccess(state,actions){
      state.loading = false;
      state.currentEditing = actions.payload;
    },

    removeEditingData(state){
      state.currentEditing = undefined;
    }
  }
});


export const {
  fetchCustomerFail,
  fetchCustomerRequest,
  fetchCustomerSuccess,

  createUpdateCustomerRequest,
  createUpdateCustomerSuccess,

  fetchEditingSuccess,
  removeEditingData

} = CustomerSlice.actions;


export default CustomerSlice.reducer;