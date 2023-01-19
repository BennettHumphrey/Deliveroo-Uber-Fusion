import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Currency from 'react-currency-formatter'
import { selectTravelTimeInfo } from '../slices/navSlice';
import { formatTime } from './formatTime';

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInfo = useSelector(selectTravelTimeInfo);

    const data = [
        {
            id: "Uber-X-123",
            title: "Uber X",
            priceMultiplier: 1,
            timeMultiplier: 1,
            image: "https://links.papareact.com/3pn"
        },
        {
            id: "Uber-XL-456",
            title: "Uber XL",
            priceMultiplier: 1.2,
            timeMultiplier: 1.05,
            image: "https://links.papareact.com/5w8"
        },
        {
            id: "Uber-LUX-789",
            title: "Uber LUX",
            priceMultiplier: 1.75,
            timeMultiplier: 0.9,
            image: "https://links.papareact.com/7pf"
        },
    ]

    const surgeRate = 1.5;

    useEffect(() => {
        console.log(`travelTimeInfo: ${travelTimeInfo?.duration}`)
    }, [travelTimeInfo, selected])


  return (
    <SafeAreaView className="bg-white flex-grow" >
        <View  >
            <TouchableOpacity className="absolute top-3 left-5 p-3 z-50 rounded-full"
                onPress={() => navigation.navigate("NavigateCard")} >
                <Icon name="chevron-left" type='font-awesome' />

            </TouchableOpacity>
            <Text className="text-center pb-4 text-xl" >Select a Ride - {travelTimeInfo?.distance?.text}</Text>
        </View>



        <FlatList  
            className="flex-1"
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item: { id, title, priceMultiplier, timeMultiplier, image }, item }) => (
                <TouchableOpacity 
                    onPress={() => setSelected(item)}
                    className={id===selected?.id ? "flex-row justify-between items-center px-10 bg-gray-200" : "flex-row justify-between items-center px-10"}
                    
                     >
                    <Image  
                        style={{ width: 100, height: 100, resizeMode: "contain", }}
                        source={{ uri: image }}
                    />
                    <View className="-ml-6" >
                        <Text className="text-xl font-semibold" >{title}</Text>
                        <Text className="ml-3" >{travelTimeInfo && formatTime(travelTimeInfo?.duration?.value * timeMultiplier)}</Text>
                    </View>
                    <Text className="text-xl" >
                    {travelTimeInfo?.duration ? <Currency quantity={Number(travelTimeInfo?.duration?.value) * surgeRate * priceMultiplier / 100} currency="USD" /> : "N/A"}
                    </Text>
                </TouchableOpacity>
            )}
        />
        <View className="mt-auto border-t border-gray-200" >
            <TouchableOpacity disabled={!selected} className={!selected ? 'bg-gray-300 py-3 m-3 rounded-md' : 'bg-black py-3 m-3 rounded-md'} >
                <Text className="text-center text-white text-xl" >Choose {selected?.title}</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

export default RideOptionsCard