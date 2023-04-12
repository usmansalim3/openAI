import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, View} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Surface, TextInput, Text, Button,MD2Colors, MD2LightTheme, Snackbar, IconButton } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

import { useDispatch, useSelector } from 'react-redux'
import { onTxDone, transferThunk } from '../../../redux/EthSlice'
import { AntDesign} from '@expo/vector-icons'
import AnimatedLottieView from 'lottie-react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'


function WalletConnectedModal(props){
    const balance=props.walletBalance;
    const loading=props.loading
    const userID=props.userID
    const {walletPrivateKey,txDone}=props
    const[scanForQR,setScanForQR]=useState(false);
    const[account,setAccount]=useState("");
    const [success,setSuccess]=useState(false);
    // const {walletPrivateKey,txDone,transferError}=useSelector(state=>state.ethereum)
    const[amt,setAmt]=useState(0);
    const dispatch=useDispatch();
    
    useEffect(()=>{
      if(txDone){
        setAmt(0);
      }
    },[txDone])
  
    function confirmTranfser(){
      const setError=props.setError;
      if(account.length!=42){
        setError({error:true,message:"Invalid Address"});
      }else if(amt==0){
        setError({error:true,message:"Enter amount"})
      }
      else if(amt>balance){
        setError({error:true,message:"Insufficient balance"})
      }
      else{
        dispatch(transferThunk({account,amt,walletPrivateKey,userID}))
        // setTimeout(()=>{setAmt(0)},1000)
        Keyboard.dismiss()
      }
    }
    async function QrScanPermission(){
      try{
        const {status}=await BarCodeScanner.requestPermissionsAsync()
      }catch(e){
        console.log(e)
      }
    }
    
    async function onPress(){
      const{status}=await BarCodeScanner.getPermissionsAsync();
      if(status!="granted"){
        Alert.alert(
          'Permission denined',
           'You did not allow camera permissions',
           [
             {text: 'Yes', onPress: () => console.log('Yes button clicked')},
           ],
           { 
             cancelable: true 
           }
         );
      }else{
        setScanForQR(true);
      }
    }
    function TxDoneModal(){
      function closeModal(){
        dispatch(onTxDone());
      }
      return(
        <Modal transparent visible={txDone} style={{zIndex:10}} animationType='fade'>
          <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <Surface style={{width:responsiveHeight(45),height:responsiveHeight(45),borderRadius:10}}>
              <IconButton icon={"close"} onPress={closeModal} size={24} iconColor={MD2Colors.grey500} style={{position:'absolute',zIndex:99,right:10,top:10}} />
              <View style={{flex:1}}>
                <AnimatedLottieView  source={require("../../../assets/Lotties/Success.json")} autoPlay  />
              </View>
              <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(2.5),textAlign:'center',bottom:responsiveHeight(5),color:MD2Colors.green600}}>Transaction successful</Text>
            </Surface>
          </View>
          
        </Modal>
      )
    }
    function ScanningForQR(){
      return(
        <Modal transparent animationType='fade' >
          <TouchableWithoutFeedback onPress={()=>setScanForQR(false)}>
          <View style={{marginTop:responsiveHeight(0),flex:1,backgroundColor: 'rgba(0, 0, 0, 0.9)',justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:5}}>
              <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(5),color:'white'}}>Scan QR  </Text>
              <AntDesign name="scan1" size={responsiveFontSize(5)} color="white"  />
            </View>
            <View style={{height:responsiveHeight(60),width:responsiveHeight(70)}}>
              <BarCodeScanner style={{flex:1}} onBarCodeScanned={({data})=>{
                const add=data.slice(data.indexOf("0"))
                setScanForQR(false)
                setAccount(add);
              }}/>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      )
    }
    useEffect(()=>{
      QrScanPermission();
    },[])
    return(
      <View style={{flex:1}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <AnimatedLottieView source={require("../../../assets/Lotties/CryptoWallet.json")} autoPlay  style={{width:responsiveHeight(20),height:responsiveHeight(20)}} />
            <Text style={{color:"#AAACB7",fontSize:responsiveFontSize(4.5),fontFamily:"ProximaNova"}} > Transfer Ethereum </Text>
            <TextInput disabled={loading} activeOutlineColor={MD2Colors.blueGrey800} value={account} onChangeText={setAccount}  style={{fontSize:responsiveFontSize(2),width:'90%',backgroundColor:"#e4e4ee"}} multiline placeholder='Enter account address' placeholderTextColor={MD2Colors.blueGrey400} mode="outlined" left={<TextInput.Icon icon={"account"}/>}  right={<TextInput.Icon icon={"qrcode"} onPress={onPress}/>} />
            <TextInput disabled={loading} activeOutlineColor={MD2Colors.blueGrey800} keyboardType="decimal-pad" style={{width:'90%',fontFamily:"ProximaNova",backgroundColor:'#e4e4ee'}} mode="outlined" value={amt} onChangeText={setAmt} placeholder="Enter the amount" placeholderTextColor={MD2Colors.blueGrey400} left={<TextInput.Icon icon={"ethereum"}/>}/>
            <View style={{marginTop:10,width:'90%'}}>
              <Button mode="text" onPress={confirmTranfser} disabled={loading?true:false} style={{fontFamily:"ProximaNova",borderRadius:3,backgroundColor:"#282c34"}}>{loading?<Text style={{fontFamily:'ProximaNova',color:'#f5f5f5'}}>Transferring</Text>:<Text style={{fontFamily:'ProximaNova',color:'#f5f5f5'}}>Transfer</Text>}</Button>
            </View>
        </View>
            {txDone?<TxDoneModal/>:<></>}
            {scanForQR?<ScanningForQR/>:<></>}
            {loading?<AnimatedLottieView autoPlay style={{flex:1,marginTop:Platform.OS=='ios'?responsiveHeight(10):responsiveHeight(22)}} source={require("../../../assets/Lotties/TransferAnimation.json")} />:<></>}
      </View>
    )
  }
  export default WalletConnectedModal