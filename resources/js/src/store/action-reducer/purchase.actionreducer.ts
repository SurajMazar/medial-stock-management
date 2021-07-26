import { createSlice } from "@reduxjs/toolkit";
import PageMeta from "../../model/page_meta.model";
import { purchase, purchase_invoice } from "../../model/purchase.model";
import { removeItemById, updateItemById } from "../../utils/helper.utils";


export interface PurchaseStoreInterface{
  loadingPurchaseInvoice:boolean,
  PurchaseInvoices:Array<purchase_invoice>|undefined,
  errorPurchaseInvoice:any,
  metaPurchaseInvoice:PageMeta|undefined,

  purchaseInvoice:purchase_invoice|undefined,
  purchases:Array<purchase>|undefined
}


const initialState:PurchaseStoreInterface = {
  PurchaseInvoices:undefined,
  errorPurchaseInvoice:undefined,
  loadingPurchaseInvoice:false,
  metaPurchaseInvoice:undefined,

  purchaseInvoice:undefined,
  purchases:undefined
}


const PISlice = createSlice({
  name:'purchase',
  initialState:initialState,
  reducers:{

    fetchPurchasInvoicesRequest(state){
      state.loadingPurchaseInvoice = true;
    },

    fetchPurchaseInvoiceSuccess(state,actions){
      state.loadingPurchaseInvoice = false;
      state.PurchaseInvoices = actions.payload.purchaseInvoices;
      state.metaPurchaseInvoice = actions.payload.meta;
    },


    fetchPurchaseInvoiceFail(state,actions){
      state.loadingPurchaseInvoice = false;
      state.errorPurchaseInvoice = actions.payload;
    },


    updatePurchaseInvoiceSuccess(state,actions){
      state.loadingPurchaseInvoice = false;
      state.purchaseInvoice = actions.payload;
    },
    // view related

    fetchSinglePurchaseInvoiceRequest(state){
      state.loadingPurchaseInvoice = true;
    },

    fetchSinglePurchaseInvoiceSuccess(state,actions){
      state.loadingPurchaseInvoice = false;
      state.purchases = actions.payload.purchases;
      state.purchaseInvoice = actions.payload;
    },

    
    addPurchase(state,actions){
      state.loadingPurchaseInvoice = false;
      state.purchases = state.purchases ? state.purchases.concat([actions.payload]) : [actions.payload];
    },

    updatePurchase(state,actions){
      state.loadingPurchaseInvoice = false;
      state.purchases = updateItemById(state.purchases,actions.payload);
    },

    deletePurchase(state,actions){
      state.loadingPurchaseInvoice = false;
      state.purchases = removeItemById(state.purchases,actions.payload);
    }


  }
});


export const {
  fetchPurchasInvoicesRequest,
  fetchPurchaseInvoiceFail,
  fetchPurchaseInvoiceSuccess,
  updatePurchaseInvoiceSuccess,

  addPurchase,
  updatePurchase,
  deletePurchase,
  fetchSinglePurchaseInvoiceRequest,
  fetchSinglePurchaseInvoiceSuccess

} = PISlice.actions;

export default PISlice.reducer;