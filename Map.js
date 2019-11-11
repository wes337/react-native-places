import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
import MapView, { Marker, Callout } from 'react-native-maps'

MapScreen.navigationOptions = {
  title: 'Map',
}

export default function MapScreen({ route, navigation }) {
  const place = navigation.getParam('item', {
    latitude: 0,
    longtitude: 0,
    title: '',
    key: '',
  })

  const region = {
    latitude: place.latitude,
    longitude: place.longitude,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  }

  return (
    <MapView
      style={{flex: 1}}
      region={region}
    >
      <Marker
        coordinate={{ latitude: place.latitude, longitude: place.longitude }}
        title={place.title}
      >
        <Callout>
          <View>
            <Text>{place.title}</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  )
}
