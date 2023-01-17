import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInfo: null,
    selectedNavFav: null,
    currentScreen: null,
    currentScreen: null,
};

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
            console.log(`change destination ${JSON.stringify(action?.payload)}`)
        },
        setTravelTimeInfo: (state, action) => {
            state.travelTimeInfo = action.payload;
        },
        setSelectedNavFav: (state, action) => {
            state.selectedNavFav = action.payload
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload
            console.log(`change screen ${action.payload}`)
        },
        setCurrentMap: (state, action) => {
            state.currentMap = action.payload
            console.log(`change map ${action.payload}`)
        },
    }
});


export const { setOrigin, setDestination, setTravelTimeInfo, setSelectedNavFav, setCurrentScreen, setCurrentMap } = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInfo = (state) => state.nav.travelTimeInfo;
export const selectSelectedNavFav = (state) => state.nav.selectedNavFav;
export const selectCurrentScreen = (state) => state.nav.currentScreen;
export const selectCurrentMap = (state) => state.nav.currentMap;

export default navSlice.reducer;