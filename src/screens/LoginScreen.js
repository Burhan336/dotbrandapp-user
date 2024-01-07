import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AuthStorage from "../authentication/AuthStorage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageType, setMessageType] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loader

  const navigation = useNavigation();

  const showLoginMessage = (message, type) => {
    setLoginMessage(message);
    setMessageType(type);

    setTimeout(() => {
      setLoginMessage("");
      setMessageType("");
    }, 5000);
  };

  const handleLogin = () => {
    const apiUrl = "https://dotbrand-api.onrender.com/api/v1/auth/login";
    const requestBody = {
      email,
      password,
      role: "user",
    };
    setIsLoading(true);

    axios.post(apiUrl, requestBody).then((response) => {
      const { accessToken } = response.data.payload.token;

      if (accessToken) {
        AsyncStorage.setItem("accessToken", accessToken)
          .then(() => {
            console.log("Access token stored successfully");
            console.log(accessToken);
            // Toggle loader back to false after successful login
            // setIsLoggedIn(true);
            AuthStorage.setLoggedIn();

            navigation.navigate("Home");
            showLoginMessage("Login successful!", "success");
            setIsLoading(false);
          })
          .catch((error) => {
            // console.error("Error storing access token:", error);
            showLoginMessage("Login failed! Please try again.", "error");
            // Handle error, such as showing an error message to the user
          });
      } else {
        setIsLoading(false); // Toggle loader back to false if accessToken is null or undefined
        // console.error("Access token is null or undefined");
        showLoginMessage("Login failed! Please try again.", "error");
      }
    });

    // // Add your login logic here
    // console.log('Email:', email);
    // console.log('Password:', password);
    // // Example: Validate credentials and navigate to the next screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />
      <View style={[styles.backgroundCircle, styles.backgroundCircle2]} />
      <View
        style={[
          styles.backgroundCircle,
          styles.backgroundCircle2,
          styles.backgroundCircle3,
        ]}
      />
      <View
        style={[
          styles.backgroundCircle,
          styles.backgroundCircle2,
          styles.backgroundCircle3,
          styles.backgroundCircle4,
        ]}
      />
      <Image source={require("../images/logo.png")} style={styles.logo} />
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#333"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#333"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#110579" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  loader: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 120,
    marginBottom: 40,
    // half of the width and height to make it circular
  },
  inputContainer: {
    alignItems: "center",
    width: "80%",
  },
  inputView: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputText: {
    height: 50,
    color: "#333",
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#f30606",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  loginText: {
    color: "#fff6f6",
    fontWeight: "bold",
  },
  backgroundCircle: {
    width: 150,
    height: 500,
    borderRadius: 200,
    backgroundColor: "#ff0000f8",
    position: "absolute",
    top: -250,
    left: -150,
    transform: [{ rotate: "-45deg" }],
    opacity: 0.7,
  },
  backgroundCircle2: {
    backgroundColor: "#968c8c",
    top: undefined,
    left: undefined,
    bottom: -250,
    right: -150,
  },
  backgroundCircle3: {
    width: 300,
    height: 300,
    backgroundColor: "#06099e",
    top: undefined,
    left: undefined,
    bottom: 600,
    right: -145,
  },
  backgroundCircle4: {
    width: 300,
    height: 300,
    backgroundColor: "#686462",
    top: undefined,
    left: -250,
    bottom: 200,
    right: undefined,
  },
});

export default LoginScreen;
