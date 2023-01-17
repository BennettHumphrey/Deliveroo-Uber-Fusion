import { configureStore } from "@reduxjs/toolkit";
import navReducer from './slices/navSlice'
import basketReducer from './slices/basketSlice'
import restaurantReducer from './slices/restaurantSlice'

export const store = configureStore({
    reducer: {
        nav: navReducer,
        basket: basketReducer,
        restaurant: restaurantReducer,
    }
});