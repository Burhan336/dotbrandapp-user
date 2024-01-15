import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";

const SplashScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const rotation = new Animated.Value(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      navigation.replace("LoginScreen"); // Navigate to the LoginScreen after 3 seconds
    }, 3000);

    // Loader animation
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    return () => clearTimeout(timer);
  }, [navigation, rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.gradient}></View>
      <View style={styles.logoContainer}>
        <View style={styles.avatar}>
          <Image source={require("../images/logo.png")} style={styles.logo} />
        </View>
      </View>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <View style={styles.loader}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </Animated.View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#8a0b0b", // Replace with your desired gradient colors or styles
  },
  logoContainer: {
    position: "absolute",
    top: "40%", // Adjust as needed
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden", // Clip the image to the circle
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  loaderContainer: {
    position: "absolute",
    bottom: 50,
  },
  loader: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
