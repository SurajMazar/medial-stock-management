import { createSlice } from "@reduxjs/toolkit";
import LabTest from "../../model/labTest.model";
import LabInvoice from '../../model/labInvoice.model';
import PageMeta from "../../model/page_meta.model";


export interface LabTestInterface{
  labTests:Array<LabTest>|undefined,
  loadingLT:boolean,
  metaLT:PageMeta|undefined,
  errorLT:any,

  labInvoices:Array<LabInvoice>|undefined,
  loadingLI:boolean,
  metaLI:PageMeta|undefined,
  errorLI:any
};

const initialState:LabTestInterface = {
  labTests:undefined,
  loadingLT:false,
  metaLT:undefined,
  errorLT:undefined,

  labInvoices:undefined,
  loadingLI:false,
  metaLI:undefined,
  errorLI:undefined

}

const LTSlice = createSlice({
  name:"labTests",
  initialState:initialState,
  reducers:{

    fetchLTrequest(state){
      state.loadingLT = true;
    },


    fetchLTsuccess(state,actions){
      state.loadingLT = false;
      state.labTests = actions.payload.lt;
      state.metaLT = actions.payload.meta
    },


    fetchLTfail(state,actions){
      state.loadingLT = false;
      state.errorLT = actions.payload;
    },


    //lab invoices

    fetchLIRequest(state){
      state.loadingLI = true;
    },

    fetchLIsuccess(state,actions){
      state.loadingLI = false;
      state.labInvoices = actions.payload.li;
      state.metaLI = actions.payload.meta
    },


    fetchLIfail(state,actions){
      state.loadingLI = false;
      state.errorLI = actions.payload;
    },

  }
});


export const {
  fetchLTfail,
  fetchLTrequest,
  fetchLTsuccess,


  fetchLIRequest,
  fetchLIfail,
  fetchLIsuccess

} = LTSlice.actions;

export default LTSlice.reducer;