import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from "expo-file-system";
import { nanoid } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { uploadImageThunk } from '../../../redux/SavedImagesSlice';
import { Surface } from 'react-native-paper';
import { useDispatch } from 'react-redux';



function ImageCard({image,index,time,prompt,userpic,email,token,userID}){
    const dispatch=useDispatch();
    console.log("rendering again")
    async function shareeee(){
      const fileUri = FileSystem.documentDirectory+"/AIphots"+ 'AIImage'+nanoid()+"image"+".png"
      await FileSystem.writeAsStringAsync(fileUri, image, { encoding: FileSystem.EncodingType.Base64 });
      try{
        await Sharing.shareAsync(fileUri)
      }catch(error){
        console.log(error);
      }
    }
    const[liked,setLiked]=useState(false);
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
          <TouchableOpacity style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>{
            if(!liked){
              dispatch(uploadImageThunk({token,imageData:image,prompt,time,userID}))
              setLiked(true);
            }
            }  
          }>
            <AntDesign name={liked?"like1":"like2"} size={22} color="#0088cc" />
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
  export default memo(ImageCard);