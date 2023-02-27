import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeleteImageThunk, getSavedImagesThunk } from '../../redux/SavedImagesSlice';
import { ActivityIndicator, Button, Searchbar, Surface } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { uploadImageThunk } from '../../redux/SavedImagesSlice';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import Carousel from 'react-native-reanimated-carousel';
import * as FileSystem from "expo-file-system";
import { nanoid } from '@reduxjs/toolkit';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ImagePick = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
      dispatch(getSavedImagesThunk({token,userID}))
    },[])

    const {token,userID,userpic,email}=useSelector(state=>state.log)
    const {savedImages,loading}=useSelector(state=>state.savedImages)
    
    
    function getFileUri(name) {
      return FileSystem.documentDirectory+"/AIphots"+ `${name}.png`;
    } 
    
    function ImageCard({image,index,time,prompt}){
      const[like,setLike]=useState(true);
      async function shareeee(){
        const fileUri = getFileUri('AIImage'+nanoid()+"image");
        await FileSystem.writeAsStringAsync(fileUri, image, { encoding: FileSystem.EncodingType.Base64 });
        try{
          await Sharing.shareAsync(fileUri)
        }catch(error){
          console.log(error);
        }
      }
      function saveImage(){
        dispatch(uploadImageThunk({token,imageData:image,prompt,time,userID}))
        setLike(true);
      }
      function imageDelete(){
        dispatch(DeleteImageThunk({userID,token,image}))
        setLike(false)
      }
      const marginTop=index==0?15:0;
      return(
        <View style={{width:'90%',alignSelf:'center',marginVertical:15,marginTop:marginTop,borderRadius:10}}>
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
            <TouchableOpacity style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}} onPress={like?imageDelete:saveImage}
            >
              <AntDesign name={like?"like1":"like2"} size={22} color="#0088cc" />
              <Text style={{color:'#AAACB7',fontSize:responsiveFontSize(2)}}> {like?"Liked":"like"}</Text>
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
  if(loading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#202123'}}>
        <ActivityIndicator animating size="large" color='#0088cc'/>
      </View>
    )
  }else{
    return (
      <View style={{flex:1,backgroundColor:'#202123'}}>
        <FlatList

        data={savedImages}
        renderItem={({item,index})=><ImageCard image={item.image} index={index} prompt={item.prompt} time={item.time}/>} 
        />
      </View>
    )
  }
}

export default ImagePick

const styles = StyleSheet.create({})