import React from 'react'
import { NativeModules } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Places from './Places'
import Map from './Map'

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
