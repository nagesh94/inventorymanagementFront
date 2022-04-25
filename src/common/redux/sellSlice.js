import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




const sellSlice=createSlice({
    name:"sell",
    initialState:{data:[]},
    reducers:{
        cartAdd:(state,{payload})=>{
            
            state.data=payload
        }
    },
   
})

export  default sellSlice.reducer;
export const {cartAdd} =sellSlice.actions