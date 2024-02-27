import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import ProductCard from "../common/ProductCard"; // Import the ProductCard component
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComponent from "../common/Header";
import BottomNavigationBar from "../common/BottomNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "../common/Toast";

const BrandProductsScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const brandId = route.params.brandId; // Get brandId from navigation params
  const brandName = route.params.brandName;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          "https://dotbrand-api.onrender.com/api/v1/user/brand-product-listing",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              brandId,
            }),
          }
        );

        const data = await response.json();
        const productsData = data.payload.products.map(
          ({ _id, name, salePrice, images }) => ({
            id: _id,
            name,
            price: `Rs ${salePrice}`,
            image: images[0], // Assuming the first image is to be displayed
          })
        );
        if (response.ok) {
          setProducts(productsData);
          setLoading(false);
        } else {
          console.error("Error fetching brand products:", data);
        }
      } catch (error) {
        console.error("Error fetching brand products:", error);
      }
    };

    fetchBrandProducts();
  }, [brandId]);

  const addToCart = async (productId) => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      setLoading(true);
      const response = await fetch(
        "https://dotbrand-api.onrender.com/api/v1/user/cart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      if (response.ok) {
        setToastMessage("Product added to cart!");
        setShowToast(true);
        setLoading(false);
        // Perform any additional actions upon successful addition to cart
      } else {
        setToastMessage("Failed to add product to cart");
        setShowToast(true);
        setLoading(false);
        // Handle error if adding to cart fails
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setToastMessage("Error adding product to cart");
      setShowToast(true);
      setLoading(false);
      // Handle any network or other errors that occur
    }
  };

  const addToWishlist = async (productId) => {
    try {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        "https://dotbrand-api.onrender.com/api/v1/user/wishlist",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
          }),
        }
      );

      if (response.ok) {
        setToastMessage("Product added to wishlist!");
        setShowToast(true);
        setLoading(false);
        // Perform any additional actions upon successful addition to cart
      } else {
        setToastMessage("Failed to add product to wishlist");
        setShowToast(true);
        setLoading(false);
        // Handle error if adding to cart fails
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      setToastMessage("Error adding product to wishlist");
      setShowToast(true);
      setLoading(false);
      // Handle any network or other errors that occur
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileSection}>
          <Text style={styles.profileText}>{brandName}</Text>
        </View>
        <View style={styles.productsContainer}>
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={(productId) => addToCart(productId)}
                addToWishlist={(productId) => addToWishlist(productId)}
              />
            ))
          ) : (
            <View style={styles.noProductsContainer}>
              <Image
                source={require("../images/empty1.png")} // Replace with your actual image path
                style={styles.noProductsImage}
              />
              <Text style={styles.noProductsText}>
                No products under this brand are available to show here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {/* <BottomNavigationBar /> */}
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
  contentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  profileSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 12,
    backgroundColor: "#3c088f", // Set a background color for better visibility
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Add a border at the bottom for separation
  },
  profileText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff", // Set the text color
  },

  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loader: {
    position: "absolute",
    top: "53%", // Position loader in the center vertically
    left: "45%", // Position loader in the center horizontally
    zIndex: 999, // Place loader on top of other elements
    justifyContent: "center",
    alignItems: "center",
  },
  noProductsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  noProductsImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  noProductsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
});

export default BrandProductsScreen;
