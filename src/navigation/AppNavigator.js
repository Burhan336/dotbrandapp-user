import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import Wishlist from "../screens/Wishlist";
import Products from "../screens/Products";
import BottomNavigationBar from "../common/BottomNavigator";
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
      {/* <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
     /> */}
     <Stack.Screen
          name="Products"
          component={Products}
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
    {/* <BottomNavigationBar/> */}
    </NavigationContainer>
  )
}

export default AppNavigator
