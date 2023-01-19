import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
// import SafeViewAndroid from '../components/AndroidSafeView'
import { 
    UserIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
 } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
import { setSearchedRestaurants } from '../slices/restaurantSlice'

const DeliverooHomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);
    const [searchText, setSearchText] = useState("");
    const origin = useSelector(selectOrigin);
    const dispatch = useDispatch();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
    })}, []);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[] -> {
                ...,
                dishes[] ->,
          type-> {
            name
          }
            }
        }
        `).then((data) => {
            setFeaturedCategories(data)
        })
    }, [])

    // useEffect(() => {
    //     if(searchText){
    //     sanityClient.fetch(`*[name match "*${searchText}*"][_type == "restaurant"] {
    //         ...,
    //         dishes[] ->,
    //       type-> {
    //         name
    //       }
    //     }`).then((data) => {
    //         dispatch(setSearchedRestaurants(data));
    //         console.log(`searched data: ${data}`);
    //         console.log(`search: ${searchText}`)
    //     })}
    // }, [searchText])


    // console.log(featuredCategories)

  return (
    <SafeAreaView className="bg-white pt-5 w-screen ">

        {/* Header */}
            <View className="flex-row pb-3  items-center mx-4 space-x-2" >
                <Image 
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}    
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />       

                <View className="flex-1" >
                    <Text className="font-bold text-gray-400 text-xs" >Deliver Now!</Text>    
                    <Text className="font-bold text-xl" >{origin.description}</Text>    
                </View>    
                <UserIcon size={35} color="#00CCBB" /> 
            </View>
            {/* Search */}
            <View className="flex-row space-x-2 items-center pb-4 mx-2" >
                <View className="flex-row flex-1 space-x-2 p-3 mx-2 bg-gray-200" >
                    <MagnifyingGlassIcon color="gray" size={20} />
                    <TextInput 
                    placeholder='Restaurants and Cuisines'
                    keyboardType='default'
                    value={searchText}
                    onChangeText={setSearchText} />
                </View>
                <AdjustmentsHorizontalIcon color="#00CCBB" />
            </View>

            {/* Body */}
            <ScrollView className="bg-gray-100" contentContainerStyle={{paddingBottom: 150}} >
                {/* Categories */}
                <Categories  />
                {/* Search Results */}
                {searchText && (
                    <FeaturedRow  
                    title="Search"
                    type="search"
                    description="Search Results"
                    />
                )}
                {/* Featured */}
                {featuredCategories?.map((cat) => ( 
                        <FeaturedRow 
                        key={cat._id}
                        id={cat._id}
                        title={cat.name}
                        type="featured"
                        description={cat.short_description}
                    />)
                )}


            </ScrollView>

      
    </SafeAreaView>
  )
}

export default DeliverooHomeScreen