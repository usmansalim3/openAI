import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    chat:[]
}
export const getChatThunk=createAsyncThunk('/getChat',async({userID},{rejectWithValue})=>{
    try{
        const response=await axios.post('http://192.168.0.189:4000/todo/getChat',{
            userID
        })
        return(response.data.chat.reverse())
    }catch(error){
        console.log(error)
    }
})
export const messageThunk=createAsyncThunk('/message',async({userID,message})=>{
    try{
        await axios.post('http://192.168.0.189:4000/todo/chat',{
            chat:message,
            userID
        })
    }catch(error){
        console.log(error)
    }
})
export const sendPromptThunk=createAsyncThunk('prompt',async({prompt,userID})=>{
    try{
        const response=await axios.post('http://192.168.0.189:4000/todo/chatBot',{
            prompt,
            userID
        })
        return response.data.response
    }catch(error){
        console.log(error)
    }
})
const chatSlice=createSlice({
    name:'chatSlice',
    initialState,
    extraReducers:{
        [getChatThunk.fulfilled]:(state,{payload})=>{
            state.chat=payload;
        },
    }
})
