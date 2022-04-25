import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchColor=createAsyncThunk('color/fetchColor',

    async () => {
        try {
            console.log("hello")
          const url = 'http://localhost:8000/api/v1/colors/'
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
export const fetchCategory=createAsyncThunk('category/fetchCategory',

    async () => {
        try {
            console.log("hello")
          const url = 'http://localhost:8000/api/v1/categories/'
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
export const fetchSize=createAsyncThunk('size/fetchSize',

    async () => {
        try {
            console.log("hello")
          const url = 'http://localhost:8000/api/v1/sizes/'
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
export const fetchBrand=createAsyncThunk('brand/fetchBrand',

    async () => {
        try {
            console.log("hello")
          const url = 'http://localhost:8000/api/v1/brands/'
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




const attributeSlice=createSlice({
    name:"attribute",
    initialState:{
        color:[],
        category:[],
        size:[],
        brand:[]
    },
    reducers:{},
    extraReducers:{
        [fetchColor.pending]:()=>{
            console.log("pending....color")
        },
        [fetchColor.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,color:payload}
        },
        [fetchCategory.pending]:()=>{
            console.log("pending....category")
        },
        [fetchCategory.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,category:payload}
        },
        [fetchSize.pending]:()=>{
            console.log("pending....size")
        },
        [fetchSize.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,size:payload}
        },
        [fetchBrand.pending]:()=>{
            console.log("pending....size")
        },
        [fetchBrand.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,brand:payload}
        },
       
    }
})

export  default attributeSlice.reducer;