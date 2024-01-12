// OrderListingScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import OrderCard from "../common/OrderCard"; // Import the OrderCard component
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComponent from "../common/Header";
import BottomNavigationBar from "../common/BottomNavigator";
import { useNavigation } from "@react-navigation/native";

const OrderListingScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          "https://dotbrand-api.onrender.com/api/v1/user/order-listing",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setOrders(data.payload.orders);
        } else {
          console.error("Error fetching orders:", data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderCardClick = (orderId) => {
    navigation.navigate("OrderDetailsScreen", { orderId });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Order History</Text>
        </View>
        <View style={styles.ordersContainer}>
          {orders.map((order) => (
            <TouchableOpacity
              key={order._id}
              onPress={() => handleOrderCardClick(order._id)}
            >
              <OrderCard
                order={{
                  orderId: order._id,
                  status: order.status,
                  totalPrice: `$${order.totalPrice}`,
                  dateTime: new Date(order.createdAt).toLocaleString(),
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomNavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headingContainer: {
    backgroundColor: "#3c088f", // Blue background color
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // White text color
  },
  ordersContainer: {
    marginBottom: 20,
  },
});

export default OrderListingScreen;
