import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import DeliverooHomeScreen from './screens/DeliverooHomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store} >
      <NavigationContainer  >
        <SafeAreaProvider  >
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0} 
            className="flex-1" >
            <Stack.Navigator  >
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false,}} />
              <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown: false,}} />
              <Stack.Screen name="DeliverooHomeScreen" component={DeliverooHomeScreen} />
              <Stack.Screen name="Restaurant" component={RestaurantScreen} />
              <Stack.Screen name="Basket" component={BasketScreen}  options={{ presentation: "modal", headerShown: false }} />
              <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} options={{ presentation: "fullScreenModal", headerShown: false }} />
              <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ presentation: "fullScreenModal", headerShown: false }} />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

