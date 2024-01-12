import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import Home from "../screens/Home";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import Wishlist from "../screens/Wishlist";
import Products from "../screens/Products";
import BrandProductsScreen from "../screens/BrandProductsScreen";
import CategoryProductsScreen from "../screens/CategoryProductsScreen";
import OrderListingScreen from "../screens/OrderListingScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";

// import BottomNavigationBar from "../common/BottomNavigator";
// import ProductsByCategory from "../screens/ProductsByCategory";

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
        {/* <Stack.Screen
          name="ProductsByCategory"
          component={ProductsByCategory}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="BrandProductsScreen"
          component={BrandProductsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoryProductsScreen"
          component={CategoryProductsScreen}
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
        <Stack.Screen
          name="OrderListingScreen"
          component={OrderListingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {/* <BottomNavigationBar/> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
