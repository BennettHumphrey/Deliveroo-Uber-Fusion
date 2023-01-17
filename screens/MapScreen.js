import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { Icon } from 'react-native-elements'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentScreen, setCurrentMap, setCurrentScreen, setSelectedNavFav } from '../slices/navSlice'

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused){
    dispatch(setCurrentScreen("MapScreen"));
    dispatch(setSelectedNavFav(null));
    dispatch(setCurrentMap("uber"));
  }
  }, [isFocused])

  return (
    <View>
      <TouchableOpacity onPress={() => {
        navigation.navigate("HomeScreen");
      }}
      className="bg-gray-100 absolute top-12 left-5 z-50 p-3 rounded-full shadow-lg" >
        <Icon name="menu" />
      </TouchableOpacity>
        <View className="h-1/2" >
            <Map  />
        </View>
        <View className="h-1/2" >
          <Stack.Navigator  >
            <Stack.Screen  
              name="NavigateCard"
              component={NavigateCard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen  
              name="RideOptionsCard"
              component={RideOptionsCard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </View>
    </View>
  )
}

export default MapScreen