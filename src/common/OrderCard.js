// OrderCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderCard = ({ order }) => {
  const getStatusColor = () => {
    return order.status === "paid"
      ? "#4CAF50" /* Green for paid */
      : "#FF5733" /* Red for unpaid */;
  };
  return (
    <View style={styles.card}>
      <Text style={styles.orderId}>{`Order ID: ${order.orderId}`}</Text>
      <Text style={styles.status}>{`Status: `}</Text>
      <Text
        style={[styles.statusText, { color: getStatusColor() }]}
      >{`${order.status}`}</Text>
      <Text
        style={styles.totalPrice}
      >{`Total Price: ${order.totalPrice}`}</Text>
      <Text style={styles.dateTime}>{`Date & Time: ${order.dateTime}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
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
    fontWeight: "bold",
    marginTop: 8,
    color: "#555",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#555",
  },
  dateTime: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 8,
    color: "#555",
  },
});

export default OrderCard;
