import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getSavedImagesThunk } from '../../redux/SavedImagesSlice';

const ImagePick = () => {
    const dispatch=useDispatch();
    const {savedImages,loading}=useSelector(state=>state.savedImages)
    console.log(loading)
    const{token,userID}=useSelector((state)=>state.log)
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64:true
        });
        if(!result.canceled){
            setImage(result.assets[0].base64);
        }
    };
  return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
      <Text>ImagePick</Text>
      <Button onPress={()=>dispatch(getSavedImagesThunk({token,userID}))}>
        <Text>Choose image</Text>
      </Button>
      {image?<Image style={{height:200,width:200}} source={{uri:"data:image/png;base64,"+image}}/>:null}
    </View>
  )
}

export default ImagePick

const styles = StyleSheet.create({})