// ProductCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

const ProductCard = ({ product, addToCart, addToWishlist }) => {
  return (
    <TouchableOpacity style={styles.productCard}>
      {/* <LinearGradient
        colors={["#e8e8e8", "#ffffff"]}
        style={styles.gradientBackground}
      /> */}
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productDetailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(product.id)}
          >
            <Icon
              name="cart-outline"
              size={20}
              color="#fff"
              style={styles.cartIcon}
            />
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wishlistIcon}
            onPress={() => addToWishlist(product.id)}
          >
            <Icon name="heart-outline" size={20} color="#b60909" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    elevation: 5,
    overflow: "hidden",
    position: "relative", // Required for LinearGradient overlay
  },
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    borderRadius: 12,
  },
  productImage: {
    width: "92%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 12,
    marginLeft: 7,
    marginTop: 8,
  },
  productDetailsContainer: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    maxHeight: 22,
    overflow: "hidden",
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 10,
    maxHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3c088f",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 5,
  },
  cartIcon: {
    marginRight: 5,
  },
  wishlistIcon: {
    padding: 8,
    borderRadius: 50, // Increase the border radius for a circular shape
    borderWidth: 1,
    borderColor: "#b60909",
  },
  addToCartButtonText: {
    color: "#fff",
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 12,
  },
});

export default ProductCard;
