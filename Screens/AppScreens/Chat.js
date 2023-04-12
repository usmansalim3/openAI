import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import KeyboardShift from '@fullstackcraft/react-native-keyboard-shift/lib/components/KeyboardShift'
import { MD2Colors, TextInput } from 'react-native-paper'
import axios from 'axios'
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { nanoid } from '@reduxjs/toolkit'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useSelector } from 'react-redux'
import { useFonts } from 'expo-font'
import { useSafeAreaInsets } from 'react-native-safe-area-context'





const Chat = () => {
  const [messages, setMessages] = useState([]);
  const {userID}=useSelector((state)=>state.log)
  async function sendPrompt(prompt){
    try{
        const response=await axios.post('https://openai-backend-g0a1.onrender.com/bot/botChat',{
            prompt,
            userID
        })
        return response.data.response
    }catch(error){
        console.log(error)
    }
  }
  async function getChat(){
    try{
        const response=await axios.post('https://openai-backend-g0a1.onrender.com/bot/getChat',{
            userID
        })
        setMessages(response.data.chat.reverse())
    }catch(error){
        console.log(error)
    }
  }
  useEffect(() => {
    getChat();
  }, [])
  function SendButton(props){
    return(
        <Send {...props}>
            <View >
                <MaterialCommunityIcons name="send-circle" size={36} color="#AAACB7" style={{marginLeft:responsiveWidth(2),marginBottom:responsiveHeight(0.5)}} />
            </View>
        </Send>
    )
}
async function sendToCloud(messages){
    try{
        await axios.post('https://openai-backend-g0a1.onrender.com/bot/chat',{
            chat:messages,
            userID
        })
    }catch(error){
        console.log(error)
    }
  }
  function renderBubble(props){
      return(
          <Bubble {...props} 
          wrapperStyle={{
              left:{
                  backgroundColor:'#282c34',
                },
            }}
            textStyle={{
                left:{
                    color:'#AAACB7'
                }
            }}
            />
            )
        }
    const onResponse=useCallback(async(messages)=>{
        const response=await sendPrompt(messages[0].text)
        setMessages(previousMessages=>GiftedChat.append(previousMessages,{_id:nanoid(),text:response,createdAt:new Date(),user:{_id:0,avatar: 'https://i.pravatar.cc/150'}}))
        sendToCloud([{_id:nanoid(),text:response,createdAt:new Date(),user:{_id:0,avatar: 'https://i.pravatar.cc/150'}}]);
        
    },[])
    const onSend = useCallback((messages) => {
        sendToCloud(messages)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
  return (
    <View style={{flex:1,backgroundColor:'#202123'}}>
        <GiftedChat
          messages={messages}
          onSend={messages =>{
            onSend(messages)
            onResponse(messages)
          }}
          user={{
            _id: 1,
          }}
          renderInputToolbar={(props)=>{
            return(
                <InputToolbar {...props} textInputStyle={{color:MD2Colors.grey300}} containerStyle={{backgroundColor:"#202123",justifyContent:'center',alignItems:'center'}} >
                </InputToolbar>
            )
          }}
          bottomOffset={useSafeAreaInsets().bottom}
          alwaysShowSend
          renderSend={SendButton}
          renderBubble={renderBubble}
        />
    </View>
  )
}


export default Chat

const styles = StyleSheet.create({})