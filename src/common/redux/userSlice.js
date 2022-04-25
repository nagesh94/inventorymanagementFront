import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser=createAsyncThunk('user/fetchUser',

    async () => {
        try {
            console.log("hello")
          const url = 'http://localhost:8000/api/v1/users/asdfasdf4654/'
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



const userSlice=createSlice({
    name:"user",
    initialState:{data:[]},
    reducers:{},
    extraReducers:{
        [fetchUser.pending]:()=>{
            console.log("pending....")
        },
        [fetchUser.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,data:payload}
        },
       
    }
})

export  default userSlice.reducer;