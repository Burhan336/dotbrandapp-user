// ProfileScreen.js
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderComponent from "../common/Header";
import BottomNavigationBar from "../common/BottomNavigator";

const Profile = ({ navigation }) => {
  const username = "John Doe";
  const email = "john.doe@example.com";
  const profileImage = require("../images/profile-user.png"); // Replace with the path to your profile image

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
            onPress={() => navigation.navigate("OrderListingScreen")}
          >
            <Icon
              name="ios-list"
              size={25}
              color="#000"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log("Implement other actions")}
          >
            <Icon
              name="ios-heart"
              size={25}
              color="#000"
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
              color="#000"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log("Implement other actions")}
          >
            <Icon
              name="ios-log-out"
              size={25}
              color="#000"
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavigationBar />
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
