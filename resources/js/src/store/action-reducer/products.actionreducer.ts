import { createSlice } from "@reduxjs/toolkit";
import PageMeta from "../../model/page_meta.model";
import Product, { ProductCategory } from "../../model/product.model";
import { purchase } from "../../model/purchase.model";
import { updateItemById } from "../../utils/helper.utils";



export interface ProductStateInterface{
  categories:Array<ProductCategory>|undefined,
  loading:boolean,
  meta:PageMeta|undefined,
  errors:any,

  products:Array<Product>|undefined,
  loadingProduct:boolean,
  errorProduct:any,
  metaProduct:PageMeta|undefined,

  stocks:Array<purchase>|undefined,
  loadingStocks:boolean,
  metaStocks:PageMeta|undefined,
  errorStocks:any,
}

const initialState:ProductStateInterface = {
  loading:false,
  errors:undefined,
  meta:undefined,
  categories:undefined,

  products:undefined,
  loadingProduct:false,
  errorProduct:undefined,
  metaProduct:undefined,

  loadingStocks:false,
  metaStocks:undefined,
  errorStocks:undefined,
  stocks:undefined
  
}



const PCSlice = createSlice({
  name:'product',
  initialState:initialState,
  reducers:{
    fetchCatRequest(state){
      state.loading = true;
    },


    fetchCatSuccess(state,actions){
      state.loading = false;
      state.categories = actions.payload.categories,
      state.meta = actions.payload.meta
    },

    fetchCatFail(state,actions){
      state.loading = false;
      state.errors = actions.payload;
    },

    createPCrequest(state){
      state.loading = true;
    },
    createPCsuccess(state,actions){
      state.loading = false;
      state.categories = [actions.payload].concat(state.categories);
    },

    updatePCsuccess(state,actions){
      state.loading = false;
      state.categories = updateItemById(state.categories,actions.payload);
    },


    // product related
    fetchProductsRequest(state){
      state.loadingProduct = true;
    },

    fetchProductsSuccess(state,actions){
      state.loadingProduct = false;
      state.products = actions.payload.products;
      state.metaProduct = actions.payload.meta
    },

    fetchProductsFail(state,actions){
      state.loadingProduct = false;
      state.errorProduct = actions.payload;
    },


    createProductSuccess(state,actions){
      state.loadingProduct = false;
      state.products = [actions.payload].concat(state.products);
    },


    // stocks
    fetchStocksRequest(state){
      state.loadingStocks = true;
    },


    fetchStocksSuccess(state,actions){
      state.loadingStocks = false;
      state.stocks = actions.payload.stocks;
      state.metaStocks = actions.payload.meta;
    },

    fetchStocksFail(state,actions){
      state.loadingStocks = false;
      state.errorStocks = actions.payload;
    }
  }
});


export const {
  fetchCatFail,
  fetchCatRequest,
  fetchCatSuccess,

  createPCrequest,
  createPCsuccess,
  updatePCsuccess,


  fetchProductsFail,
  fetchProductsRequest,
  fetchProductsSuccess,

  createProductSuccess,

  fetchStocksFail,
  fetchStocksRequest,
  fetchStocksSuccess,


} = PCSlice.actions;

export default PCSlice.reducer;