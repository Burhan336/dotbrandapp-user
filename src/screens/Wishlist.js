import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderComponent from "../common/Header";
import BottomNavigationBar from "../common/BottomNavigator";
import Toast from "../common/Toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [reloadData, setReloadData] = useState(false); // New state variable
  const [loading, setLoading] = useState(true);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          "https://dotbrand-api.onrender.com/api/v1/user/wishlist",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (data && data.payload && data.payload.wishlist) {
          setWishlist(data.payload.wishlist);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadData]);

  useEffect(() => {
    // Filter products based on searchQuery
    const filtered = wishlist.filter((wishlist) =>
      wishlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, wishlist]);

  const removeFromWishlist = async (productId) => {
    try {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(
        "https://dotbrand-api.onrender.com/api/v1/user/wishlist",
        {
          method: "DELETE",
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
        setToastMessage("Product removed from wishlist!");
        setShowToast(true);
        setReloadData(!reloadData);
        setLoading(false);
        // Perform any additional actions upon successful removal from wishlist
      } else {
        setToastMessage("Failed to remove product from wishlist");
        setShowToast(true);
        setLoading(false);
        // Handle error if removal from wishlist fails
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      setToastMessage("Error removing product from wishlist");
      setShowToast(true);
      setLoading(false);
      // Handle any network or other errors that occur
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ScrollView contentContainerStyle={styles.scrollView}>
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
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
        </View>
        {filteredProducts.map((item) => (
          <TouchableOpacity key={item._id} style={styles.itemContainer}>
            <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Rs {item.salePrice}</Text>
              <Text style={styles.itemCategory}>{item.category.name}</Text>
              <Text style={styles.itemBrand}>{item.brand.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeFromWishlistButton}
              onPress={() => removeFromWishlist(item._id)} // Use item._id instead of product.id
            >
              <Icon
                name="trash-outline"
                size={30}
                color="#e00f0f"
                style={styles.trashIcon}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "white",
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
  scrollView: {
    flexGrow: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemCategory: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  itemBrand: {
    fontSize: 14,
    color: "#555",
  },
  removeButton: {
    padding: 5,
  },
});

export default Wishlist;
