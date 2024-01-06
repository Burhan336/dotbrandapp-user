import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigationBar from '../common/BottomNavigator'; // Assuming you've imported the BottomNavigationBar component
import HeaderComponent from '../common/Header';

const HomeScreen = () => {
  // Replace placeholders with actual data and styles for better aesthetics
  const username = 'John Doe';
  const profileImage = require('../images/profile-user.png'); // Replace with the path to your profile image
  const images = [
    { uri: 'https://via.placeholder.com/350x150' },
    { uri: 'https://via.placeholder.com/350x150' },
    { uri: 'https://via.placeholder.com/350x150' },
  ]; // Replace with your images // 
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const response = await fetch('https://dotbrand-api.onrender.com/api/v1/user/category-listing', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        const categoriesData = data.payload.categories.map(({ name, image }) => ({ name, image }));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchBrands = async () => {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          const response = await fetch('https://dotbrand-api.onrender.com/api/v1/user/brand-listing', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          const BrandsData = data.payload.brands.map(({ name, image }) => ({ name, image }));
          setBrands(BrandsData);
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      };

    fetchBrands();  
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
    <HeaderComponent/>
    <ScrollView style={styles.contentContainer}>
      <View style={styles.profileSection}>
        <View style={styles.profileInfo}>
          <Image source={profileImage} style={styles.profileImage} />
          <Text style={styles.welcomeText}>Welcome, {username}</Text>
        </View>
        <View style={styles.searchBar}>
          <Icon name="ios-search" size={25} color="#000" style={styles.searchIcon} />
          <TextInput placeholder="Search..." style={styles.searchInput} />
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bannerScroll}>
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.bannerImage} />
        ))}
      </ScrollView>
      <Text style={styles.categoryHeading}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            <Image source={{ uri: category.image }} style={styles.categoryImage} />
            <Text style={styles.categoryLabel}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text style={styles.categoryHeading}>Brands</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {brands.map((brand, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            <Image source={{ uri: brand.image }} style={styles.categoryImage} />
            <Text style={styles.categoryLabel}>{brand.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      </ScrollView>
      <BottomNavigationBar />
     </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
      },
      
  profileSection: {
    marginTop:10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  bannerScroll: {
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  bannerImage: {
    width: 350,
    height: 250,
    marginRight: 10,
    borderRadius: 10,

  },
  categoryHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop:10,
    
  },
  categoryScroll: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryCard: {
    width: 210,
    height: 210,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryLabel: {
    marginTop: 7,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  categoryImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
});

export default HomeScreen;