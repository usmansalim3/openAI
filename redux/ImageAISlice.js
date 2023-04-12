import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment/moment";

const initialState={
    image:[],
    Imageloading:false,
    Imagesuccess:false,
    Imageerror:null
  }
export const getImageThunk=createAsyncThunk('/getImage',async({token,prompt},{rejectWithValue})=>{
    try{
        const response=await axios.post('https://openai-backend-g0a1.onrender.com/todo/todos',{
          prompt
        },{
          headers:{
            'authorization': `Bearer ${token}`
          }
        })
        
        const payload=response.data.json.map(element => {
          return {b64_json:element.b64_json,time:moment().format('MMMM Do YYYY'),prompt}
        });
        return payload

      }catch(error){
        //console.log(error)
        console.log(error.response.data)
        //console.log(error.response.data.error)
        return rejectWithValue(error.response.data.error)
      }
})
const ImageAISlice=createSlice({
    name:'ImageAISlice',
    initialState,
    reducers:{
      signOutImage:(state)=>{
        state.image=[]
        state.Imageloading=false
        state.Imagesuccess=false
        state.Imageerror=null
      },
      clearImageError:(state)=>{
        state.Imageloading=false
        state.Imagesuccess=false
        state.Imageerror=null
      }
    },
    extraReducers:{
        [getImageThunk.pending]:(state)=>{
            state.Imageloading=true;
            state.Imageerror=null;
        },
        [getImageThunk.fulfilled]:(state,{payload})=>{
            state.image=payload
            state.Imagesuccess=true;
            state.Imageloading=false;
            state.Imageerror=null;
        },
        [getImageThunk.rejected]:(state,{payload})=>{
            console.log(payload)
            state.Imageerror=payload;
            state.Imagesuccess=false;
            state.Imageloading=false;
            
        }
    }
})
export default ImageAISlice.reducer;
export const{signOutImage,clearImageError}=ImageAISlice.actions
