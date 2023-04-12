import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, View} from 'react-native'
import React, { useState } from 'react'
import { Surface, TextInput, Text, Button,MD2Colors} from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import WalletSvg from '../../../assets/SVGS/WalletSvg'
import { useDispatch, useSelector } from 'react-redux'
import { connectWalletThunk } from '../../../redux/EthSlice'

function ConnectWalletModal(props){
    const [privateKey,setPrivateKey]=useState("");
    const {userID,connecting,walletConnectError}=props
    // const {userID}=useSelector(state=>state.log)
    // const {connecting,walletConnectError}=useSelector(state=>state.ethereum)
    const dispatch=useDispatch();
    if(walletConnectError){
      props.setError({error:true,message:"Invalid private key"})
      
    }
    async function walletConnect(){
      if(privateKey.length!=64){
        props.setError({error:true,message:"Invalid Private Key"});
      }else{
        Keyboard.dismiss();
        dispatch(connectWalletThunk({userID,privateKey}));
      }
    }
    return(
      <View style={{justifyContent:'center',alignSelf:'center',flex:1,width:'90%'}}>
        <KeyboardAvoidingView behavior={Platform.OS=='ios'?'position':null} style={Platform.OS=='ios'?{height:'60%',marginTop:responsiveHeight(10)}:{}} >
        <Surface style={{width:"100%",backgroundColor:MD2Colors.blueGrey700,padding:responsiveWidth(3),height:Platform.OS=='ios'?responsiveHeight(38):responsiveHeight(44),borderRadius:5}} elevation={2}>
          <View style={{flex:1}}>
          <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(3.2),bottom:responsiveHeight(1),color:'#F5F5F5'}}>Connect your wallet </Text>
              <View style={{justifyContent:'center',alignItems:'center',bottom:responsiveHeight(0.7)}}>
                <WalletSvg />
              </View>
          <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(2),color:'#F5F5F5'}}>Paste your wallet's private key</Text>
          <TextInput value={privateKey} activeOutlineColor={"#282c34"} style={{backgroundColor:'#e4e4ee',marginBottom:5,maxHeight:80}}  maxLength={64} multiline onChangeText={setPrivateKey} mode='outlined' left={<TextInput.Icon icon={'key'} size={24} />} />
          <View style={{justifyContent:'flex-end',flex:1}}>
          <Button mode="text" disabled={connecting?true:false} style={{borderRadius:3,backgroundColor:'#282c34'}} onPress={walletConnect}>
            {connecting?<Text style={{fontFamily:"ProximaNova",color:'#F5F5F5'}}>Connecting...</Text>:<Text variant="labelLarge" style={{fontFamily:"ProximaNova",color:'#F5F5F5'}}>Connect wallet</Text>}</Button>
          </View>
          </View>
        </Surface>
        </KeyboardAvoidingView>
    </View>
    )
  }
export default ConnectWalletModal