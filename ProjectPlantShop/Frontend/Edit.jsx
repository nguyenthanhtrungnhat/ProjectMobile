import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Correct API URL with dynamic item.id
const API_URL = 'http://localhost:3000/products';

export default function Edit({ route, navigation }) {
  const { item } = route.params; // Item data passed from the previous screen
  const [serviceName, setServiceName] = useState(item.name);
  const [price, setPrice] = useState(String(item.price)); // Ensure price is treated as a string

  const updateData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found.');
        return;
      }

      const updatedData = {
        id: item.id,
        name: serviceName,
        price: price,
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
      Alert.alert('Success', 'Service updated successfully');
      navigation.goBack(); // Go back after delete
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update service');
    }
  };

  return (
    <View>
      <Text style={styles.title}>Service name *</Text>
      <TextInput
        placeholder="Input a service name"
        style={styles.inputField}
        value={serviceName}
        onChangeText={setServiceName}
      />
      <Text style={styles.title}>Price *</Text>
      <TextInput
        placeholder="Input a service price"
        style={styles.inputField}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TouchableOpacity style={styles.button} onPress={updateData}>
        <Text style={styles.buttonText}>Update</Text>
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
    backgroundColor: 'pink',
    borderRadius: 20,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
});
