import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Divider, Drawer, Paragraph } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import { AntDesign } from '@expo/vector-icons'
import { signOutImage } from './redux/ImageAISlice'
import { signOutLog } from './redux/LogSlice'
import { signOutSaved } from './redux/SavedImagesSlice'
import { useNavigation } from '@react-navigation/native'

const CustomDrawer = (props) => {
  const dispatch=useDispatch();
  const navigation=useNavigation();
  const {email,userpic}=useSelector(state=>state.log)
  const username=email.slice(0,email.indexOf('@'));

  function signOut(){
    dispatch(signOutLog());
    dispatch(signOutImage());
    dispatch(signOutSaved());
    navigation.navigate("Login",{
      resetForm:true,
      email
    })
  }

  return (
    <View style={{flex:1}}>
    <DrawerContentScrollView scrollEnabled={false}>
      <ImageBackground source={require('./assets/menu-bg.jpeg')} style={{height:responsiveHeight(25),justifyContent:'center',alignItems:'center',marginTop:-responsiveHeight(5)}}>
        <Image style={{width:responsiveHeight(15),height:responsiveHeight(15),borderRadius:100,marginTop:responsiveHeight(3),borderWidth:2,borderColor:'#AAACB7'}} source={{uri:"data:image/png;base64,"+userpic}}/>
        <Paragraph style={{fontSize:responsiveFontSize(1.7),color:'#AAACB7',fontWeight:'bold'}}>{'@'+username}</Paragraph>
        <Divider style={{backgroundColor:'#202123'}} bold/>
      </ImageBackground>
      <DrawerItemList {...props}/>
      <View style={{marginTop:responsiveHeight(42)}}>
       <DrawerItem label={"Sign out"} onPress={signOut} labelStyle={{color:"#AAACB7",fontSize:responsiveScreenFontSize(1.9)}} icon={({size,color})=><AntDesign name="logout" size={size} style={{color:'#0088cc'}}/>}/>
      </View>
    </DrawerContentScrollView>

    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})