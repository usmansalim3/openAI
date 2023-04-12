import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { StackActions, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFormik } from 'formik';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ActivityIndicator, MD2Colors, TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import LoginSvg from '../../assets/SVGS/LoginSvg';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { logIn, loginThunk, screenRemoval } from '../../redux/LogSlice';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useCallback } from 'react';
import { platform } from 'process';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';



export default function LoginScreen() {
  const dispatch=useDispatch();
  const route=useRoute();
  const userState=useSelector((state)=>state.log);
  const {email,token,error,success,loading}=userState
  const navigation=useNavigation();
  const[visible,setVisible]=useState(true);
  const formik=useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:yup.object().shape({
      email:yup.string().required('Name is required').email('Invalid email'),
      password:yup.string().required('Password is required')
    }),
    onSubmit:({email,password})=>{
      dispatch(loginThunk({email,password}));
    }
  })
  useEffect(()=>{
    async function isLoggedIn(){
      try{
        const mail=await AsyncStorage.getItem("email");
        if(mail){
          formik.setFieldValue("email",mail)
        }
        const loggedIn=await AsyncStorage.getItem("token");
        console.log(loggedIn)
        if(loggedIn){
          dispatch(logIn(loggedIn))
          navigation.navigate("Home");
        }
      }catch(e){
        console.log(e);
      }
    }
    isLoggedIn();
  },[])

  useFocusEffect(
    useCallback(()=>{
      if(route.params?.resetForm){
        formik.setFieldValue("password","")
        formik.setFieldValue("email",route.params.email)
      }
    },[navigation,route])
  )
  useFocusEffect(
    useCallback(()=>{
      if(route.params?.otpReset){
        console.log("otp reset")
      }
    },[navigation,route])
  )
  useEffect(()=>{
    if(success&&!error&&email&&token){
      
      navigation.navigate('Home')
    }
  },[userState,dispatch])
  useEffect(()=>{
    dispatch(screenRemoval())
    return ()=>{
      dispatch(screenRemoval());
    }
  },[])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container} >
      <View style={{alignSelf:'center',marginTop:Platform.OS=='android'?responsiveHeight(0):responsiveHeight(2)}}>
        <LoginSvg/>
      </View>
      <View style={{bottom:10}}>
        <View style={{alignItems:'flex-start',marginLeft:responsiveWidth(10)}}>
          <Text style={{fontSize:responsiveFontSize(6),fontFamily:'ProximaNova',color:'#27255C',marginBottom:responsiveHeight(0.3)}}>Welcome</Text>
          <Text style={{color:'#9CA6CE',left:responsiveWidth(1),fontSize:responsiveFontSize(2),fontFamily:'ProximaNova'}}>Sign in down below</Text>
        </View>
        <View style={{width:'100%',height:'100%'}}>
          <View style={{top:5}}>
            <TextInput
            left={<TextInput.Icon icon={'email'} size={22}/>} 
            mode='outlined'
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            label="Email" 
            outlineColor={'#3949ab'}
            activeOutlineColor={'#6f74dd'}
            onBlur={formik.handleBlur('email')}
            style={{width:'80%',alignSelf:'center',marginVertical:10,backgroundColor:'#e4e4ee',fontSize:responsiveFontSize(1.9),fontFamily:'ProximaNova'}}
            />
            <View style={{bottom:3}}>
            <TextInput
            left={<TextInput.Icon icon={'lock'} size={22}/>}
            right={<TextInput.Icon icon={visible?'eye':'eye-off'} onPress={()=>setVisible((state)=>!state)} size={22} />}
            secureTextEntry={visible}
            mode='outlined'
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            label="Password"
            outlineColor={'#3949ab'}
            activeOutlineColor={'#6f74dd'}
            onBlur={formik.handleBlur('password')}
            
            style={{width:'80%',alignSelf:'center',backgroundColor:'#e4e4ee',fontSize:responsiveFontSize(1.9),fontFamily:'ProximaNova'}}
            />
            </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',height:responsiveHeight(5),top:responsiveHeight(5)}}>
              {error?
                <>
                <View style={{flexDirection:'row',width:'75%',justifyContent:"center",alignItems:'center'}}>
                  <MaterialIcons name="error" size={14} style={{alignSelf:'center',marginRight:3}} color='#ff7961'/>
                  <Text style={{color:'#ff7961',fontSize:15,fontFamily:'ProximaNova'}}>
                  {error}
                  </Text>
                </View>
                </>
                :null
              }
            </View>
          <View style={{width:'75%',alignSelf:'center',marginTop:'20%',borderRadius:4,overflow:"hidden"}}>
                <Pressable onPress={formik.handleSubmit} android_ripple={{color:'rgba(255, 255, 255, 0.1)'}} style={Platform.OS=='android'?{justifyContent:'center',alignItems:'center',height:responsiveHeight(5),backgroundColor:'#27255C'}:({pressed})=>pressed?{justifyContent:'center',alignItems:'center',height:responsiveHeight(5),backgroundColor:'#27255C',opacity:0.9}:{justifyContent:'center',alignItems:'center',height:responsiveHeight(5),backgroundColor:'#27255C'}}>
                {loading?<ActivityIndicator animating={true} size="small" />:<Text style={{fontSize:18,fontWeight:'400',color:'#F3F0EE',fontFamily:'ProximaNova'}}>Login</Text>}
                </Pressable>
          </View>
          <View style={{alignSelf:'center',marginTop:3}}>
            <TouchableOpacity onPress={()=>navigation.navigate("OTP")}>
              <Text style={{fontWeight:'400',color:'#9CA6CE',fontSize:14,fontFamily:'ProximaNova'}}>forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{position:'absolute',top:responsiveHeight(52),alignSelf:'center',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            <Text style={{color:'#9CA6CE',fontWeight:'500',fontFamily:'ProximaNova'}}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}><Text style={{color:'#27255C',fontFamily:'ProximaNova'}}> Sign up here</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    height:'100%'
  },
  androidButtonStyle:{backgroundColor:'#27255C',width:'75%',alignSelf:'center',marginTop:'20%',borderRadius:5},
  iosButtonStyle:{backgroundColor:'#27255C',width:'75%',alignSelf:'center',marginTop:'20%',borderRadius:5}
});