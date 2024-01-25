

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions, NavigationContainer, useNavigation} from '@react-navigation/native';
import LoginScreen from './Screens/AuthScreens/LoginScreen';
import RegisterScreen from './Screens/AuthScreens/RegisterScreen';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch } from 'react-redux';
import LogSlice, { logIn } from './redux/LogSlice';
import Home from './Screens/AppScreens/Images/Home';
import ImageAISlice from './redux/ImageAISlice';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from './Screens/AppScreens/Chat';
import CustomDrawer from './CustomDrawer' ;
import { AntDesign, Entypo, EvilIcons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import SavedImagesSlice from './redux/SavedImagesSlice';
import { Keyboard, View, Text } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useEffect, useState } from 'react';
import Ethereum from './Screens/AppScreens/Ethereum/Ethereum';
import EthSlice, { sortByAmount, sortByDate } from './redux/EthSlice';
import TransactionHistory from './Screens/AppScreens/Ethereum/TransactionHistory';
import { useFonts } from 'expo-font';
import Otp from './Screens/AuthScreens/Otp';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { IconButton } from 'react-native-paper';
import SavedImages from "./Screens/AppScreens/Images/SavedImages"
import { StatusBar } from 'expo-status-bar';
import TransactionWebView from './Screens/AppScreens/Ethereum/TransactionWebView';



function DrawerScreens(){
  const Drawer = createDrawerNavigator();
  const navigation=useNavigation();
  const[visible,setVisible]=useState(false);
  const dispatch=useDispatch();
  function open(){
    setVisible(true)
  }
  function close(){
    setVisible(false)
  }
  
  return(
    <Drawer.Navigator drawerContent={props=><CustomDrawer {...props}/> } screenOptions={{
      headerLeft:({tintColor})=><IconButton icon={"menu"}  size={responsiveFontSize(3)} iconColor={tintColor}  onPress={() =>{
        navigation.dispatch(DrawerActions.openDrawer())
        Keyboard.dismiss();
        }} />,
        headerShadowVisible:false,
        headerTitleStyle:{fontFamily:"ProximaNova"},
      headerTintColor:'#AAACB7',
      headerStyle:{ backgroundColor:'#282c34'},
      drawerStyle:{
        backgroundColor:'#282c34'
      },
      drawerLabelStyle:{fontFamily:"ProximaNova",fontSize:responsiveFontSize(1.9)},
      drawerInactiveTintColor:'#AAACB7',
      
    }}>
      <Drawer.Screen component={Home} name={'Image Generator'} options={{
        drawerIcon:({color})=><FontAwesome name="photo" size={24} color={color} />,
      }} />
      <Drawer.Screen component={Chat} name="ChatBot" options={{
        headerTransparent:true,
        headerTitle:'',
        drawerIcon:({color})=><FontAwesome5 name="robot" size={24} color={color} />
      }} />
      <Drawer.Screen component={SavedImages} name="Liked Images" options={{
        unmountOnBlur:true,
        drawerIcon:()=><AntDesign name="like1" size={22} color="#0088cc" />
      }}/>
      <Drawer.Screen component={Ethereum} name="Ethereum" options={{
        drawerIcon:({color})=><FontAwesome5 name="coins" size={24} color={color} />
      }}/>
      <Drawer.Screen component={TransactionHistory} name={"Transactions"} options={{
        drawerIcon:({color})=><Entypo name="book" size={24} color={color} />,
        unmountOnBlur:true,
        headerRight:({tintColor})=>{
          return(
            <Menu visible={visible} onRequestClose={close} anchor={<IconButton icon="sort" size={20} iconColor={tintColor} onPress={open} />}>
                    <MenuItem onPress={()=>{
                        dispatch(sortByAmount());
                        close();
                    }}>
                        <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',marginLeft:Platform.OS=='ios'?responsiveWidth(1):0}}>
                        <Text allowFontScaling={false} style={{fontFamily:"ProximaNova",marginLeft:Platform.OS=='ios'?responsiveWidth(5):0,fontSize:responsiveFontSize(1.9)}}>Ethers</Text>
                        {/* <FontAwesome5 name="ethereum" size={responsiveFontSize(2.2)} color="black" style={{marginLeft:responsiveWidth(9)}} /> */}
                        <MaterialCommunityIcons name="ethereum" size={responsiveFontSize(2.5)} color="black" style={{marginLeft:responsiveWidth(9)}} />
                        </View>
                    </MenuItem>
                    <MenuDivider/>
                    <MenuItem onPress={()=>{
                        dispatch(sortByDate());
                        close();
                    }}>
                      
                        <View style={{flexDirection:'row',justifyContent:"center",alignItems:'center',marginLeft:Platform.OS=='ios'?responsiveWidth(1):0}}>
                          <Text allowFontScaling={false} style={{fontFamily:"ProximaNova",marginLeft:Platform.OS=='ios'?responsiveWidth(5):0,fontSize:responsiveFontSize(1.9)}}>Date</Text>
                        <FontAwesome5 name="calendar" size={responsiveFontSize(2.2)} color="black" style={{marginLeft:responsiveWidth(12)}} />
                        </View>
                    </MenuItem>
                </Menu>
          );
        }
      }}/>
    </Drawer.Navigator>
  )
}
const reducer= combineReducers({
    log:LogSlice,
    ImageAI:ImageAISlice,
    savedImages:SavedImagesSlice,
    ethereum:EthSlice
})
export default function App() {
  const [loadedFont]=useFonts({
    "ProximaNova":require("./assets/ProximaNovaFont.otf")
  })
  if(!loadedFont){
    return null
  }
  const Drawer = createDrawerNavigator();
  const stack=createNativeStackNavigator();
  const store=configureStore({reducer})
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="dark" translucent={true} />
        <stack.Navigator  screenOptions={{
          headerShown:false,
          gestureEnabled:false
        }}>
          <stack.Screen component={LoginScreen} name={'Login'} options={{
          }} />
          <stack.Screen component={RegisterScreen} name={'Register'} />
          <stack.Screen component={Otp} name={'OTP'}/>
          <stack.Screen component={DrawerScreens} name={'Home'}/>
          <stack.Screen component={TransactionWebView} name={"TransactionWebView"}/>
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}