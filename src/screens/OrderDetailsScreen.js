// OrderDetailsScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComponent from "../common/Header";
import BottomNavigationBar from "../common/BottomNavigator";

const OrderDetailsScreen = ({ route }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const orderId = route.params.orderId;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          `https://dotbrand-api.onrender.com/api/v1/user/order-details/${orderId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          const { order, error } = data.payload; // Access the correct properties

          if (error) {
            console.error("Error fetching order details:", error);
            // Handle the error as needed, e.g., show an error message.
            return;
          }

          const { orderItems, status, totalPrice, createdAt } = order;

          const simplifiedOrderDetails = {
            status,
            totalPrice: `$${totalPrice}`,
            createdAt: new Date(createdAt).toLocaleString(),
            items: orderItems.map(({ _id, productId, quantity }) => ({
              id: _id,
              name: productId.name,
              quantity: quantity,
              price: `$${productId.salePrice}`,
              image: productId.images[0],
            })),
          };

          setOrderDetails(simplifiedOrderDetails);
        } else {
          console.error("Error fetching order details:", data);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <HeaderComponent />
        <Text>Loading...</Text>
        {/* <BottomNavigationBar /> */}
      </View>
    );
  }

  const getStatusColor = () => {
    return orderDetails.status === "paid" ? "#4CAF50" : "#FF0000";
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.orderDetailsCard}>
          <Text style={styles.orderId}>Order Details</Text>
          <Text
            style={[styles.status, { color: getStatusColor() }]}
          >{`Status: ${orderDetails.status}`}</Text>
          <Text
            style={styles.totalPrice}
          >{`Total Price: ${orderDetails.totalPrice}`}</Text>
          {/* <Text style={styles.dateTime}>{`Date & Time: ${new Date(
            orderDetails.createdAt
          ).toLocaleString()}`}</Text> */}
          <Text style={styles.itemsHeading}>Ordered Items</Text>
          {orderDetails.items &&
            orderDetails.items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text
                    style={styles.itemQuantity}
                  >{`Quantity: ${item.quantity}`}</Text>
                  <Text style={styles.itemPrice}>{`Price: ${item.price}`}</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      {/* <BottomNavigationBar /> */}
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
  orderDetailsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  status: {
    fontSize: 16,
    marginTop: 8,
  },
  totalPrice: {
    fontSize: 16,
    marginTop: 8,
    color: "#555",
  },
  dateTime: {
    fontSize: 16,
    marginTop: 8,
    color: "#555",
  },
  itemsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    color: "#333",
  },
  itemCard: {
    flexDirection: "row",
    marginBottom: 15,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#555",
  },
  itemPrice: {
    fontSize: 14,
    color: "#555",
  },
});

export default OrderDetailsScreen;
