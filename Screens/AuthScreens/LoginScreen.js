import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useFormik } from 'formik';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import LoginSvg from '../../assets/LoginSvg';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, screenRemoval } from '../../redux/LogSlice';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';


export default function LoginScreen() {
  const dispatch=useDispatch();
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
  return (
    <ScrollView style={styles.container} contentContainerStyle={{flex:1}}>
      <View style={{alignSelf:'center'}}>
        <LoginSvg/>
      </View>
      <View style={{bottom:15}}>
        <View style={{left:50}}>
          <Text style={{fontSize:responsiveFontSize(6),color:'#27255C'}}>Welcome</Text>
          <Text style={{color:'#9CA6CE',left:5,bottom:10,fontSize:responsiveFontSize(2)}}>Sign in down below</Text>
        </View>
        <View style={{width:'100%',height:'100%'}}>
          <View style={{top:5}}>
          <View style={{left:50,top:10}}>
            {(formik.errors.email&&formik.touched.email)?
            <View style={{flexDirection:'row'}}>
                <MaterialIcons name="error" size={13} style={{alignSelf:'center',marginRight:3}} color='#ff7961'/>
                <Text style={{color:'red',fontSize:12}}>{formik.errors.email}</Text>
            </View>:null}
          </View>
          
            <TextInput
            left={<TextInput.Icon icon={'email'} size={22}/>} 
            mode='outlined'
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            label="Email" 
            outlineColor={'#3949ab'}
            activeOutlineColor={'#6f74dd'}
            onBlur={formik.handleBlur('email')}
            style={{width:'80%',alignSelf:'center',marginVertical:10,backgroundColor:'#e4e4ee',fontSize:responsiveFontSize(1.9)}}
            />
            <View style={{bottom:3}}>
            <View style={{left:50}} >
              {(formik.errors.password&&formik.touched.password)?
              <View style={{flexDirection:'row'}}>
                <MaterialIcons name="error" size={13} style={{alignSelf:'center',marginRight:3}} color='#ff7961'/>
                <Text style={{color:'red',fontSize:12}}>{formik.errors.password}</Text>
              </View>:null}
            </View>
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
            style={{width:'80%',alignSelf:'center',backgroundColor:'#e4e4ee',fontSize:responsiveFontSize(1.9)}}
            />
            </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',height:responsiveHeight(5),top:responsiveHeight(5)}}>
              {error?
                <>
                <View style={{flexDirection:'row',width:'75%',justifyContent:"center",alignItems:'center'}}>
                  <MaterialIcons name="error" size={14} style={{alignSelf:'center',marginRight:3}} color='#ff7961'/>
                  <Text style={{color:'#ff7961',fontSize:15}}>
                  {error}
                  </Text>
                </View>
                </>
                :null
              }
            </View>
          <Button onPress={()=>formik.handleSubmit()} mode='contained' style={{backgroundColor:'#27255C',width:'75%',alignSelf:'center',marginTop:'20%',borderRadius:5}}>
            <Text style={{fontSize:18,fontWeight:'400',color:'#F3F0EE'}}>Login</Text>
          </Button>
          <View style={{alignSelf:'center',marginTop:3}}>
            <TouchableOpacity>
              <Text style={{fontWeight:'400',color:'#9CA6CE',fontSize:14}}>forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{position:'absolute',top:responsiveHeight(50),alignSelf:'center',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            <Text style={{color:'#9CA6CE',fontWeight:'500'}}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}><Text style={{fontWeight:'800',color:'#27255C'}}> Sign up here</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    height:'100%'
  }
});