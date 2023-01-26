import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    userID:'',
    error:'',
    token:'',
    email:'',
    userpic:null,
    loading:false,
    success:false
}

export const registerThunk=createAsyncThunk('users/register',async ({email,password,phoneNumber,pfp},{rejectWithValue})=>{
    try{
        const response=await axios.post('http://192.168.0.195:4000/users/register',{
          email,
          password,
          phoneNumber,
          pfp
        })
        return response.data;
      }catch(error){
        return rejectWithValue(error.response.data.error);
      }
})

export const loginThunk=createAsyncThunk('users/login',async({email,password},{rejectWithValue})=>{
    try{
        const response=await axios.post('http://192.168.0.195:4000/users/login',{
            email,
            password
        })
        return response.data
    }catch(error){
        console.log(error)
        return rejectWithValue(error.response.data.error);
    }
})

const LogSlice=createSlice({
    name:'LogSlice',
    initialState,
    reducers:{
        screenRemoval:(state)=>{
            state.error='';
            
        }
    },
    extraReducers:{
        [registerThunk.rejected]:(state,{payload})=>{
            state.error=payload;
            state.success=false;
            state.loading=false;
            console.log('reject')
        },
        [registerThunk.fulfilled]:(state,{payload})=>{
            state.userID=payload.userID
            state.token=payload.token;
            state.email=payload.email;
            state.userpic=payload.userpic;
            state.success=true;
            state.error='';
            state.loading=false;
            console.log('fulfilled')
        },
        [registerThunk.pending]:(state)=>{
            state.loading=true;
            state.error='';
            console.log('loading')
        },
        [loginThunk.pending]:(state,{payload})=>{
            state.loading=true;
            state.error='';
            console.log('loading')
        },
        [loginThunk.fulfilled]:(state,{payload})=>{
            state.userID=payload.userID;
            state.token=payload.accessToken;
            state.email=payload.email;
            state.success=true;
            state.error='';
            state.loading=false;
            state.userpic=payload.userpic;
            console.log('fulfilled')
        },
        [loginThunk.rejected]:(state,{payload})=>{
            state.error=payload;
            state.success=false;
            state.loading=false;
            console.log('reject')
        }
    }
})
export default LogSlice.reducer;
export const {screenRemoval}=LogSlice.actions