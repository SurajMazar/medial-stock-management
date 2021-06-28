import { createSlice } from "@reduxjs/toolkit";
import PageMeta from "../../model/page_meta.model";
import { ProductCategory } from "../../model/product.model";
import { updateItemById } from "../../utils/helper.utils";



export interface ProductStateInterface{
  categories:Array<ProductCategory>|undefined,
  loading:boolean,
  meta:PageMeta|undefined,
  errors:any
}

const initialState:ProductStateInterface = {
  loading:false,
  errors:undefined,
  meta:undefined,
  categories:undefined,
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
    }
  }
});


export const {
  fetchCatFail,
  fetchCatRequest,
  fetchCatSuccess,

  createPCrequest,
  createPCsuccess,
  
  updatePCsuccess

} = PCSlice.actions;

export default PCSlice.reducer;