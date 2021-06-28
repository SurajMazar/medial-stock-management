import {createSlice} from '@reduxjs/toolkit';
import PageMeta from '../../model/page_meta.model';
import Vendor from '../../model/vendors.model';


export interface VendorStoreInterface {
  vendors:Array<Vendor>|undefined,
  loading:boolean,
  meta:PageMeta|undefined,
  errors:any,

  vendor:Vendor|undefined,
  fetchingVendor:boolean,
  errorVendor:any,
}

const initialState:VendorStoreInterface = {
  errors:undefined,
  loading:false,
  meta:undefined,
  vendors:undefined,

  vendor:undefined,
  fetchingVendor:false,
  errorVendor:undefined,
}

const VendorSlice = createSlice({
  name:'vendor',
  initialState:initialState,
  reducers:{
    
    fetchVendorRequest(state){
      state.loading = true;
    },

    fetchVendorSuccess(state,actions){
      state.loading = false;
      state.vendors = actions.payload.vendors;
      state.meta = actions.payload.meta;
    },

    fetchVendorFail(state,actions){
      state.loading = false;
      state.errors = actions.payload;
    },


    fetchSingleVendorRequest(state){
      state.fetchingVendor = true;
    },

    fetchSingleVendorSuccess(state,actions){
      state.fetchingVendor = false;
      state.vendor = actions.payload;
    },

    updateVendorSuccess(state){
      state.fetchingVendor = false;
    },

    fetchSingleVendorFail(state,actions){
      state.fetchingVendor = false;
      state.errorVendor = actions.payload;
    },

  }
});


export const {
  fetchVendorFail,
  fetchVendorRequest,
  fetchVendorSuccess,

  fetchSingleVendorFail,
  fetchSingleVendorRequest,
  fetchSingleVendorSuccess,

  updateVendorSuccess
  
} = VendorSlice.actions;


export default VendorSlice.reducer;