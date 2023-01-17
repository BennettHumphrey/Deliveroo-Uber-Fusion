import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useRef } from 'react'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { useDispatch, useSelector } from 'react-redux'
import { setOrigin, setDestination, setSelectedNavFav, selectSelectedNavFav, selectOrigin, setCurrentScreen, selectCurrentScreen } from '../slices/navSlice'
import NavFavorites from '../components/NavFavorites'
import { useIsFocused } from '@react-navigation/native'

const HomeScreen = () => {

    const dispatch = useDispatch();
    const autocompleteRef = useRef();
    const selected = useSelector(selectSelectedNavFav);
    const origin = useSelector(selectOrigin);
    const screen = useSelector(selectCurrentScreen);
    const isFocused = useIsFocused();


    useEffect(() => {
        if(selected) {
            autocompleteRef.current.setAddressText(origin.description);
        }
    }, [selected])

    useEffect(() => {
        if(isFocused){
        dispatch(setCurrentScreen("HomeScreen"));
        dispatch(setSelectedNavFav(null));
    }
      }, [isFocused])

  return (
    <SafeAreaView className="bg-white h-full" >
        <View className="p-5" >
            <Image 
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                }}
                source={{
                    uri: "https://links.papareact.com/gzs",
                }}
                />

                <GooglePlacesAutocomplete  
                    ref={autocompleteRef}
                    placeholder='Where From?'
                    styles={{
                        container: {flex: 0,},
                        textInput: {fontSize: 18,}
                    }}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        }));
                        dispatch(setDestination(null));
                        dispatch(setSelectedNavFav(null));
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    // debounce={400}
                />

            <NavOptions  />
            <NavFavorites  />
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen


