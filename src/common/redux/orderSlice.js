import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderByCustomer=createAsyncThunk('customer/fetchOrderByCustomer',

    async (cid) => {
        try {
            console.log("hello")
          const url = `http://localhost:8000/api/v1/users/${cid}/orders`
          const token = localStorage.getItem('token')
        
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
            
  
          })
         
          console.log(response) 
          
          return response.data.order
          
        } catch (err) {
          console.log(err.response)
        }
      }

)

export const fetchOrderByUser=createAsyncThunk('user/fetchOrderByUser',

    async () => {
        try {
            console.log("hello")
          const url = `http://localhost:8000/api/v1/orders/`
          const token = localStorage.getItem('token')
        
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
            
  
          })
         
          console.log(response) 
          
          return response.data.order
          
        } catch (err) {
          console.log(err.response)
        }
      }

)



const orderSlice=createSlice({
    name:"order",
    initialState:{dataCustomer:[],dataUser:[]},
    reducers:{},
    extraReducers:{
        [fetchOrderByCustomer.pending]:()=>{
            console.log("pending....customerorder")
        },
        [fetchOrderByCustomer.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,dataCustomer:payload}
        },
        [fetchOrderByUser.pending]:()=>{
            console.log("pending....userorder")
        },
        [fetchOrderByUser.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,dataUser:payload}
        },
       
    }
})

export  default orderSlice.reducer;