import { Linking, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { transactionsThunk } from '../../redux/EthSlice';
import { FlatList } from 'react-native-gesture-handler';
import { Divider, Surface, TouchableRipple } from 'react-native-paper';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';

function Tx({from,to,amount,hash,time,index,total}){
    function onPress(url){
        Linking.openURL("https://goerli.etherscan.io/"+"tx/"+hash)
    }
    return(
        <>
        <TouchableRipple onPress={onPress} style={{width:'100%',padding:5,backgroundColor:'white'}} rippleColor="rgba(0, 0, 0, .09)">
        <>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:responsiveFontSize(2.3),fontWeight:'bold',flex:1,color:'#202123'}} >Amount transferred</Text>
                <Text style={{fontSize:responsiveFontSize(2.3),fontWeight:'bold',color:'#202123'}}>{amount}</Text>
                <FontAwesome5 name="ethereum" size={24} color="black" />
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:responsiveFontSize(2.3),fontWeight:'bold',flex:1,color:'#202123'}}>Time of transaction</Text>
                <Text>{moment(time).format('lll')}</Text>
            </View>
            <View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',color:'#202123',fontSize:responsiveFontSize(1.45)}}>
                        From: 
                    </Text>
                    <Text style={{color:'#AAACB7',fontSize:responsiveFontSize(1.45)}} >
                         {from}
                    </Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontWeight:'bold',color:'#202123',fontSize:responsiveFontSize(1.45)}}>
                        To: 
                    </Text>
                    <Text style={{color:'#AAACB7',fontSize:responsiveFontSize(1.45)}} >
                        {to}
                    </Text>
                </View>
            </View>
        </>
        </TouchableRipple>
        {total-1==index?<></>:<Divider/>}
        </>
    )
}

const TransactionHistory = () => {
  const dispatch=useDispatch();
  const {transactions,fetchingTxs,txError,walletBalance}=useSelector(state=>state.ethereum)
  const {userID}=useSelector(state=>state.log)
  useEffect(()=>{
    dispatch(transactionsThunk({userID}))
  },[walletBalance])
  return (
    <View style={{flex:1,backgroundColor:"#282c34"}}>
      
      <FlatList
      
      showsVerticalScrollIndicator={false}
      data={transactions}
      renderItem={({item,index})=><Tx total={transactions.length} from={item.from} index={index} to={item.to} amount={item.amount} hash={item.hash} time={item.time} />}
      />
    </View>
  )
}

export default TransactionHistory

const styles = StyleSheet.create({})