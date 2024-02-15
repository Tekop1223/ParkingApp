import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import ParkingPage from './screens/ParkingPage';
import RegisterUserPage from './screens/RegisterUserPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ title: "ParkingApp" }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ title: "Login", headerBackVisible: false }} />
        <Stack.Screen name="Parking" component={ParkingPage} options={{ title: "Parking", headerBackVisible: false }} />
        <Stack.Screen name="RegisterUser" component={RegisterUserPage} options={{ title: "Register", headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
