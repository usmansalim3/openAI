import { Keyboard, StyleSheet, View} from 'react-native'
import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Surface, TextInput, Text } from 'react-native-paper'
import { responsiveHeight } from 'react-native-responsive-dimensions'



const Etherium = () => {
  const [privateKey,setPrivateKey]=useState("");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1,backgroundColor:"#282c34"}}>
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Surface style={{width:"80%",backgroundColor:'#fff',padding:20,height:responsiveHeight(50),borderRadius:5}} elevation={2}>
                <Text variant="bodyLarge">Enter your wallet's private key</Text>
                <TextInput value={privateKey} activeOutlineColor={"#0088cc"} onChangeText={setPrivateKey} mode='outlined' left={<TextInput.Icon icon={'key'} size={20}/>} />
            </Surface>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default Etherium

const styles = StyleSheet.create({})