import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigationBar from '../common/BottomNavigator';
import HeaderComponent from '../common/Header';
import Toast from '../common/Toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await fetch('https://dotbrand-api.onrender.com/api/v1/user/product-listing2', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        const productsData = data.payload.products.map(({ _id, name, salePrice, images }) => ({
          id: _id,
          name,
          price: `$${salePrice}`,
          image: images[0], // Assuming the first image is to be displayed
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const addToCart = async (productId) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch('https://dotbrand-api.onrender.com/api/v1/user/cart', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
      });

      if (response.ok) {
        setToastMessage('Product added to cart!');
        setShowToast(true);
        // Perform any additional actions upon successful addition to cart
      } else {
        setToastMessage('Failed to add product to cart');
        setShowToast(true);
        // Handle error if adding to cart fails
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setToastMessage('Error adding product to cart');
      setShowToast(true);
      // Handle any network or other errors that occur
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await fetch('https://dotbrand-api.onrender.com/api/v1/user/wishlist', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
      });

      if (response.ok) {
        setToastMessage('Product added to wishlist!');
        setShowToast(true);
        // Perform any additional actions upon successful addition to cart
      } else {
        setToastMessage('Failed to add product to wishlist');
        setShowToast(true);
        // Handle error if adding to cart fails
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      setToastMessage('Error adding product to wishlist');
      setShowToast(true);
      // Handle any network or other errors that occur
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileSection}>
          <View style={styles.searchBar}>
            <Icon name="ios-search" size={25} color="#000" style={styles.searchIcon} />
            <TextInput placeholder="Search..." style={styles.searchInput} />
          </View>
        </View>
        <View style={styles.productsContainer}>
        {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productDetailsContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(product.id)}>
                    <Icon name="cart-outline" size={20} color="#fff" style={styles.cartIcon} />
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={styles.wishlistIcon} onPress={() => addToWishlist(product.id)}>
                    <Icon name="heart-outline" size={20} color="#b60909" />
                    </TouchableOpacity>
                </View>
                </View>
            </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <BottomNavigationBar />
      <Toast message={toastMessage} showToast={showToast} setShowToast={setShowToast} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
      },
      profileSection: {
        marginTop: 10,
        paddingHorizontal: 20,
        marginBottom: 30,
      },
      searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginTop: 10,
      },
      searchIcon: {
        marginRight: 5,
      },
      searchInput: {
        flex: 1,
        height: 50,
      },
      productDetailsContainer: {
        padding: 10,
      },
      productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      
      productCard: {
        marginLeft:2,
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 20,
        elevation: 5,
        overflow: 'hidden',
      },
      
      productImage: {
        width: '100%',
        height: 120, // Fixed height for product images
        resizeMode: 'cover',
      },
      productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        maxHeight: 22,
        overflow: 'hidden',
      },
      
      productPrice: {
        fontSize: 16,
        marginBottom: 10,
        maxHeight: 20, // Limit the maximum height of the price text
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto', // This will push the button container to the bottom of the card
      },
      
      addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3c088f',
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
        borderColor: '#b60909',
      },
      addToCartButtonText: {
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 8,
        fontSize: 12,
      },
      
});

export default Products;
