import { createSlice } from "@reduxjs/toolkit";
import Currency from "../../model/currency.model";
import PageMeta from "../../model/page_meta.model";
import { updateItemById } from "../../utils/helper.utils";


export interface CurrencyStateInterface{
  currencies:Array<Currency>|undefined,
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
    },


    createCurrencySuccess(state,actions){
      state.loading=false;
      state.currencies = [actions.payload].concat(state.currencies);
    },

    updateCurrencySuccess(state,actions){
      state.loading = false;
      state.currencies = updateItemById(state.currencies,actions.payload)
    }

  }
});

export const {
  fetchCurrencyFail,
  fetchCurrencyRequest,
  fetchCurrencySuccess,

  createCurrencySuccess,
  updateCurrencySuccess,
} = currencySlice.actions;


export default currencySlice.reducer;