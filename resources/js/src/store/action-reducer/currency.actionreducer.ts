import { createSlice } from "@reduxjs/toolkit";
import PageMeta from "../../model/page_meta.model";


export interface CurrencyStateInterface{
  currencies:[]|undefined,
  loading:boolean,
  error:any,
  meta:PageMeta|undefined
}

const initialState:CurrencyStateInterface = {
  currencies:undefined,
  error:undefined,
  loading:false,
  meta:undefined
} 


const currencySlice = createSlice({
  name:'currency',
  initialState:initialState,
  reducers:{

    fetchCurrencyRequest(state){
      state.loading = true;
    },

    fetchCurrencySuccess(state,actions){
      state.loading = false;
      state.currencies = actions.payload.currencies;
      state.meta = actions.payload.meta
    },

    fetchCurrencyFail(state,actions){
      state.loading = false;
      state.error = actions.payload
    }

  }
});