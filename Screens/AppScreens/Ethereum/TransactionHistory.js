import { Linking, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortByAmount, sortByDate, transactionsThunk } from '../../../redux/EthSlice';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Divider, MD2Colors, Surface, TouchableRipple } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import moment from 'moment';
import { Skeleton } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import NoTransac from '../../../assets/SVGS/NoTransac';



function LoadingSkeleton(){
    return(
            <View style={{height:100,backgroundColor:'white',padding:5}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:4}}>
                <Skeleton width={150} height={20}/>
                <Skeleton width={50} height={20}/>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:4}}>
                <Skeleton width={150} height={20}/>
                <Skeleton width={100} height={20}/>
                </View>
                <View style={{flexDirection:'row',marginBottom:4}}>
                <Skeleton width={50} height={20} style={{marginRight:3}}/>
                <Skeleton style={{flex:1,flexDirection:'row'}} height={20}/>
                </View>
                <View style={{flexDirection:'row',marginBottom:4}}>
                <Skeleton width={50} height={20} style={{marginRight:3}}/>
                <Skeleton style={{flex:1,flexDirection:'row'}} height={20}/>
                </View>
            </View>
    )
}
function LoadingScreen(){
    return(
        <View style={{flex:1,backgroundColor:'white'}}>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
            <LoadingSkeleton/>
        </View>
    )
}
function Tx({from,to,amount,hash,time,index,total}){
    function onPress(url){
        Linking.openURL("https://goerli.etherscan.io/"+"tx/"+hash)
    }
    return(
        <>
        <TouchableRipple onPress={onPress} style={{width:'100%',padding:5,backgroundColor:MD2Colors.grey200}} rippleColor="rgba(0, 0, 0, .09)">
        <>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(2.3),fontWeight:'bold',flex:1,color:'#202123'}} >Amount transferred</Text>
                <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(2.3),fontWeight:'bold',color:'#202123'}}>{amount}</Text>
                <FontAwesome5 name="ethereum" size={24} color="black" />
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(2.3),fontWeight:'bold',flex:1,color:'#202123'}}>Time of transaction</Text>
                <Text style={{fontFamily:"ProximaNova"}}>{moment(time).format('lll')}</Text>
            </View>
            <View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontFamily:"ProximaNova",fontWeight:'bold',color:'#202123',fontSize:responsiveFontSize(1.45)}}>
                        From: 
                    </Text>
                    <Text style={{fontFamily:"ProximaNova",color:'#AAACB7',fontSize:responsiveFontSize(1.45),top:2}} >
                         {from}
                    </Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontFamily:"ProximaNova",fontWeight:'bold',color:'#202123',fontSize:responsiveFontSize(1.45)}}>
                        To: 
                    </Text>
                    <Text style={{fontFamily:"ProximaNova",color:'#AAACB7',fontSize:responsiveFontSize(1.45),top:2}} >
                        {to}
                    </Text>
                </View>
            </View>
        </>
        </TouchableRipple>
            {total-1==index?<></>:<Divider bold/>}
        
        </>
    )
}
function Anchor({open,tintColor}){
    return(
        <View style={{padding:15,top:3}}>
            <FontAwesome name="sort" size={24} color={tintColor} onPress={open} />
        </View>
    )
}
const TransactionHistory = () => {
  const dispatch=useDispatch();
  const navigation=useNavigation();
  const[visible,setVisible]=useState(false);
  function open(){
    setVisible(true)
  }
  function close(){
    setVisible(false)
  }
  const {transactions,fetchingTxs,txError,walletBalance}=useSelector(state=>state.ethereum)
  const {userID}=useSelector(state=>state.log)
  useEffect(()=>{
    dispatch(transactionsThunk({userID}))
  },[walletBalance])
//   useEffect(()=>{
//     navigation.setOptions({
//         headerRight:({tintColor})=>{
//             return(
//                 <Menu visible={visible} onRequestClose={close} animationDuration={300} anchor={<Anchor open={open} tintColor={tintColor}/>}>
//                     <MenuItem onPress={()=>{
//                         dispatch(sortByAmount());
//                         close();
//                     }}>
//                         <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',marginLeft:Platform.OS=='ios'?responsiveWidth(1):0}}>
//                         <FontAwesome5 name="ethereum" size={responsiveFontSize(1.9)} color="black" />
//                         <Text style={{fontFamily:"ProximaNova",marginLeft:10,fontSize:responsiveFontSize(1.8)}}>Ethers</Text>
//                         </View>
//                     </MenuItem>
//                     <MenuDivider/>
//                     <MenuItem onPress={()=>{
//                         dispatch(sortByDate());
//                         close();
//                     }}>
//                         <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',marginLeft:Platform.OS=='ios'?responsiveWidth(0.4):0}}>
//                         <FontAwesome5 name="calendar" size={responsiveFontSize(1.9)} color="black" />
//                         <Text style={{fontFamily:"ProximaNova",marginLeft:10,fontSize:responsiveFontSize(1.9)}}>Date</Text>
//                         </View>
//                     </MenuItem>
//                 </Menu>
//             )
//         }
//     })
//   },[visible])
  if(!fetchingTxs&&transactions.length==0){
    return(
        <View style={{backgroundColor:MD2Colors.grey200,flex:1,justifyContent:'center',alignItems:'center'}}>
            <NoTransac/>
            <Text style={{fontFamily:'ProximaNova',fontSize:responsiveFontSize(2.5),bottom:responsiveHeight(25)}}>You have no transactions made yet</Text>
        </View>
    )
  }
  return (
    <View style={{backgroundColor:MD2Colors.grey200,flex:1}}>
      {fetchingTxs?<LoadingScreen/>:<FlatList
      showsVerticalScrollIndicator={false}
      data={transactions}
      renderItem={({item,index})=><Tx total={transactions.length} from={item.from} index={index} to={item.to} amount={item.amount} hash={item.hash} time={item.time} />}
      />}
    </View>
  )
}

export default TransactionHistory

const styles = StyleSheet.create({})