import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const initialState={
    checking:false,
    isConnected:false,
    connecting:false,
    walletAddress:"",
    walletConnectError:"",
    transferError:"",
    walletPrivateKey:"",
    loading:false,
    walletBalance:0,
    transactions:[],
    fetchingTxs:false,
    txError:false
}
export const checkWalletThunk=createAsyncThunk("/isWalletConnected",async(userID)=>{
    const res=await axios.post("http://192.168.0.189:4000/ethereum/isWalletConnected",{
        userID
    })
    return res.data
})
export const connectWalletThunk=createAsyncThunk("/connectWallet",async({userID,privateKey},{rejectWithValue})=>{
    try{
        const res=await axios.post("http://192.168.0.189:4000/ethereum/connectWallet",{
          privateKey,
          userID
        })
        
        return res.data
    }catch(e){
        console.log(e);
        return rejectWithValue(e.response.data.error)
    }
})
export const showBalanceThunk=createAsyncThunk("/showBalance",async(address)=>{
    console.log(address)
    try{
        const res=await axios.post("http://192.168.0.189:4000/ethereum/showBalance",{
                address
            }
        )
        return res.data

    }catch(e){
        console.log(e);
    }
})
export const transferThunk=createAsyncThunk("/transfer",async({account,amt,walletPrivateKey,userID},{rejectWithValue})=>{
    try{
        const response=await axios.post("http://192.168.0.189:4000/ethereum/transfer",{
            address:account,
            amount:amt,
            walletPrivateKey,
            userID
        })
        console.log(response.data);
        return response.data
    }catch(e){
        console.log(e);
        return rejectWithValue(e.response.data.error);
    }
})
export const transactionsThunk=createAsyncThunk("/transactionsThunk",async({userID},{rejectWithValue})=>{
    try{
        const res=await axios.post("http://192.168.0.189:4000/ethereum/transactions",{
            userID
        })
        return res.data;
    }catch(e){
        return rejectWithValue(e.response.data.error)
    }
})
export const disconnectWalletThunk=createAsyncThunk("/disconnectWallet",async(userID)=>{
    try{
        await axios.post("http://192.168.0.189:4000/ethereum/disconnectWallet",{
            userID
        })
    }catch(e){
        console.log(e)
    }
})

const ethSlice=createSlice({
    name:"ethSlice",
    initialState,
    reducers:{
        ethSignOut:(state)=>{
            state.checking=false;
            state.isConnected=false;
            state.connecting=false;
            state.walletAddress="";
            state.walletPrivateKey="";
            state.loading=false;
            state.walletBalance=0;
            state.transferError="";
        },
        clearTransferError:(state)=>{
            state.transferError="";
        }
    },
    extraReducers:{
        [checkWalletThunk.pending]:(state)=>{
            console.log("checking wallet pending");
            state.checking=true;
            state.isConnected=false;
        },
        [checkWalletThunk.fulfilled]:(state,{payload})=>{
            state.checking=false;
            state.isConnected=payload.connected;
            state.walletAddress=payload.walletAddress
            state.walletPrivateKey=payload.walletPrivateKey
            state.walletBalance=payload.walletBalance;
            console.log(" checking fulfilled",state.walletAddress)
        },
        [connectWalletThunk.pending]:(state)=>{
            console.log("connecting wallet pending")
            state.connecting=true;
            state.isConnected=false;
            state.checking=false;
        },
        [connectWalletThunk.fulfilled]:(state,{payload})=>{
            state.connecting=false;
            state.isConnected=true;
            state.checking=false;
            state.walletAddress=payload.walletAddress;
            state.walletPrivateKey=payload.walletPrivateKey;
            state.walletBalance=payload.walletBalance
            console.log("connectingWalletThunkFulfilled",payload);
        },
        [connectWalletThunk.rejected]:(state,{payload})=>{
            console.log(payload)
            state.walletConnectError=payload
        },
        [showBalanceThunk.pending]:(state)=>{
            //state.loading=true;
            console.log("show bal pending")
        },
        [showBalanceThunk.fulfilled]:(state,{payload})=>{
            state.loading=false;
            state.walletBalance=payload.balance;
            console.log(payload)
            console.log("show bal fulfilled")
            //console.log(payload);
        },
        [showBalanceThunk.rejected]:(state)=>{
            console.log("failed")
        },
        [transferThunk.pending]:(state)=>{
            state.loading=true;
        },
        [transferThunk.fulfilled]:(state,{payload})=>{
            console.log(payload)
            state.loading=false;
            state.transferError="";
            state.walletBalance=payload.walletBalance
        },
        [transferThunk.rejected]:(state,{payload})=>{
            console.log(payload)
            state.transferError=payload;
            state.loading=false;
        },
        [transactionsThunk.pending]:(state)=>{
            state.fetchingTxs=true;
        },
        [transactionsThunk.fulfilled]:(state,{payload})=>{
            //console.log(payload);
            state.transactions=payload.tx
            state.fetchingTxs=false;
        },
        [transactionsThunk.rejected]:(state,{payload})=>{
            state.fetchingTxs=false;
            state.txError=payload;
            console.log(payload)
        },
        [disconnectWalletThunk.fulfilled]:(state)=>{
            console.log("disconnected");
            state.walletAddress="";
            state.walletPrivateKey="";
            state.walletBalance=0;
            state.isConnected=false;
        }
    }

})
export default ethSlice.reducer;
export const{clearTransferError,ethSignOut}=ethSlice.actions