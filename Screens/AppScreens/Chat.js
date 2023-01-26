import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import KeyboardShift from '@fullstackcraft/react-native-keyboard-shift/lib/components/KeyboardShift'
import { TextInput } from 'react-native-paper'
import axios from 'axios'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { nanoid } from '@reduxjs/toolkit'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { useSelector } from 'react-redux'





const Chat = () => {
  const [messages, setMessages] = useState([]);
  const {userID}=useSelector((state)=>state.log)
  async function sendPrompt(prompt){
    try{
        const response=await axios.post('http://192.168.0.195:4000/bot/botChat',{
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
        const response=await axios.post('http://192.168.0.195:4000/bot/getChat',{
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
                <MaterialCommunityIcons name="send-circle" size={30} color="black" style={{marginBottom:responsiveHeight(1.1)}} />
            </View>
        </Send>
    )
}
async function sendToCloud(messages){
    try{
        await axios.post('http://192.168.0.195:4000/bot/chat',{
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
        setMessages(previousMessages=>GiftedChat.append(previousMessages,{_id:nanoid(),text:response,createdAt:new Date(),user:{_id:0,avatar: 'https://placeimg.com/140/140/any'}}))
        sendToCloud([{_id:nanoid(),text:response,createdAt:new Date(),user:{_id:0,avatar: 'https://placeimg.com/140/140/any'}}]);
        
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

          alwaysShowSend
          renderSend={SendButton}
          renderBubble={renderBubble}
        />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})