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
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthStorage from "../authentication/AuthStorage";
import { Feather } from "@expo/vector-icons";

const LoginScreen = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values, { setSubmitting }) => {
    const apiUrl = "https://dotbrand-api.onrender.com/api/v1/auth/login";
    const requestBody = {
      email: values.email,
      password: values.password,
      role: "user",
    };
    setIsLoading(true);

    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        const { accessToken } = response.data.payload.token;

        if (accessToken) {
          AsyncStorage.setItem("accessToken", accessToken)
            .then(() => {
              console.log("Access token stored successfully");
              console.log(accessToken);
              setIsLoading(false); // Toggle loader back to false after successful login
              AuthStorage.setLoggedIn();
              showLoginMessage("Login successful!", "success");
              navigation.navigate("Home");
            })
            .catch((error) => {
              setIsLoading(false); // Toggle loader back to false if storing token fails
              // console.error("Error storing access token:", error);
              showLoginMessage("Login failed! Please try again.", "error");
              // Handle error, such as showing an error message to the user
            });
        } else {
          setIsLoading(false); // Toggle loader back to false if accessToken is null or undefined
          // console.error("Access token is null or undefined");
          showLoginMessage("Login failed! Please try again.", "error");
        }
      })
      .catch((error) => {
        setIsLoading(false); // Toggle loader back to false if login fails
        // console.error("Login failed:", error);
        showLoginMessage("Login failed! Please try again.", "error");
      })
      .finally(() => {
        setSubmitting(false); // Ensure submission state is updated in Formik
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
        errors,
      }) => (
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
                placeholder="Email"
                style={styles.inputText}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <View style={styles.inputView}>
              <TextInput
                placeholder="Password"
                style={styles.inputText}
                secureTextEntry={!showPassword}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)} // Toggle showPassword state on press
              >
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#333"
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginText}>Login</Text>
              )}
            </TouchableOpacity>
            {/* {isLoading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#110579" />
              </View>
            )} */}
            {loginMessage !== "" && (
              <View style={styles.loginMessageContainer}>
                <Text
                  style={
                    messageType === "success"
                      ? styles.successText
                      : styles.errorText
                  }
                >
                  {loginMessage}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </Formik>
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
  loginButton: {
    backgroundColor: "#8a0b0b",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: "center",
    marginTop: 60,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginMessageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: 30,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  successText: {
    color: "green",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: -15,
    marginBottom: 15,
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
    left: -260,
    bottom: 200,
    right: undefined,
  },
  eyeIcon: {
    position: "absolute",
    top: 12,
    right: 20,
  },
});

export default LoginScreen;
