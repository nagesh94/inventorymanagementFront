import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSupplier=createAsyncThunk('supplier/fetchSupplier',

    async () => {
        try {
          const url = 'http://localhost:8000/api/v1/suppliers/'
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
export const fetchsidebar=createAsyncThunk('supplier/fetchsidebar',

async ()=>{
    try {
      const url='http://localhost:8000/api/v1/users/as4df4sad5f45asd4f/'
      const token=localStorage.getItem('token')
      const response=await axios.get(url,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
    
      return response.data.data.firstname
    } catch (err) {
      console.log(err.response)
    }
   }

)

const suppliersSlice=createSlice({
    name:"supplier",
    initialState:{data:[],
    sidebarName:""},
    reducers:{},
    extraReducers:{
        [fetchSupplier.pending]:()=>{
            console.log("pending....")
        },
        [fetchSupplier.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,data:payload}
        },
        [fetchsidebar.pending]:()=>{
            console.log("pending....")
        },
        [fetchsidebar.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,sidebarName:payload}
        },
    }
})

export  default suppliersSlice.reducer;