import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, View} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Surface, TextInput, Text, Button,MD2Colors, MD2LightTheme, Snackbar, IconButton } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useDispatch, useSelector } from 'react-redux'
import { clearTransferError, showBalanceThunk } from '../../../redux/EthSlice'
import { useNavigation } from '@react-navigation/native'
import AnimatedLottieView from 'lottie-react-native'
import ConnectWalletModal from './ConnectWalletModal'
import WalletConnectedModal from './WalletConnectedModal'

function HeaderBal({balance}){
  return(
    <View style={{flexDirection:'row'}}>
        {/* <View style={{justifyContent:'center',alignItems:"center",flexDirection:'row'}}>
          <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(2.5),fontWeight:'bold',color:MD2Colors.blueGrey400}}>{balance}</Text>
          {/* <MaterialCommunityIcons name="ethereum" size={24} color={MD2Colors.blueGrey400} /> */}
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:"center"}}>
            <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(2.5),fontWeight:'bold',color:MD2Colors.blueGrey400}}>{balance}</Text>
            <AnimatedLottieView source={require("../../../assets/Lotties/Coin.json")} autoPlay loop style={{height:responsiveHeight(4.5),width:responsiveHeight(4.5)}}/>
          </View>
    </View>
  )
}
  

const Etherium = () => {
  const {userID}=useSelector(state=>state.log)
  const dispatch=useDispatch();
  const [error,setError]=useState({error:false,message:""});
  const {checking,isConnected,walletConnectError,connecting,walletAddress,transferError,walletBalance,walletPrivateKey,loading,txDone}=useSelector(state=>state.ethereum)
  const navigation=useNavigation();
  useEffect(()=>{
    if(isConnected){
      dispatch(showBalanceThunk(walletAddress));
    }
  },[])
  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=><HeaderBal balance={walletBalance?walletBalance.slice(0,10):0}/>
    })
  },[navigation,walletBalance,walletAddress,walletPrivateKey])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1,backgroundColor:"#202123"}}>
          {isConnected?<WalletConnectedModal walletPrivateKey={walletPrivateKey} txDone={txDone} loading={loading} userID={userID} walletBalance={walletBalance} error={error} setError={setError}/>:<ConnectWalletModal connecting={connecting} userID={userID} walletConnectError={walletConnectError} error={error} setError={setError} />}
        <Snackbar
        visible={error.error?true:false}
        onDismiss={()=>{}}
        action={{
          label: 'Okay',
          onPress: () => {
            setError(false)
            //dispatch(clearError());
          },
        }}>
        {error.message}
      </Snackbar>
      <Snackbar
        visible={transferError?true:false}
        onDismiss={()=>{}}
        action={{
          label: 'Okay',
          onPress: () => {
          dispatch(clearTransferError());
          },
        }}>
        {transferError}
      </Snackbar>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Etherium

const styles = StyleSheet.create({})