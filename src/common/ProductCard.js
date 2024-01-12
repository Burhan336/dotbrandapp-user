// ProductCard.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProductCard = ({ product, addToCart, addToWishlist }) => {
  return (
    <TouchableOpacity style={styles.productCard}>
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
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
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
    borderRadius: 20,
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
