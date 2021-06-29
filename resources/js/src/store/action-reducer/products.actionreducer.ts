import { createSlice } from "@reduxjs/toolkit";
import PageMeta from "../../model/page_meta.model";
import Product, { ProductCategory } from "../../model/product.model";
import { updateItemById } from "../../utils/helper.utils";



export interface ProductStateInterface{
  categories:Array<ProductCategory>|undefined,
  loading:boolean,
  meta:PageMeta|undefined,
  errors:any,

  products:Product|undefined,
  loadingProduct:boolean,
  errorProduct:any,
  metaProduct:PageMeta|undefined,
}

const initialState:ProductStateInterface = {
  loading:false,
  errors:undefined,
  meta:undefined,
  categories:undefined,

  products:undefined,
  loadingProduct:false,
  errorProduct:undefined,
  metaProduct:undefined
  
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
  fetchProductsSuccess

} = PCSlice.actions;

export default PCSlice.reducer;