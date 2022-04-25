import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct=createAsyncThunk('producr/fetchProduct',

    async ({filterOption,filter,sort}) => {
        try {
          
          console.log(filterOption)
          // filter=JSON.stringify(filter)
         
         

            const url = `http://localhost:8000/api/v1/products?${filterOption}=${filter}&sort=${sort}/`
         
          
          const token = localStorage.getItem('token')
        
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
            
  
          })
         
          console.log(response) 
          
          return response.data.data
          
        } catch (err) {
          console.log(err.response)
        }
      }

)
export const fetchProductAll=createAsyncThunk('producr/fetchProductAll',

    async () => {
        try {
          
          
          // filter=JSON.stringify(filter)
          const  url=`http://localhost:8000/api/v1/products`
          
          const token = localStorage.getItem('token')
        
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
            
  
          })
         
          console.log(response) 
          
          return response.data.data
          
        } catch (err) {
          console.log(err.response)
        }
      }

)



const productSlice=createSlice({
    name:"product",
    initialState:{data:[],
    allData:[]},
    reducers:{},
    extraReducers:{
        [fetchProduct.pending]:()=>{
            console.log("pending....")
        },
        [fetchProduct.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,data:payload}
        },
        [fetchProductAll.pending]:()=>{
            console.log("pending....")
        },
        [fetchProductAll.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,allData:payload}
        },
       
    }
})

export  default productSlice.reducer;