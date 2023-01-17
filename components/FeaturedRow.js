import { View, Text, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'
import { useSelector } from 'react-redux'
import { selectSearchedRestaurants } from '../slices/restaurantSlice'

const FeaturedRow = ({id, title, description, type}) => {
  const [restaurants, setRestaurants] = useState([])
  const searchedRestaurants = useSelector(selectSearchedRestaurants);

  useEffect(() => {
    if(type === "featured"){
    sanityClient.fetch(
      `
      *[_type == 'featured' && _id == $id] {
        ...,
        restaurants[] ->{
          ...,
          dishes[] ->,
          type-> {
            name
          }
        }
      }[0]
      `,
      { id }
    ).then((data => {
      setRestaurants(data?.restaurants)
    }))};
    // if(type === "search") {
    //   setRestaurants(searchedRestaurants);
    //   console.log(`set restaurants: ${searchedRestaurants}`)
    // }
  }, [id, searchedRestaurants])
  // console.log(restaurants)

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-5" >
        <Text className="font-bold text-lg" >{title}</Text>
      </View>

      <Text className="text-xs text-gray-500 px-6" >{description}</Text>

      <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      showsHorizontalScrollIndicator={false}
      className="pt-4" 
      >
        {restaurants?.map((res) => (
          <RestaurantCard 
          key={res._id}
          id={res._id}
          imgUrl={res.image}
          title={res.name}
          rating={res.rating}
          genre={res.type?.name}
          address={res.address}
          short_description={res.short_description}
          dishes={res.dishes}
          long={res.long}
          lat={res.lat}
           />
        ))}




      </ScrollView>

    </View>
  )
}

export default FeaturedRow