// CheckoutScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const fetchSessionId = async () => {
      setLoading(true);

      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const response = await fetch(
          "https://dotbrand-api.onrender.com/api/v1/user/order",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // ...additional order data
            }),
          }
        );

        const data = await response.json();

        if (data.statusCode === 200) {
          console.log("Session ID from API:", data.payload.sessionId);
          setSessionId(data.payload.sessionId);
          setLoading(false);
        } else {
          console.error("Failed to fetch session ID. API response:", data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching session ID:", error);
        setLoading(false);
      }
    };

    fetchSessionId();
  }, []);

  const handlePayment = async () => {
    setLoading(true);

    try {
      await initPaymentSheet({
        paymentIntentClientSecret: sessionId,
      });

      // Open the URL in the device's default browser
      await Linking.openURL(
        `https://checkout.stripe.com/c/pay/${sessionId}#fidkdWxOYHwnPyd1blpxYHZxWjA0S3RBRzJDUHF0bGlqQkJJcUBSfFNXYnNSZnJNcjZPUzc0QEc8Q1dMcGF3bkZWVUhGbE9PV0RMaHxOcF8xMGFmQnV8NkszX1xuS0didUdsSldxajdMd0Q8NTVXMUZLUjUzTicpJ2hsYXYnP34nYnBsYSc%2FJzcwYTQxZj1kKGc3ZGMoMTRgPChnY2ZjKDdnNTU8ND0xPTJgYDA9PGQ3MicpJ2hwbGEnPyczNDAxYGY0MCgyYWEyKDEzMWcoPGEzMChhZ2EwNWFjYzJnPGc9ZzRkMjwnKSd2bGEnPydhYTE3MzMwNChnZjZmKDE0Z2AoPGYwYSgyNzAzMjU1YDA3NjwxNjBmN2MneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXU%2FKippamZkaW1qdnE%2FNjU1NSd4JSUl`
      );

      console.log(`https://checkout.stripe.com/c/pay/${sessionId}`);
      setLoading(false);
    } catch (error) {
      console.error("Error initiating payment:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#9f9fa5" style={styles.loader} />
      ) : sessionId ? (
        <Text>Session ID from API: {sessionId}</Text>
      ) : (
        <Text>Error loading payment page</Text>
      )}
      <TouchableOpacity
        onPress={handlePayment}
        disabled={loading}
        style={styles.proceedButton}
      >
        <Text style={styles.proceedText}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "45%",
    zIndex: 999,
  },
  proceedButton: {
    backgroundColor: "#3c088f",
    borderRadius: 12,
    padding: 15,
    margin: 20,
    alignItems: "center",
  },
  proceedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
