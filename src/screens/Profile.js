// ProfileScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderComponent from "../common/Header";
import BottomNavigationBar from "../common/BottomNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthStorage from "../authentication/AuthStorage";
import { jwtDecode } from "jwt-decode";

const Profile = ({ navigation }) => {
  const username = "User";
  const [email, setEmail] = useState("");
  const profileImage = require("../images/profile-user.png"); // Replace with the path to your profile image

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const decodedToken = jwtDecode(accessToken);

        setEmail(decodedToken.email || "");
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await AuthStorage.clearLoggedIn(navigation);
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error if needed
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon
              name="ios-home"
              size={25}
              color="#2000ad"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("OrderListingScreen")}
          >
            <Icon
              name="ios-list"
              size={25}
              color="#6c00aa"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Cart")}
          >
            <Icon
              name="ios-cart"
              size={25}
              color="#0ea815"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Wishlist")}
          >
            <Icon
              name="ios-heart"
              size={25}
              color="#c70000"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log("Implement other actions")}
          >
            <Icon
              name="ios-settings"
              size={25}
              color="#6b6767"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <Icon
              name="ios-log-out"
              size={25}
              color="#ff0000"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <BottomNavigationBar /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  actionsSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  actionIcon: {
    marginRight: 10,
  },
  actionText: {
    fontSize: 18,
  },
});

export default Profile;
