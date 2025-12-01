import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useColorScheme } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  NavigationContainer,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import newspaper from '../assets/newspaper.png';
// import Home from './screens/Home';
import BookCollection from './navigation/screens/BookCollection'
import NotFound from './navigation/screens/Home'
import { View, Text } from 'react-native';
import Home from './navigation/screens/Home'


const Stack = createNativeStackNavigator();

export function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component = {Home}/>
        <Stack.Screen name="BookCollection" component = {BookCollection}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;



