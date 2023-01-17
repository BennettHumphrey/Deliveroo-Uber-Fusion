import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentScreen, selectOrigin, setCurrentScreen } from '../slices/navSlice'


const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "Order Food",
        image: "https://links.papareact.com/28w",
        screen: "DeliverooHomeScreen"
    }
]


const NavOptions = () => {

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

  return (
    <FlatList  
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({item}) => (
            <TouchableOpacity 
            disabled={!origin} 
            onPress={() => {
                navigation.navigate(item.screen);
            }} 
            className="pt-4 pr-2 pb-8 pl-6 bg-gray-200 m-2 w-40"
             >
                <View className={!origin && "opacity-20"} >
                    <Image  
                        style={{ width: 120, height: 120, resizeMode: "contain" }}
                        source={{ uri: item.image }}
                    />
                    <Text className="mt-2 text-lg font-semibold" >{item.title}</Text>
                    <Icon  
                        className="p-2 bg-black rounded-full w-10 mt-4"
                        name="arrowright"
                        color="white"
                        type="antdesign"
                    />
                </View>
            </TouchableOpacity>
        )}
    />
  )
}

export default NavOptions