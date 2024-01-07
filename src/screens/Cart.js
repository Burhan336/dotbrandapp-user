import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderComponent from "../common/Header";
import BottomNavigationBar from "../common/BottomNavigator";
import Toast from "../common/Toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          "https://dotbrand-api.onrender.com/api/v1/user/cart",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (data && data.payload && data.payload.cartItems) {
          setCartItems(data.payload.cartItems);
          setTotalPrice(data.payload.totalPrice);
          setTotalQuantity(data.payload.totalQuantity);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setToastMessage("Failed to fetch cart items");
        setShowToast(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadData]);

  const deleteFromCart = async (orderItemId) => {
    try {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        "https://dotbrand-api.onrender.com/api/v1/user/cart",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderItemId,
          }),
        }
      );

      if (response.ok) {
        setToastMessage("Product deleted from cart!");
        console.log(orderItemId);
        setShowToast(true);
        setReloadData(!reloadData);
        setLoading(false);
      } else {
        setToastMessage("Failed to delete product from cart");
        setShowToast(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting product from cart:", error);
      setToastMessage("Error deleting product from cart");
      setShowToast(true);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {cartItems.map((product) => (
          <View key={product._id} style={styles.itemContainer}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{product.productName}</Text>
              <Text style={styles.itemQuantity}>
                Quantity: {product.quantity}
              </Text>
              <Text style={styles.itemPrice}>Price: ${product.totalPrice}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteFromCart(product._id)}>
              {/* Add delete functionality */}
              <Icon name="trash-outline" size={30} color="#ff0000" />
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.totalContainer}>
          <View style={styles.totalSection}>
            <Text style={styles.totalTitle}>Total Quantity</Text>
            <Text style={styles.totalValue}>{totalQuantity}</Text>
          </View>
          <View style={styles.totalSection}>
            <Text style={styles.totalTitle}>Total Price</Text>
            <Text style={styles.totalValue}>${totalPrice}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavigationBar />
      <Toast
        message={toastMessage}
        showToast={showToast}
        setShowToast={setShowToast}
      />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#9f9fa5" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  loader: {
    position: "absolute",
    top: "50%", // Position loader in the center vertically
    left: "45%", // Position loader in the center horizontally
    zIndex: 999, // Place loader on top of other elements
    justifyContent: "center",
    alignItems: "center",
  },

  scrollView: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    marginLeft: 10,
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
  },
  totalContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 16,
    color: "#3c088f",
  },
  checkoutButton: {
    backgroundColor: "#3c088f",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 70,
    marginBottom: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cart;
