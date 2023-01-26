
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import LoginScreen from './Screens/AuthScreens/LoginScreen';
import RegisterScreen from './Screens/AuthScreens/RegisterScreen';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import LogSlice from './redux/LogSlice';
import Home from './Screens/AppScreens/Home';
import ImageAISlice from './redux/ImageAISlice';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from './Screens/AppScreens/Chat';
import CustomDrawer from './CustomDrawer' ;
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import ImagePick from './Screens/AuthScreens/ImagePick';
import SavedImagesSlice from './redux/SavedImagesSlice';




function DrawerScreens(){
  const Drawer = createDrawerNavigator();
  return(
    <Drawer.Navigator drawerContent={props=><CustomDrawer {...props}/> }  screenOptions={{
      headerTintColor:'#AAACB7',
      headerStyle:{ backgroundColor:'#282c34'},
      drawerStyle:{
        backgroundColor:'#282c34'
      },
      drawerInactiveTintColor:'#AAACB7'
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
        drawerIcon:()=><AntDesign name="like1" size={22} color="#0088cc" />
      }}/>
    </Drawer.Navigator>
  )
}
const reducer= combineReducers({
    log:LogSlice,
    ImageAI:ImageAISlice,
    savedImages:SavedImagesSlice
})

export default function App() {
  const Drawer = createDrawerNavigator();
  const stack=createNativeStackNavigator();
  const store=configureStore({reducer})
  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator screenOptions={{
          headerShown:false
        }}>
          <stack.Screen component={LoginScreen} name={'Login'} />
          <stack.Screen component={RegisterScreen} name={'Register'} />
          <stack.Screen component={DrawerScreens} name={'Home'}/>
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}