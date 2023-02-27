import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { create } from "yup/lib/Reference";

const initialState={
    savedImages:[],
    loading:false,
    success:false,
    error:""
}
export const uploadImageThunk=createAsyncThunk('/uploadImage',async({token,imageData,prompt,time,userID},{rejectWithValue})=>{
    try{
        await axios.post('http://192.168.0.189:4000/todo/uploadImage',{
          prompt,
          image:imageData,
          time,
          userID
        },{
          headers:{
            'authorization': `Bearer ${token}`
          }
        })
        console.log('upload')
      }catch(error){
        //console.log(error)
        return rejectWithValue(error.response.data);
        //console.log(error.response.data.error)
      }
})
export const getSavedImagesThunk=createAsyncThunk('/getSavedImages',async({userID,token})=>{
  try{
    const response=await axios.post('http://192.168.0.189:4000/todo/getSavedImages',{
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
export const DeleteImageThunk=createAsyncThunk('/DeleteImage',async({userID,token,image})=>{
  console.log('delete')
  try{
    const response=await axios.post('http://192.168.0.189:4000/todo/DeleteImage',{
      userID,
      image
    },{
      headers:{
        'authorization': `Bearer ${token}`
      }
    })
    return;
  }catch(error){
    //console.log(error)
    console.log(error.response.data)
    //console.log(error.response.data.error)
  }
})
const savedImagesSlice=createSlice({
    name:'SavedImages',
    initialState,
    reducers:{
      clearError:(state)=>{
        state.error=""
      },
      signOutSaved:(state)=>{
        state.savedImages=[]
        state.loading=false
        state.success=false
        state.error=""
      }
    },
    extraReducers:{
      [getSavedImagesThunk.fulfilled]:(state,{payload})=>{
        state.savedImages=payload;
        state.loading=false;
        state.error="";
      },
      [getSavedImagesThunk.pending]:(state)=>{
        state.loading=true;
        state.error="";
      },
      [uploadImageThunk.rejected]:(state,{payload})=>{
        console.log(payload.error)
        state.error=payload.error
      }
    }
})
export default savedImagesSlice.reducer;
export const {clearError,signOutSaved}=savedImagesSlice.actions
