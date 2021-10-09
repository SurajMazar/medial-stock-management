import { createSlice } from "@reduxjs/toolkit";
import PageMeta from "../../model/page_meta.model";
import { sale, saleInvoice } from "../../model/sales.model";
import { removeItemById, updateItemById } from "../../utils/helper.utils";

export interface SalesStoreInterface{

  salesInvoices:Array<saleInvoice>|undefined,
  loadingSalesInvoices:boolean,
  metaSalesInvoice:PageMeta|undefined,
  errors:any,

  currentSaleInvoice:saleInvoice|undefined,
  sales:Array<sale> | undefined

}

const initialState:SalesStoreInterface = {
  loadingSalesInvoices:false,
  metaSalesInvoice:undefined,
  salesInvoices:undefined,
  errors:undefined,

  currentSaleInvoice:undefined,
  sales:undefined,
}

const SalesSlice = createSlice({
  name:'sales',
  initialState:initialState,
  reducers:{

    //sales invoices
    fetchSaleInvoiceRequest(state){
      state.loadingSalesInvoices = true;
    },


    fetchSaleInvoiceSuccess(state,actions){
      state.loadingSalesInvoices = false;
      state.metaSalesInvoice = actions.payload.meta;
      state.salesInvoices = actions.payload.saleInvoices
    },

    fetchSaleInvoiceFail(state,actions){
      state.loadingSalesInvoices = false;
      state.errors = actions.payload
    },


    fetchSaleInvoiceByIdSuccess(state,actions){
      state.loadingSalesInvoices = false;
      state.currentSaleInvoice = actions.payload;
      state.sales = actions.payload.sales
    },


    addSale(state,actions){
      state.loadingSalesInvoices = false;
      state.sales = state.sales ? state.sales.concat([actions.payload]) : [actions.payload];
    },

    updateSale(state,actions){
      state.loadingSalesInvoices = false;
      state.sales = updateItemById(state.sales,actions.payload);
    },

    deleteSale(state,actions){
      state.loadingSalesInvoices = false;
      state.sales = removeItemById(state.sales,actions.payload);
    },


  }
})

export const {
  fetchSaleInvoiceFail,
  fetchSaleInvoiceRequest,
  fetchSaleInvoiceSuccess,
  fetchSaleInvoiceByIdSuccess,

  addSale,
  deleteSale,
  updateSale
  
} = SalesSlice.actions

export default SalesSlice.reducer