import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthStorage = {
  async setLoggedIn() {
    try {
      await AsyncStorage.setItem("@isLoggedIn", "true");
    } catch (error) {
      console.error("Error setting login status:", error);
    }
  },

  async clearLoggedIn(navigation) {
    try {
      await AsyncStorage.removeItem("@isLoggedIn");
      await AsyncStorage.removeItem("accessToken");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error clearing login status:", error);
    }
  },

  async isLoggedIn() {
    try {
      const value = await AsyncStorage.getItem("@isLoggedIn");
      return value !== null;
    } catch (error) {
      console.error("Error getting login status:", error);
      return false;
    }
  },
};

export default AuthStorage;
