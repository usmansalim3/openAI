import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        const response=await axios.post('http://192.168.0.189:4000/users/register',{
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
        const response=await axios.post('http://192.168.0.189:4000/users/login',{
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
        },
        signOutLog:(state)=>{
            AsyncStorage.removeItem("token",()=>console.log(" removed "));
            state.userID=''
            state.error=''
            state.token=''
            state.email=''
            state.userpic=null
            state.loading=false
            state.success=false
            
            
        },
        logIn:(state,{payload})=>{
            const data=JSON.parse(payload)
            console.log(payload.token)
            state.userID=data.userID
            state.error=''
            state.token=data.token
            state.email=data.email;
            state.userpic=data.userpic;
            state.loading=false
            state.success=false
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
            const dataObj={userID:payload.userID,token:payload.accessToken,email:payload.email,userpic:payload.userpic};
            AsyncStorage.setItem("token",JSON.stringify(dataObj));
            AsyncStorage.setItem("email",payload.email)
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
            console.log("setting",payload.token)
            const dataObj={userID:payload.userID,token:payload.accessToken,email:payload.email,userpic:payload.userpic};
            //console.log(JSON.stringify(dataObj));
            AsyncStorage.setItem("token",JSON.stringify(dataObj),()=>{
                console.log("saved")
            });
            AsyncStorage.setItem("email",payload.email);
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
export const {screenRemoval,signOutLog,logIn}=LogSlice.actions