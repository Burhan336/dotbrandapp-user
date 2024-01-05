import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you've imported the icon library
import { useNavigation } from '@react-navigation/native';

const BottomNavigationBar = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const navigation = useNavigation();

    const navigateToScreen = (screenName) => {
        setActiveTab(screenName);
        navigation.navigate(screenName);
      };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateToScreen('Home')}>
        <Icon
          name={activeTab === 'Home' ? 'home' : 'home-outline'}
          size={30}
          color={activeTab === 'Home' ? '#007bff' : 'black'}
        />
      </TouchableOpacity>
      {/* Add TouchableOpacity components for other icons */}
      {/* Example: */}
      <TouchableOpacity onPress={() => navigateToScreen('Search')}>
        <Icon
          name={activeTab === 'Search' ? 'search' : 'search-outline'}
          size={30}
          color={activeTab === 'Search' ? '#007bff' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Wishlist')}>
        <Icon
          name={activeTab === 'Wishlist' ? 'heart' : 'heart-outline'}
          size={30}
          color={activeTab === 'Wishlist' ? '#007bff' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Cart')}>
        <Icon
          name={activeTab === 'Cart' ? 'cart' : 'cart-outline'}
          size={30}
          color={activeTab === 'Cart' ? '#007bff' : 'black'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToScreen('Profile')}>
        <Icon
          name={activeTab === 'Profile' ? 'person' : 'person-outline'}
          size={30}
          color={activeTab === 'Profile' ? '#007bff' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    paddingBottom: 5,
  },
});

export default BottomNavigationBar;
