import { BackHandler, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Button, MD2Colors, TextInput } from 'react-native-paper'
import { setIn, useFormik } from 'formik'
import * as yup from 'yup'
import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import OTPTextInput from "react-native-otp-textinput"
import { changePasswordThunk, clearError, forgotPasswordThunk, invalidateOtp, resetOTPState, verifyOtpThunk } from '../../redux/LogSlice'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'

function ChangePasswordModal({email}){
    const {passwordChanged}=useSelector(state=>state.log)
    const navigation=useNavigation();
    const route=useRoute();
    const[visible,setVisible]=useState(true);
    const dispatch=useDispatch()
    useEffect(()=>{
        if(passwordChanged){
            dispatch(resetOTPState());
            navigation.navigate("Login",{
                otpReset:true
            })
            //navigation.goBack();
        }
    },[passwordChanged])
    const formik=useFormik({
        initialValues:{
            password:""
        },
        validationSchema:yup.object().shape({
            password:yup.string().required('Password is required').min(4)
        }),
        onSubmit:(val)=>{
            Keyboard.dismiss()
            dispatch(changePasswordThunk({password:val.password,email}))
        }
    })
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
    return(
        <View style={{flex:1,backgroundColor:'fff'}}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:responsiveFontSize(2.3),fontFamily:"ProximaNova",color:MD2Colors.grey600,bottom:10}}>Enter new password</Text>
                <TextInput mode="outlined" label={"Password"} onBlur={formik.handleBlur("password")} value={formik.values.password} onChangeText={formik.handleChange("password")}
                style={{width:"80%",backgroundColor:'#e4e4ee'}} secureTextEntry={visible} left={<TextInput.Icon icon={'email'} size={22}/>} outlineColor={'#3949ab'} activeOutlineColor={'#6f74dd'}
                right={formik.errors.password&&formik.touched.password?<TextInput.Icon icon={'alert-circle'} iconColor='red'/>:(formik.touched.password?<TextInput.Icon icon={'check'} iconColor="green" onPress={()=>setVisible((state)=>!state)} />:<TextInput.Icon icon={visible?'eye':'eye-off'} onPress={()=>setVisible((state)=>!state)} size={22} />)}
                    />
                <Button mode='contained' style={{width:'75%',borderRadius:3,marginTop:responsiveHeight(5),backgroundColor:"#3c3a6c"}} onPress={formik.handleSubmit}><Text style={{color:"#F3F0EE"}}>Change password</Text></Button>
                </View>
        </View>
    )
}

function EnterOTPModal({email}){
    const[otp,setOtp]=useState("")
    const input=useRef(null)
    const {otpError}=useSelector(state=>state.log)
    const dispatch=useDispatch();
    const[time,setTime]=useState(30);
    useEffect(()=>{
      timer()
    },[])
    function timer(){
      const timer=setInterval(()=>{
        setTime((prev)=>{
          if(prev==0){
            dispatch(invalidateOtp(email))
            clearInterval(timer);
            return 0;
          }
          return prev-1;
        })
      },1000)
    }
    function pressHandler(){
        if(time==0){
          dispatch(forgotPasswordThunk({email}))
          setTime(30)
          timer()
          setOtp("")
          input.current.clear();
          return
        }
        console.log(otp)
        dispatch(verifyOtpThunk({otp,email}))
        Keyboard.dismiss()
    }
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
    return(
        <View style={{flex:1,backgroundColor:'fff'}}>
            <View style={{marginBottom:10}}>
                <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(2),textAlign:"center"}}>An OTP has been sent to the registered phone number</Text>
            </View>
            <View style={{marginLeft:responsiveWidth(7)}}>
              <Text style={{fontFamily:'ProximaNova',marginVertical:10,color:MD2Colors.grey500}}>
                OTP invalid in {time} seconds
              </Text>
            </View>
            <View style={{justifyContent:"center",alignItems:'center',alignSelf:'center'}} >
            <OTPTextInput inputCount={6} textInputStyle={{borderWidth:3.2}} handleTextChange={(e)=>setOtp(e)} ref={input} tintColor={MD2Colors.blueGrey600} />
            </View>
            <View style={{height:responsiveHeight(5),justifyContent:'center',alignItems:'center',flexDirection:'row',top:10}}>
                {otpError&&<><MaterialIcons name="error" size={14} style={{alignSelf:'center',marginRight:3}} color='#ff7961'/>
                <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(2),color:"#ff7961"}}>invalid OTP</Text></>}
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
                <Button mode='contained' disabled={otp.length!==6&&time!=0} style={{width:"75%",backgroundColor:"#3c3a6c"}} onPress={pressHandler} ><Text style={{color:"#F3F0EE"}}>{time?"Submit OTP":"Resend OTP"}</Text></Button>
            </View>
        </View>
    )
}

function EnterEmailModal({formik,error}){
    const dispatch=useDispatch();
    useEffect(()=>{
      return ()=>{
        dispatch(clearError());
        
      }
    },[])
    return(
    <View style={{flex:1,backgroundColor:'fff'}}>
      <Text style={{fontFamily:"ProximaNova",fontSize:responsiveFontSize(2.5),textAlign:'center',marginBottom:20}}>Enter your registered email</Text>
      <View style={{height:responsiveHeight(3),flexDirection:'row',width:'75%',justifyContent:"center",alignItems:'center',alignSelf:"center",bottom:10}}>
        {error?
        <>
        <MaterialIcons name="error" size={14} style={{alignSelf:'center',marginRight:3}} color='#ff7961'/>
        <Text style={{color:'#ff7961',fontSize:responsiveFontSize(1.9),fontFamily:'ProximaNova'}}>
          Email is not registered
        </Text>
        </>
        :null}
      </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <TextInput mode="outlined" label={"Email"} onBlur={formik.handleBlur("email")} value={formik.values.email} onChangeText={formik.handleChange("email")}
            style={{width:"80%",backgroundColor:'#e4e4ee'}} left={<TextInput.Icon icon={'email'} size={22}/>} outlineColor={'#3949ab'} activeOutlineColor={'#6f74dd'}
            right={formik.errors.email&&formik.touched.email?<TextInput.Icon icon={'alert-circle'} iconColor='red'/>:(formik.touched.email?<TextInput.Icon icon={'check'} iconColor="green"/>:null)}
            />
            <View style={{width:'65%'}}>
            <Button mode="contained" style={{marginTop:20,borderRadius:3,backgroundColor:"#3c3a6c"}} onPress={()=>formik.handleSubmit()}><Text style={{fontStyle:"ProximaNova",color:"#F3F0EE"}}>Send OTP</Text></Button>
            </View>
        </View>
      </View>
    )
} 
const Otp = () => {
  const dispatch=useDispatch();
  const navigation=useNavigation();
  const {otpSent,otpVerified,loading,otpError}=useSelector((state)=>state.log)
  const formik=useFormik({
    initialValues:{
        email:""
    },
    validationSchema:yup.object().shape({
        email:yup.string().required('Name is required').email('Invalid email')
    }),
    onSubmit:(val)=>{
        Keyboard.dismiss()
        dispatch(forgotPasswordThunk({email:val.email}))
    }
  })
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{flex:1,backgroundColor:'#fff'}}>
    {(!otpSent&&!otpVerified)?<View style={{position:'absolute',zIndex:1,top:responsiveHeight(5),left:responsiveHeight(1),padding:5,overflow:'hidden',borderRadius:20,backgroundColor:'#f8fdff'}}>
        <Entypo name="chevron-with-circle-left" size={30}  color="#27255C" style={{overflow:'hidden',borderRadius:16}} onPress={()=>navigation.goBack()} />
    </View>:null}
      <View style={{height:responsiveHeight(40),width:responsiveHeight(60),alignSelf:'center',right:responsiveHeight(2)}}>
        <AnimatedLottieView autoPlay loop source={require("../../assets/Lotties/ForgotPassword.json")}  />
      </View>
      {otpSent?(otpSent&&otpVerified)?<ChangePasswordModal email={formik.values.email}/>:<EnterOTPModal email={formik.values.email}/>:<EnterEmailModal formik={formik} error={otpError}/>}
    </View>
    </TouchableWithoutFeedback>
  )
}

export default Otp

const styles = StyleSheet.create({})