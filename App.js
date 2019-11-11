import * as firebase from 'firebase'
import React from 'react'
import { NativeModules } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Places from './Places'
import Map from './Map'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDlNYpgjhIcf4f9Or5X2kYJ982AgHguAJM",
  authDomain: "react-native-places-7dc5b.firebaseapp.com",
  databaseURL: "https://react-native-places-7dc5b.firebaseio.com",
  projectId: "react-native-places-7dc5b",
  storageBucket: "react-native-places-7dc5b.appspot.com",
  messagingSenderId: "847760272751",
  appId: "1:847760272751:web:273af5f0b395f533508c9a"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true)

const AppNavigator = createStackNavigator({
  Places,
  Map,
},
{
  initialRouteName: 'Places',
})

const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return (
    <AppContainer />
  )
}
