import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import Wishlist from "../screens/Wishlist";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginScreen">
    <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
     />
     <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
     />
      <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
     />
     <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
     />
     <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
     />
     <Stack.Screen
          name="Wishlist"
          component={Wishlist}
          options={{ headerShown: false }}
     />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
