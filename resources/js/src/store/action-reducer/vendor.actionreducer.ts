import {createSlice} from '@reduxjs/toolkit';
import PageMeta from '../../model/page_meta.model';
import Payment from '../../model/payment.model';
import Vendor from '../../model/vendors.model';
import { removeItemById, updateItemById } from '../../utils/helper.utils';


export interface VendorStoreInterface {
  vendors:Array<Vendor>|undefined,
  loading:boolean,
  meta:PageMeta|undefined,
  errors:any,

  vendor:Vendor|undefined,
  fetchingVendor:boolean,
  errorVendor:any,

  payments:Array<Payment>|undefined,
  loadingPayment:boolean,
  errorPayment:any,
  metaPayments:PageMeta|undefined

}

const initialState:VendorStoreInterface = {
  errors:undefined,
  loading:false,
  meta:undefined,
  vendors:undefined,

  vendor:undefined,
  fetchingVendor:false,
  errorVendor:undefined,

  errorPayment:undefined,
  loadingPayment:false,
  payments:undefined,
  metaPayments:undefined,

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


    // payments
    fetchVendorPaymentRequest(state){
      state.loadingPayment = true;
    },

    fetchVendorPaymentSuccess(state,actions){
      state.loadingPayment = false;
      state.payments = actions.payload.payments;
      state.metaPayments = actions.payload.meta;
    },

    fetchVendorPaymentFail(state,actions){
      state.loadingPayment = false;
      state.errorPayment = actions.payload;
    },


    addPayment(state,actions){
      state.loadingPayment = false;
      state.payments = [actions.payload].concat(state.payments);
    },


    updatePayment(state,actions){
      state.loadingPayment = false;
      state.payments = updateItemById(state.payments,actions.payload);
    },

    deletePayment(state,actions){
      state.loadingPayment = false;
      state.payments = removeItemById(state.payments,actions.payload)
    }

  }
});


export const {
  fetchVendorFail,
  fetchVendorRequest,
  fetchVendorSuccess,

  fetchSingleVendorFail,
  fetchSingleVendorRequest,
  fetchSingleVendorSuccess,

  updateVendorSuccess,

  fetchVendorPaymentFail,
  fetchVendorPaymentRequest,
  fetchVendorPaymentSuccess,
  addPayment,
  updatePayment,
  deletePayment
  
} = VendorSlice.actions;


export default VendorSlice.reducer;