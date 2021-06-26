import {createSlice} from '@reduxjs/toolkit';
import PageMeta from '../../model/page_meta.model';
import Vendor from '../../model/vendors.model';


export interface VendorStoreInterface {
  vendors:Array<Vendor>|undefined,
  loading:boolean,
  meta:PageMeta|undefined,
  errors:any
}

const initialState:VendorStoreInterface = {
  errors:undefined,
  loading:false,
  meta:undefined,
  vendors:undefined
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
    }

  }
});


export const {
  fetchVendorFail,
  fetchVendorRequest,
  fetchVendorSuccess
} = VendorSlice.actions;


export default VendorSlice.reducer;