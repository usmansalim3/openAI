import { Keyboard, Modal, StyleSheet, View} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Surface, TextInput, Text, Button,MD2Colors, MD2LightTheme, Snackbar } from 'react-native-paper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import WalletSvg from '../../assets/WalletSvg'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { clearTransferError, connectWalletThunk, showBalanceThunk, transferThunk } from '../../redux/EthSlice'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import WalletSvg2 from '../../assets/WalletSvg2'
import { useNavigation } from '@react-navigation/native'
import Lottie from 'lottie-react-native';
import AnimatedLottieView from 'lottie-react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
 
function HeaderBal({balance}){
  return(
    <View style={{flexDirection:'row'}}>
        <View style={{justifyContent:'center',alignItems:"center",flexDirection:'row'}}>
          <Text style={{fontSize:responsiveFontSize(2.5),fontWeight:'bold',color:MD2Colors.blueGrey400}}>{balance}</Text>
          <MaterialCommunityIcons name="ethereum" size={24} color={MD2Colors.blueGrey400} />
        </View>
    </View>
  )
}

function ConnectWalletModal(props){
  const [privateKey,setPrivateKey]=useState("");
  const {userID}=useSelector(state=>state.log)
  const {checking,isConnected,connecting}=useSelector(state=>state.ethereum)
  const dispatch=useDispatch();
  async function walletConnect(){
    const key="c95e712f1c0d31ae0be0d26120030c34e18a7ec82a03158de8993565f3bc0ccf"
    if(privateKey.length!=64){
      props.setError({error:true,message:"Invalid Private Key"});
    }else{
      Keyboard.dismiss();
      dispatch(connectWalletThunk({userID,privateKey}));
    }
  }
  return(
    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
      <Surface style={{width:"80%",backgroundColor:'#F5F5F5',padding:responsiveWidth(3),height:responsiveHeight(50),borderRadius:5}} elevation={2}>
        <Text style={{fontSize:responsiveFontSize(3.2)}}>Connect your wallet </Text>
            <View style={{justifyContent:'center',alignItems:'center',bottom:responsiveHeight(0.7)}}>
              <WalletSvg />
            </View>
        <Text variant="bodyLarge">Paste your wallet's private key</Text>
        <TextInput value={privateKey}  activeOutlineColor={"#0088cc"}  multiline onChangeText={setPrivateKey} mode='outlined' left={<TextInput.Icon icon={'key'} size={24} />} />
        <Button mode="text" disabled={connecting?true:false} style={{borderRadius:3,marginTop:responsiveHeight(2),backgroundColor:'#7E57C2'}} onPress={walletConnect}>
          {connecting?<Text style={{color:'#F5F5F5'}}>Connecting...</Text>:<Text variant="labelLarge" style={{color:'#F5F5F5'}}>Connect wallet</Text>}</Button>
          
      </Surface>
  </View>
  )
}
function WalletConnected(props){
  const balance=props.walletBalance;
  const loading=props.loading
  const userID=props.userID
  const[scanForQR,setScanForQR]=useState(false);
  const[account,setAccount]=useState("");
  const {walletPrivateKey}=useSelector(state=>state.ethereum)
  const[amt,setAmt]=useState(0);
  const dispatch=useDispatch();
  function confirmTranfser(){
    const setError=props.setError;
    if(account.length!=42){
      setError({error:true,message:"Invalid Address"});
    }else if(amt==0){
      setError({error:true,message:"Enter amount"})
    }else{
      dispatch(transferThunk({account,amt,walletPrivateKey,userID}))
      Keyboard.dismiss()
    }
  }
  async function QrScanPermission(){
    const {status}=await BarCodeScanner.requestPermissionsAsync()
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
  function ScanningForQR(){
    return(
      <Modal transparent animationType='fade' >
        <TouchableWithoutFeedback onPress={()=>setScanForQR(false)}>
        <View style={{marginTop:responsiveHeight(0),flex:1,backgroundColor: 'rgba(0, 0, 0, 0.7)',justifyContent:'center',alignItems:'center'}}>
          <BarCodeScanner style={{height:responsiveHeight(50),width:responsiveHeight(70)}} onBarCodeScanned={({data})=>{
            const add=data.slice(data.indexOf("0"))
            setScanForQR(false)
            setAccount(add);
          }}/>
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
      <View style={{justifyContent:'center',alignItems:'center',marginTop:5}}>
          <View style={{alignSelf:'center'}}>
          <WalletSvg2/>
          </View>
          <Text style={{color:"#AAACB7",fontSize:responsiveFontSize(4.5)}} >Transfer Ethereum </Text>
          <TextInput value={account} onChangeText={setAccount} style={{fontSize:responsiveFontSize(2),width:'90%'}} multiline placeholder='Enter account address' placeholderTextColor={MD2Colors.blueGrey400} mode="outlined" left={<TextInput.Icon icon={"account"}/>}  right={<TextInput.Icon icon={"qrcode"} onPress={onPress}/>} />
          <TextInput keyboardType="decimal-pad" style={{width:'90%'}} mode="outlined" value={amt} onChangeText={setAmt} placeholder="Enter the amount" placeholderTextColor={MD2Colors.blueGrey400} left={<TextInput.Icon icon={"ethereum"}/>}/>
          <View style={{justifyContent:'center',alignItems:'center',marginTop:10,width:'90%'}}>
            <Button mode="contained" onPress={confirmTranfser} disabled={loading?true:false} style={{borderRadius:3,width:'100%',backgroundColor:MD2Colors.blue800}}>{loading?"Transferring":"Transfer"}</Button>
          </View>
      </View>
          {scanForQR?<ScanningForQR/>:<></>}
          {loading?<AnimatedLottieView autoPlay style={{flex:1,marginTop:responsiveHeight(23)}} source={require("../AppScreens/TransferAnimation.json")} />:<></>}
    </View>
  )
}

const Etherium = () => {
  const {userID}=useSelector(state=>state.log)
  const dispatch=useDispatch();
  const [error,setError]=useState({error:false,message:""});
  const {checking,isConnected,connecting,walletAddress,transferError,walletBalance,walletPrivateKey,loading}=useSelector(state=>state.ethereum)
  const navigation=useNavigation();
  useLayoutEffect(()=>{
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
        <View style={{flex:1,backgroundColor:"#282c34"}}>
          {isConnected?<WalletConnected loading={loading} userID={userID} walletBalance={walletBalance} error={error} setError={setError}/>:<ConnectWalletModal connecting={connecting} error={error} setError={setError} />}
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