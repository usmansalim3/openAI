import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Button, Searchbar, Surface } from 'react-native-paper';
import { getImageThunk } from '../../redux/ImageAISlice';
import { Card } from 'react-native-paper';
import GifImage from '@lowkey/react-native-gif';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { uploadImageThunk } from '../../redux/SavedImagesSlice';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import Carousel from 'react-native-reanimated-carousel';
import * as FileSystem from "expo-file-system";
import { nanoid } from '@reduxjs/toolkit';





const Home = () => {
  const {token,userID,userpic,email}=useSelector(state=>state.log)
  const dispatch=useDispatch();
  const {image,Imageerror,Imageloading,Imagesuccess}=useSelector(state=>state.ImageAI)
  const[query,setQuery]=useState('');
  async function pressHandler(){
    dispatch(getImageThunk({token,prompt:query}));
  }



  function getFileUri(name) {
    return FileSystem.documentDirectory+"/AIphots"+ `${name}.png`;
  } 
  async function downloadImage(image){
    const fileUri = getFileUri('bruhImage'+nanoid()+'ai');
    await FileSystem.writeAsStringAsync(fileUri, image, { encoding: FileSystem.EncodingType.Base64 });
  }

  function ImageCard({image,index,time,prompt}){
    async function shareeee(){
      const fileUri = getFileUri('AIImage'+nanoid()+"image");
      await FileSystem.writeAsStringAsync(fileUri, image, { encoding: FileSystem.EncodingType.Base64 });
      try{
        await Sharing.shareAsync(fileUri)
      }catch(error){
        console.log(error);
      }
    }

    const marginTop=0;
    return(
      <View style={{alignSelf:'center',width:'90%',marginVertical:15,marginTop:marginTop,borderRadius:10}}>
        <Surface style={{elevation:5,borderRadius:10,backgroundColor:'#282c34',borderBottomEndRadius:10}}>
        <View style={{flexDirection:'row',marginLeft:responsiveWidth(2),marginBottom:responsiveHeight(1),borderRadius:10}}>
          <Image style={{width:responsiveWidth(12),height:responsiveWidth(12),borderRadius:100,top:responsiveHeight(0.6)}} source={{ uri: "data:image/png;base64,"+userpic }}/>
          <View>
            <Text style={{marginLeft:responsiveWidth(3),top:responsiveHeight(0.5),fontSize:responsiveFontSize(1.3),fontWeight:'bold',color:'grey'}}>Created on : {time}</Text>
            <Text style={{marginLeft:responsiveWidth(3),top:responsiveHeight(0.5),fontSize:responsiveFontSize(1.3),fontWeight:'bold',color:'grey'}}>{'@'+email.slice(0,email.indexOf('@'))}</Text>
          </View>
          </View>
        <View>
          <Text style={{marginLeft:responsiveWidth(2),fontSize:responsiveFontSize(2),marginBottom:responsiveHeight(0.1),color:'#AAACB7'}}>{prompt}</Text>
        </View>
        <View style={{width:'100%'}}>
          <Image style={{width:'100%',height:250}} source={{ uri: "data:image/png;base64,"+image }}/>
        </View>
        <View style={{backgroundColor:'#282c34',flexDirection:'row',marginVertical:10,marginHorizontal:responsiveWidth(2)}}>
          <TouchableOpacity style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}}>
            <AntDesign name="like2" size={22} color="#0088cc" />
            <Text style={{color:'#AAACB7',fontSize:responsiveFontSize(2)}}> Like</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={shareeee} style={{flexDirection:'row',alignItems:'center',flex:1,justifyContent:'center'}}>
            <EvilIcons name="share-apple" size={32} color="#0088cc" /> 
            <Text style={{color:'#AAACB7',fontSize:responsiveFontSize(2)}}> Share</Text>
          </TouchableOpacity>
          
        </View>
        </Surface>
      </View>
    )
  }



  return (
    <View style={{flex:1,backgroundColor:'#202123'}}>
        <Searchbar
        iconColor='#AAACB7'
        style={{width:'80%',alignSelf:'center',position:'absolute',top:responsiveHeight(1.5),backgroundColor:'#282c34',color:'#AAACB7',borderRadius:30,elevation:0,height:45,zIndex:1,}}
        placeholderTextColor='#AAACB7'
        onSubmitEditing={query?pressHandler:()=>{}}
        inputStyle={{fontSize:16,color:'#AAACB7'}}
        placeholder='Type a prompt'
        value={query}
        onChangeText={setQuery}
        />
      <Modal visible={Imageloading} animationType='slide' transparent>
        <View style={{flex:1,backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
          <Surface style={{borderRadius:10,height:300,width:300,backgroundColor:'#282c34',alignSelf:'center',marginTop:'55%',justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../../assets/4277423.jpg')} style={{width:200,height:200,borderRadius:10}} />
            <ActivityIndicator animating={Imageloading} style={{alignSelf:"center"}}/>
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
      width={responsiveWidth(100)}
      height={responsiveWidth(100)}
      scrollAnimationDuration={1000}
      data={image}
      renderItem={({item,index})=><ImageCard image={item.b64_json} index={index} prompt={item.prompt} time={item.time}/>} 
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})