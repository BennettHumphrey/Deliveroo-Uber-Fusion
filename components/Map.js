import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { GOOGLE_MAPS_APIKEY } from "@env"
import { selectCurrentMap, selectDestination, selectOrigin, setTravelTimeInfo } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { useIsFocused } from '@react-navigation/native'

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const currentMap = useSelector(selectCurrentMap);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!origin || !destination) return;
        setTimeout(() => {mapRef.current.fitToCoordinates([
            {
                latitude: origin.location.lat, 
                longitude: origin.location.lng
            },
            {
                latitude: destination.location.lat, 
                longitude: destination.location.lng
            }
            ], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50, }})}, 1)
            console.log('map fit')
    }, [origin, destination, isFocused]);

    useEffect(() => {
        if (!origin || !destination) return;
        
        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}
                &destinations=${destination?.description}&key=${GOOGLE_MAPS_APIKEY}`
                ).then((res) => res.json()).then((data) => {
                    dispatch(setTravelTimeInfo(data.rows[0].elements[0]))
                })
            }
            
            getTravelTime();
            
        }, [origin, destination, GOOGLE_MAPS_APIKEY])




  return (
    <MapView 
        ref={mapRef}
        className="flex-1" 
        mapType={currentMap === "uber" ? "mutedStandard" : "standard"}
        initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
        }}
    >

        {origin && destination && (
            <MapViewDirections  
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor={currentMap === "uber" ? "black" : "#00CCBB"}
            />
        )}

        {origin?.location && (
            <Marker  
            coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            />
        )}
        
        {destination?.location && (
            <Marker  
            coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            pinColor={currentMap === "uber" ? "black" : "#00CCBB"}
            />
        )}
        
    </MapView>
        
  )
}

export default Map