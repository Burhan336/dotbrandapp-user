import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNavigationBar from "../common/BottomNavigator";
import HeaderComponent from "../common/Header";
import Toast from "../common/Toast";
import ProductCard from "../common/ProductCard";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          "https://dotbrand-api.onrender.com/api/v1/user/product-listing2",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
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
        setAllProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter products based on searchQuery
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

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
          <View style={styles.searchBar}>
            <Icon
              name="ios-search"
              size={25}
              color="#000"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
        </View>
        <View style={styles.productsContainer}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={(productId) => addToCart(productId)}
              addToWishlist={(productId) => addToWishlist(productId)}
            />
          ))}
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
  loader: {
    position: "absolute",
    top: "53%", // Position loader in the center vertically
    left: "45%", // Position loader in the center horizontally
    zIndex: 999, // Place loader on top of other elements
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  productDetailsContainer: {
    padding: 10,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 4,
    borderColor: "#e4dede",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  quantityText: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
});

export default Products;
