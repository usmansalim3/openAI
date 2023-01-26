import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider, Drawer, Paragraph } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'


const CustomDrawer = (props) => {
  const dispatch=useDispatch();
  const {email,userpic}=useSelector(state=>state.log)
  const username=email.slice(0,email.indexOf('@'));
  return (
    <View style={{flex:1}}>
    <DrawerContentScrollView>
      <ImageBackground source={require('./assets/menu-bg.jpeg')} style={{height:responsiveHeight(25),justifyContent:'center',alignItems:'center',marginTop:-responsiveHeight(5)}}>
        <Image style={{width:responsiveHeight(15),height:responsiveHeight(15),borderRadius:100,marginTop:responsiveHeight(3),borderWidth:2,borderColor:'#AAACB7'}} source={{uri:"data:image/png;base64,"+userpic}}/>
        <Paragraph style={{fontSize:responsiveFontSize(1.7),color:'#AAACB7',fontWeight:'bold'}}>{'@'+username}</Paragraph>
        <Divider style={{backgroundColor:'#202123'}} bold/>
      </ImageBackground>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>

    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})