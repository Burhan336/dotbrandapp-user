import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import ProductCard from "../common/ProductCard"; // Import the ProductCard component
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderComponent from "../common/Header";
import BottomNavigationBar from "../common/BottomNavigator";
import Icon from "react-native-vector-icons/Ionicons";

const BrandProductsScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const brandId = route.params.brandId; // Get brandId from navigation params
  const brandName = route.params.brandName;

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
            price: `$${salePrice}`,
            image: images[0], // Assuming the first image is to be displayed
          })
        );
        if (response.ok) {
          setProducts(productsData);
        } else {
          console.error("Error fetching brand products:", data);
        }
      } catch (error) {
        console.error("Error fetching brand products:", error);
      }
    };

    fetchBrandProducts();
  }, [brandId]);

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileSection}>
          <Text style={styles.profileText}>{brandName}</Text>
        </View>
        <View style={styles.productsContainer}>
          {products ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={(productId) => {
                  // Handle add to cart logic
                  console.log("Add to cart:", productId);
                }}
                addToWishlist={(productId) => {
                  // Handle add to wishlist logic
                  console.log("Add to wishlist:", productId);
                }}
              />
            ))
          ) : (
            <Text>No products available</Text>
          )}
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
});

export default BrandProductsScreen;
