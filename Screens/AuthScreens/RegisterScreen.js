import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View,Modal, Image, Pressable,TouchableOpacity, Keyboard,TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import RegisterSvg from '../../assets/RegisterSvg'
import { ActivityIndicator, Button,Divider,TextInput } from 'react-native-paper';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { registerThunk, screenRemoval } from '../../redux/LogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth, useResponsiveFontSize, useResponsiveHeight, useResponsiveScreenHeight, useResponsiveScreenWidth } from 'react-native-responsive-dimensions';
import * as ImagePicker from 'expo-image-picker';





const ValidationError = (props) => {
  return(
    <View style={{flexDirection:'row',top:4,alignItems:"center"}}>
      <MaterialIcons name="error" size={12} style={{alignSelf:'center',marginRight:3}} color='#ff7961'/>
      <Text allowFontScaling={false} style={{color:'red',fontSize:10,bottom:0}}>{props.error}</Text>
    </View>
  )
}
const RegisterScreen = () => {
  const[visible,setVisible]=useState(true);
  const[modal,setModal]=useState(false);
  const [image, setImage] = useState(null);
  const dispatch=useDispatch();
  const userState=useSelector((state)=>state.log);
  const {email,token,error,success,loading}=userState;
  const navigation=useNavigation();
  const formik=useFormik({
    initialValues:{
        email:'',
        password:'',
        phoneNumber:''
    },
    validationSchema:yup.object().shape({
        email:yup.string().min(3,"Too short!").max(30,"Name length limited reached!").required("Field is required!").email("Enter a valid email"),
        password:yup.string().min(3,"Too short!").max(20,"Name length limited reached!").required("Field is required!"),
        phoneNumber:yup.string().required('Field is required')
    }),
    onSubmit:(values)=>{
        dispatch(registerThunk({
          email:formik.values.email,
          password:formik.values.password,
          phoneNumber:formik.values.phoneNumber,
          pfp:image
        }))
    }
  })
  useEffect(()=>{
    if(success&&!error&&email&&token){
      navigation.navigate('Home')
    }
  },[userState,dispatch])
  useLayoutEffect(()=>{
    dispatch(screenRemoval())
    return ()=>{
      dispatch(screenRemoval());
    }
  },[])
  async function openImagePicker(){
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
      });
      if(!result.canceled){
          setImage(result.assets[0].base64);
      }
  }
  function PictureModal(){
    return(
    <Modal visible={modal} transparent animationType='fade'>
      <View style={{flex:1,backgroundColor: 'rgba(0, 0, 0, 0.3)'}} >
        <View style={{height:responsiveScreenHeight(30
          ),width:responsiveScreenWidth(60),backgroundColor:'#fff',marginTop:responsiveHeight(35),marginLeft:responsiveWidth(21),borderRadius:10}}>
          <Image style={{height:responsiveHeight(15),width:responsiveWidth(30),borderRadius:100,marginTop:responsiveHeight(1),top:responsiveHeight(2),marginLeft:responsiveWidth(15)}} 
          source={{uri:image?"data:image/png;base64,"+image:'https://i.pravatar.cc/300'}}/>
          <View style={{marginTop:responsiveHeight(7.3)}}>
            <Pressable style={({pressed})=>pressed?styles.button1Pressed:styles.button1} onPress={()=>setModal(false)} >
                <Text style={{color:'#FF605C',fontSize:responsiveFontSize(1.7)}}>
                  Close
                </Text>
            </Pressable>
            <Divider bold/>
            <View style={{backgroundColor:"white",borderRadius:10}}>
              <Pressable style={({pressed})=>pressed?styles.button2Pressed:styles.button2} onPress={openImagePicker}>
                <Text style={{color:'#4267B2',fontSize:responsiveFontSize(1.7)}}>
                  Pick Image
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
    )
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{flex:1,backgroundColor:'#FFF'}}>
      <View style={{alignSelf:'center',marginTop:responsiveHeight(5)}}>
        <RegisterSvg/>
      </View>
      <View style={{position:'absolute',top:responsiveHeight(5),left:responsiveHeight(1),padding:5,overflow:'hidden',borderRadius:20,backgroundColor:'#f8fdff'}}>
        <Entypo name="chevron-with-circle-left" size={30}  color="#27255C" style={{overflow:'hidden',borderRadius:16}} onPress={()=>navigation.goBack()} />
      </View>
      <View style={{left:50,bottom:25}}>
        <Text style={{fontSize:responsiveFontSize(4),color:'#27255C'}}>Glad You're here!</Text>
        <Text style={{color:'#9CA6CE',marginBottom:responsiveHeight(0.3),left:5,fontSize:responsiveFontSize(1.7)}}>Fill in your details down below</Text>
      </View>
      <KeyboardAvoidingView behavior='position'>
        <View style={{width:'100%',bottom:10}}>
          <View>
              <View style={{left:50}}> 
                {/*(formik.errors.email&&formik.touched.email)?<ValidationError error={formik.errors.email} />:null*/}
              </View>
              <TextInput
              left={<TextInput.Icon icon={'email'} size={22}/>}
              right={formik.errors.email&&formik.touched.email?<TextInput.Icon icon={'alert-circle'} iconColor='red'/>:(formik.touched.email?<TextInput.Icon icon={'check'} iconColor="green"/>:null)}
              mode='outlined'
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              label="Email" 
              outlineColor={'#3949ab'}
              activeOutlineColor={'#6f74dd'}
              onBlur={formik.handleBlur('email')}
              style={{width:'80%',alignSelf:'center',backgroundColor:'#e4e4ee',fontSize:responsiveFontSize(1.9)}}
              />
          </View>
          <View style={{marginVertical:0}}>
            <View style={{left:50}}>
              {/*(formik.errors.password&&formik.touched.password)?<ValidationError error={formik.errors.password} />:null*/}
            </View>
            <TextInput
            left={<TextInput.Icon icon={'lock'} size={22}/>}
            right={formik.errors.password&&formik.touched.password?<TextInput.Icon icon={'alert-circle'} iconColor='red'/>:(formik.touched.password?<TextInput.Icon icon={'check'} iconColor="green" onPress={()=>setVisible((state)=>!state)} />:<TextInput.Icon icon={visible?'eye':'eye-off'} onPress={()=>setVisible((state)=>!state)} size={22} />)}
            secureTextEntry={visible}
            mode='outlined'
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            label="Password"
            outlineColor={'#3949ab'}
            activeOutlineColor={'#6f74dd'}
            onBlur={formik.handleBlur('password')}
            style={{width:'80%',alignSelf:'center',backgroundColor:'#e4e4ee',fontSize:responsiveFontSize(1.9),marginVertical:5}}
            />
          </View>
          <View>
            <View style={{left:50}}>
              {/*formik.errors.phoneNumber&&formik.touched.phoneNumber?<ValidationError error={formik.errors.phoneNumber}/>:null*/}
            </View>
            <TextInput
            left={<TextInput.Icon icon={'phone'} size={22}/>}
            right={formik.errors.phoneNumber&&formik.touched.phoneNumber?<TextInput.Icon icon={'alert-circle'} iconColor='red'/>:(formik.touched.phoneNumber?<TextInput.Icon icon={'check'} iconColor="green"/>:null)}
            mode='outlined'
            value={formik.values.phoneNumber}
            onChangeText={formik.handleChange('phoneNumber')}
            keyboardType='number-pad'
            label="Phone Number"
            onBlur={formik.handleBlur('phoneNumber')}
            outlineColor={'#3949ab'}
            activeOutlineColor={'#6f74dd'}
            style={{width:'80%',alignSelf:'center',backgroundColor:'#e4e4ee',fontSize:responsiveFontSize(1.9)}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      {modal?<PictureModal/>:null}
      <View style={{height:65,flexDirection:'row',width:'75%',justifyContent:"center",alignItems:'center',alignSelf:"center"}}>
        {error?
        <>
        <MaterialIcons name="error" size={14} style={{alignSelf:'center',marginRight:3}} color='#ff7961'/>
        <Text style={{color:'#ff7961',fontSize:responsiveFontSize(1.9)}}>
          {error}
        </Text>
        </>
        :null}
      </View>
      <View style={{width:'75%',alignSelf:'center'}}>
        <Button onPress={()=>setModal(true)} mode='contained' style={{backgroundColor:'#27255C',top:30,borderRadius:5,
        marginBottom:20}}>
            <Text style={{fontSize:responsiveFontSize(1.9),fontWeight:'400',color:'#F3F0EE'}}>Set up Profile picture</Text>
        </Button>
        <Button onPress={()=>formik.handleSubmit()} mode='contained' style={{backgroundColor:'#27255C',top:30,borderRadius:5}}>
          <Text style={{fontSize:responsiveFontSize(1.9),fontWeight:'400',color:'#F3F0EE'}}>Register</Text>
        </Button>
        <View>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  button1:{width:'100%',backgroundColor:'#e4e4ee',justifyContent:'center',alignItems:'center',height:responsiveHeight(5)},
  button1Pressed:{width:'100%',backgroundColor:'#e4e4ee',justifyContent:'center',alignItems:'center',height:responsiveHeight(5),opacity:0.75},
  button2:{width:'100%',backgroundColor:'#e4e4ee',alignItems:'center',justifyContent:'center',height:responsiveHeight(5.3),borderBottomLeftRadius:12,borderBottomRightRadius:12},
  button2Pressed:{width:'100%',backgroundColor:'#e4e4ee',alignItems:'center',justifyContent:'center',height:responsiveHeight(5.3),borderBottomLeftRadius:12,borderBottomRightRadius:12,opacity:0.75,backfaceVisibility:'hidden'}
})