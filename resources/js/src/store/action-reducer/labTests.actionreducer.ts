import { createSlice } from "@reduxjs/toolkit";
import LabTest from "../../model/labTest.model";
import PageMeta from "../../model/page_meta.model";


export interface LabTestInterface{
  labTests:Array<LabTest>|undefined,
  loadingLT:boolean,
  metaLT:PageMeta|undefined,
  errorLT:any
};

const initialState:LabTestInterface = {
  labTests:undefined,
  loadingLT:false,
  metaLT:undefined,
  errorLT:undefined
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
    }

  }
});


export const {
  fetchLTfail,
  fetchLTrequest,
  fetchLTsuccess
} = LTSlice.actions;

export default LTSlice.reducer;