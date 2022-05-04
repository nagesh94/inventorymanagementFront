import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




const sellSlice=createSlice({
    name:"sell",
    initialState:{data:[],
    },
    reducers:{
        cartAdd:(state,{payload})=>{
            
            state.data=payload
            
        },
        deleteCart:(state,{payload})=>{
            state.data.splice(payload,1)
            
        }
    },
   
})


export  default sellSlice.reducer;
export const {cartAdd,deleteCart} =sellSlice.actions