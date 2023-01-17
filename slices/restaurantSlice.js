import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurant: {
        id: null,
        imUrl: null,
        title: null,
        rating: null,
        genre: null,
        address: null,
        short_description: null,
        dishes: null,
    },
    searchedRestaurants: {}
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
            setRestaurant: (state, action) => {
                state.restaurant = action.payload;
            },
            setSearchedRestaurants: (state, action) => {
                state.searchedRestaurants = action.payload;
            },
        },
    }
);

export const { setRestaurant, setSearchedRestaurants } = restaurantSlice.actions;

export const selectRestaurant = (state) => state.restaurant.restaurant;
export const selectSearchedRestaurants = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer;