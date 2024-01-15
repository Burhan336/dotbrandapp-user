import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNavigationBar from "../common/BottomNavigator"; // Assuming you've imported the BottomNavigationBar component
import HeaderComponent from "../common/Header";
import { jwtDecode } from "jwt-decode";

import { useNavigation } from "@react-navigation/native";
import { decode, encode } from "base-64";

// Polyfill for global environment
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const HomeScreen = () => {
  const [username, setUsername] = useState("");
  const profileImage = require("../images/profile-user.png"); // Replace with the path to your profile image
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const decodeToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken?.email || "";
    } catch (error) {
      console.error("Error decoding token:", error);
      return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          "https://dotbrand-api.onrender.com/api/v1/user/category-listing",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        const categoriesData = data.payload.categories.map(
          ({ _id, name, image }) => ({ _id, name, image })
        );
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    const fetchBrands = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          "https://dotbrand-api.onrender.com/api/v1/user/brand-listing",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const decodedEmail = decodeToken(accessToken);

        setUsername(decodedEmail);

        const data = await response.json();
        const BrandsData = data.payload.brands.map(({ _id, name, image }) => ({
          _id,
          name,
          image,
        }));
        setBrands(BrandsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setLoading(false);
      }
    };

    const fetchBanners = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          "https://dotbrand-api.onrender.com/api/v1/user/banner-listing",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        const bannersData = data.payload.banners.map(({ name, image }) => ({
          name,
          image,
        }));
        setBanners(bannersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setLoading(false);
      }
    };

    fetchData();
    fetchBrands();
    fetchBanners();
  }, []);

  const handleBrandPress = (brandId, brandName) => {
    // Navigate to BrandProductsScreen with brandId
    navigation.navigate("BrandProductsScreen", { brandId, brandName });
  };

  const handleCategoryPress = (categoryId, categoryName) => {
    // Navigate to BrandProductsScreen with brandId
    navigation.navigate("CategoryProductsScreen", { categoryId, categoryName });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Image source={profileImage} style={styles.profileImage} />
            <Text style={styles.welcomeText}>Welcome, {username}</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bannerScroll}
        >
          {banners.map((banner, index) => (
            <Image
              key={index}
              source={{ uri: banner.image }}
              style={styles.bannerImage}
            />
          ))}
        </ScrollView>
        <Text style={styles.categoryHeading}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => {
                handleCategoryPress(category._id, category.name);
              }}
            >
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />

              <Text style={styles.categoryLabel}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.categoryHeading}>Brands</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {brands.map((brand, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => {
                handleBrandPress(brand._id, brand.name);
              }}
            >
              <Image
                source={{ uri: brand.image }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryLabel}>{brand.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

  profileSection: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    marginTop: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

  bannerScroll: {
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  bannerImage: {
    width: 350,
    height: 300,
    marginRight: 10,
    borderRadius: 10,
  },
  categoryHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
  },
  categoryScroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryCard: {
    width: 210,
    height: 210,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryLabel: {
    marginTop: 7,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  categoryImage: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },
});

export default HomeScreen;
