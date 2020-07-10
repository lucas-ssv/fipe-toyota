import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Details from './pages/Details';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#20232A',
          }
        }}
      >
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="Details" component={Details}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;