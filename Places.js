import { API_KEY } from './ApiKey'
import React, { useState } from 'react'
import { View, FlatList, Alert, LayoutAnimation } from 'react-native'
import { Text, Button, ListItem, Input, Divider, colors } from 'react-native-elements' 
import Icon from 'react-native-vector-icons/FontAwesome'

Places.navigationOptions = {
  title: 'My  Places',
}

export default function Places({ navigation }) {
  const [place, setPlace] = useState('')
  const [placeList, setPlaceList] = useState([])
  const [hideMenu, setHideMenu] = useState(true)
  const shadows = { shadowColor: colors.grey5, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 25 }

  const savePlace = () => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${API_KEY}`
    fetch(url)
      .then(response => response.json())
      .then((responseJson) => {
        const responseObject = responseJson.results[0]
        const placeObject = {
          latitude: responseObject.geometry.location.lat,
          longitude: responseObject.geometry.location.lng,
          title: responseObject.name || responseObject.formatted_address || place,
          key: responseObject.place_id || responseObject.id,
        }
        LayoutAnimation.spring()
        setPlaceList([...placeList, placeObject])
      })
      .catch(err => Alert.alert('Error:', err))
  }

  removePlace = (placeKey) => {
    LayoutAnimation.spring()
    setPlaceList(placeList.filter(place => place.key !== placeKey))
  }

  onHideMenu = () => {
    LayoutAnimation.spring()
    setHideMenu(!hideMenu)
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      bottomDivider
      rightElement={
        <>
          <Button
            buttonStyle={{ borderRadius: 50, marginHorizontal: 5, ...shadows }}
            onPress={() => navigation.navigate('Map', { item })}
            icon={<Icon
              name="map"
              size={14}
              color="white"
              style={{ padding: 5 }}
            />}
          />
          <Button
            buttonStyle={{ backgroundColor: colors.error, borderRadius: 50, marginHorizontal: 5, ...shadows }}
            onPress={() => this.removePlace(item.key)}
            icon={<Icon
              name="trash"
              size={14}
              color="white"
              style={{ padding: 5 }}
            />}
          />
        </>
      }
    />
  )
  
  return (
    <>
    <View style={{ height: hideMenu ? 0 : 150 }}>
      <Input
        label="Place finder"
        labelStyle={{ marginTop: 15, fontWeight: '300' }}
        placeholder='Type in address'
        onChangeText={(address) => setPlace(address)}
        value={place}
      />
      <Button
        title="Save"
        onPress={savePlace}
        disabled={!place}
        icon={
          <Icon
            name="save"
            size={16}
            color={!place ? 'darkgray' : 'white'}
            style={{ padding: 10 }}
          />
        }
        style={{ margin: 10 }}
      />
    </View>
    <View>
      <Button
        buttonStyle={{ backgroundColor: colors.primary }}
        onPress={this.onHideMenu}
        icon={
          <Icon
            name="navicon"
            size={16}
            color="white"
            style={{ padding: 10 }}
          />
        }
      />
      <Divider style={{ margin: 10 }}/>
      {placeList <= 0
        ? <View style={{ height: hideMenu ? 500 : 350, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18 }}>You have no places...</Text>
            <Text style={{ fontSize: 18 }}>Add one to get started!</Text>
          </View>
        : <FlatList
          keyExtractor={item => item.key.toString()}
          data={placeList}
          renderItem={this.renderItem}
        />
      }
    </View>
    </>
  )
}
