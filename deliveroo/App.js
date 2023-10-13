import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
import Restaurant from './Screens/Restaurant';

import { Provider } from "react-redux"
import { store } from './store';
import BasketScreen from './Screens/BasketScreen';
import PreparingOrderScreen from './Screens/PreparingOrderScreen';
import Delivery from './Screens/Delivery';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store} >
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurant" component={Restaurant} />
          <Stack.Screen name="Basket"   component={BasketScreen}  options={{
            presentation: 'modal', headerShown: false, animation:'slide_from_bottom' 
          }} />
          <Stack.Screen  name='Preparing' component={PreparingOrderScreen}  options={{
             headerShown: false, animation:'slide_from_right'
          }} />

          <Stack.Screen name="Delivery"  component={Delivery}  options={{
            headerShown: false,
            animation:'slide_from_bottom'
          }} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>

  );
}

