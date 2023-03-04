

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions, NavigationContainer, useNavigation} from '@react-navigation/native';
import LoginScreen from './Screens/AuthScreens/LoginScreen';
import RegisterScreen from './Screens/AuthScreens/RegisterScreen';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider, useDispatch } from 'react-redux';
import LogSlice, { logIn } from './redux/LogSlice';
import Home from './Screens/AppScreens/Home';
import ImageAISlice from './redux/ImageAISlice';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from './Screens/AppScreens/Chat';
import CustomDrawer from './CustomDrawer' ;
import { AntDesign, Entypo, EvilIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import ImagePick from './Screens/AuthScreens/ImagePick';
import SavedImagesSlice from './redux/SavedImagesSlice';
import { Keyboard } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect } from 'react';
import Ethereum from './Screens/AppScreens/Ethereum';
import EthSlice from './redux/EthSlice';
import TransactionHistory from './Screens/AppScreens/TransactionHistory';



function DrawerScreens(){
  const Drawer = createDrawerNavigator();
  const navigation=useNavigation();
  return(
    <Drawer.Navigator drawerContent={props=><CustomDrawer {...props}/> } screenOptions={{
      headerLeft:({tintColor})=><EvilIcons name="navicon" size={responsiveFontSize(3.5)} color={tintColor} style={{left:responsiveWidth(0.8),top:responsiveHeight(0.2)}} onPress={() =>{
        navigation.dispatch(DrawerActions.openDrawer())
        Keyboard.dismiss();
        }} />,
      headerTintColor:'#AAACB7',
      headerStyle:{ backgroundColor:'#282c34'},
      drawerStyle:{
        backgroundColor:'#282c34'
      },
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
      <Drawer.Screen component={ImagePick} name="Liked Images" options={{
        unmountOnBlur:true,
        drawerIcon:()=><AntDesign name="like1" size={22} color="#0088cc" />
      }}/>
      <Drawer.Screen component={Ethereum} name="Ethereum" options={{
        drawerIcon:({color})=><FontAwesome5 name="coins" size={24} color={color} />
      }}/>
      <Drawer.Screen component={TransactionHistory} name={"Transactions"} options={{
        drawerIcon:({color})=><Entypo name="book" size={24} color={color} />
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
  const Drawer = createDrawerNavigator();
  const stack=createNativeStackNavigator();
  const store=configureStore({reducer})
  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator  screenOptions={{
          headerShown:false,
         
        }}>
          <stack.Screen component={LoginScreen} name={'Login'} options={{
          }} />
          <stack.Screen component={RegisterScreen} name={'Register'} />
          <stack.Screen component={DrawerScreens} name={'Home'}/>
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}