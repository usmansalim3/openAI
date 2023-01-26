import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { create } from "yup/lib/Reference";

const initialState={
    savedImages:[],
    loading:false,
    success:false,
    error:null
}
export const uploadImageThunk=createAsyncThunk('/uploadImage',async({token,imageData,prompt,time,userID},{rejectWithValue})=>{
    try{
        await axios.post('http://192.168.0.195:4000/todo/uploadImage',{
          prompt,
          image:imageData,
          time,
          userID
        },{
          headers:{
            'authorization': `Bearer ${token}`
          }
        })
      }catch(error){
        //console.log(error)
        console.log(error.response.data)
        //console.log(error.response.data.error)
      }
})
export const getSavedImagesThunk=createAsyncThunk('/getSavedImages',async({userID,token})=>{
  try{
    const response=await axios.post('http://192.168.0.195:4000/todo/getSavedImages',{
      userID
    },{
      headers:{
        'authorization': `Bearer ${token}`
      }
    })
    return response.data.images
  }catch(error){
    //console.log(error)
    console.log(error.response.data)
    //console.log(error.response.data.error)
  }
})
const savedImagesSlice=createSlice({
    name:'SavedImages',
    initialState,
    extraReducers:{
      [getSavedImagesThunk.fulfilled]:(state,{payload})=>{
        state.savedImages=payload;
        state.loading=false;
      },
      [getSavedImagesThunk.pending]:(state)=>{
        state.loading=true;
      }
    }
})
export default savedImagesSlice.reducer;
