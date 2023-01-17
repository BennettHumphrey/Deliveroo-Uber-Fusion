import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentScreen, selectSelectedNavFav, setDestination, setOrigin, setSelectedNavFav } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: {
            location: {
                lat: 48.416727,
                lng: -123.378812,
            },
            description: "James Bay, Victoria, BC, Canada"
            },
        },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: {
            location: {
                lat: 48.456302,
                lng: -123.440759,
            },
            description: "View Royal, Victoria, BC, Canada"
        },
    },
    
]



const NavFavorites = () => {

    const dispatch = useDispatch();
    const selected = useSelector(selectSelectedNavFav);
    const currentScreen = useSelector(selectCurrentScreen);
    const navigation = useNavigation();
    // let onPressNavFav = ""

    // useEffect(() => {

    // }, [])

  return (
    <FlatList 
        data={data} 
        keyExtractor={(item) => item.id} 
        ItemSeparatorComponent={() => (
        <View className="bg-gray-200" style={{height: 0.5}} />
    )}
    renderItem={({item}) => (
        <TouchableOpacity 
            onPress={() => {
                if(currentScreen === "HomeScreen") {
                    dispatch(setOrigin({
                        location: item.destination.location,
                        description: item.destination.description,
                    }));
                    console.log(`set origin ${item.destination.description}`)
                    
                } else {
                    dispatch(setDestination({
                        location: item.destination.location,
                        description: item.destination.description,
                    }))
                    navigation.navigate("RideOptionsCard");
            }
            dispatch(setSelectedNavFav(item.id));
            }}
            className={item.id === selected && currentScreen === "HomeScreen" ? "flex-row items-center p-5 bg-gray-500 rounded-xl mx-4" : "flex-row items-center p-5 mx-4"} >
            <Icon  
                className="mr-4 rounded-full bg-gray-300 p-3"
                name={item.icon}
                type="ionicon"
                color="white"
                size={18}
            />
            <View >
                <Text className="font-semibold text-lg" >{item.location}</Text>
                <Text className={item.id === selected && currentScreen === "HomeScreen" ? "text-gray-100" : "text-gray-500"} >{item.destination.description}</Text>
            </View>
        </TouchableOpacity>
    )} />
  )
}

export default NavFavorites