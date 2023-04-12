import { BackHandler, FlatList, Image, Keyboard, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Button, Searchbar, Snackbar, Surface } from 'react-native-paper';
import { clearImageError, getImageThunk } from '../../../redux/ImageAISlice';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { clearError, uploadImageThunk } from '../../../redux/SavedImagesSlice';
import Carousel from 'react-native-reanimated-carousel';
import ImageCard from './ImageCard';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { checkWalletThunk } from '../../../redux/EthSlice';
import AnimatedLottieView from 'lottie-react-native';





const Home = () => {
  const route=useRoute();
  const navigation=useNavigation();
  const {token,userID,userpic,email}=useSelector(state=>state.log)
  const {error}=useSelector(state=>state.savedImages)
  const dispatch=useDispatch();
  const {image,Imageerror,Imageloading,Imagesuccess}=useSelector(state=>state.ImageAI)
  const[query,setQuery]=useState('');
  async function pressHandler(){
    dispatch(getImageThunk({token,prompt:query}));
  }
  
  useEffect(()=>{
    dispatch(checkWalletThunk(userID));
  },[])
  useFocusEffect(
    useCallback(() => {
      const remove=BackHandler.addEventListener('hardwareBackPress',()=>{
        return true;
      })
      return () => {
        remove.remove();
      };
    }, [])
  )
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex:1}}>
    <View style={{flex:1,backgroundColor:'#202123'}}>
      <View style={{width:"90%",alignSelf:'center',position:'absolute'}}>
        <Searchbar
        iconColor='#AAACB7'
        style={{top:responsiveHeight(1.5),backgroundColor:'#282c34',color:'#AAACB7',borderRadius:30,elevation:0,zIndex:1}}
        placeholderTextColor='#AAACB7'
        onSubmitEditing={query?pressHandler:()=>{}}
        inputStyle={{fontSize:16,color:'#AAACB7',fontFamily:'ProximaNova'}}
        placeholder='Type a prompt'
        value={query}
        onChangeText={setQuery}
        onBlur={Keyboard.dismiss}
        
        />
      </View>
      <Modal visible={Imageloading} animationType="fade" transparent>
        <View style={{flex:1,backgroundColor: 'rgba(0, 0, 0, 0.7)',justifyContent:'center',alignItems:'center'}}>
          <Surface style={{borderRadius:10,height:300,width:350,padding:10,backgroundColor:'#FFF',justifyContent:'center',alignItems:'center'}}>
            {/* <Image source={require('../../assets/4277423.jpg')} style={{width:200,height:200,borderRadius:10}} />
            <ActivityIndicator animating={Imageloading} style={{alignSelf:"center",top:10}}/> */}
          <AnimatedLottieView autoPlay style={{borderRadius:10}} source={require("../../../assets/Lotties/Painting.json")} />
          </Surface> 
        </View>
      </Modal>
      <Carousel
      style={{alignSelf:'center',marginTop:responsiveHeight(20)}}
      mode="horizontal-stack"
      modeConfig={{
        parallaxScrollingOffset: 50,
        parallaxScrollingScale: 0.82,
        parallaxAdjacentItemScale: 0.82,
      }}
      width={responsiveWidth(108)}
      height={responsiveWidth(100)}
      scrollAnimationDuration={1000}
      data={image}
      renderItem={({item,index})=><ImageCard image={item.b64_json} index={index}
      prompt={item.prompt} time={item.time} userpic={userpic} 
      email={email} token={token} userID={userID}
      />}
      />
      <Snackbar
        visible={error?true:false}
        onDismiss={()=>{}}
        action={{
          label: 'Okay',
          onPress: () => {
            // Do something
            dispatch(clearError());
          },
        }}>
        Maximum 3 posts will be saved
      </Snackbar>
      <Snackbar
        visible={Imageerror?true:false}
        onDismiss={()=>{}}
        action={{
          label: 'Okay',
          onPress: () => {
            // Do something
            dispatch(clearImageError());
          },
        }}>
        {Imageerror}
      </Snackbar>
    </View>
    </TouchableWithoutFeedback>
    
  )
}

export default Home

const styles = StyleSheet.create({})