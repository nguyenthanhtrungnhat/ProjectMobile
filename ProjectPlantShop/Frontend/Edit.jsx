import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Correct API URL with dynamic item.id
const API_URL = 'http://localhost:3000/products';


export default function Edit({ route, navigation }) {
  const { item } = route.params; // Item data passed from the previous screen
  const [serviceName, setServiceName] = useState(item.name);
  const [price, setPrice] = useState(String(item.price)); // Ensure price is treated as a string
  const [imageUrl, setImageUrl] = useState(item.imageUrl || ''); // Set initial imageUrl from product or empty
  const [loading, setLoading] = useState(false);

  const updateData = async () => {
    if (!serviceName || !price) {
      Alert.alert('Validation Error', 'Both name and price are required.');
      return;
    }

    if (isNaN(price)) {
      Alert.alert('Validation Error', 'Please enter a valid price.');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found.');
        setLoading(false);
        return;
      }

      const updatedData = {
        id: item.id,
        name: serviceName,
        price: price,
        imageUrl: imageUrl, // Add imageUrl to updated data
      };

      const response = await axios.put(
        `${API_URL}/${updatedData.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Update Response:', response.data);
      Alert.alert('Success', 'Product updated successfully');
      navigation.goBack(); // Go back after update
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Product name *</Text>
      <TextInput
        placeholder="Input a product name"
        style={styles.inputField}
        value={serviceName}
        onChangeText={setServiceName}
      />
      <Text style={styles.title}>Price *</Text>
      <TextInput
        placeholder="Input a product price"
        style={styles.inputField}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Text style={styles.title}>Image URL</Text>
      <TextInput
        placeholder="Input an image URL"
        style={styles.inputField}
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TouchableOpacity style={styles.button} onPress={updateData}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>Update</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  button: {
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
});
