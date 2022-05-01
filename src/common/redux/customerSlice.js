import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCustomer=createAsyncThunk('customer/fetchCustomer',

    async () => {
        try {
            console.log("hello")
          const url = 'http://localhost:8000/api/v1/customers/'
          const token = localStorage.getItem('token')
        
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
            
  
          })
         
          console.log(response) 
          
          return response.data.customer
          
        } catch (err) {
          console.log(err.response)
        }
      }

)



const customerSlice=createSlice({
    name:"customer",
    initialState:{data:[]},
    reducers:{},
    extraReducers:{
        [fetchCustomer.pending]:()=>{
            console.log("pending....")
        },
        [fetchCustomer.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,data:payload}
        },
       
    }
})

export  default customerSlice.reducer;