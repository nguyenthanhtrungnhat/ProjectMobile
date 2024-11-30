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
const API_URL = 'http://localhost:3000/transactions';

export default function EditTransaction({ route, navigation }) {
  const { item } = route.params; // Item data passed from the previous screen
  const [customerName, setCustomerName] = useState(item.customer.name);
  const [totalSpent, setTotalSpent] = useState(String(item.customer.totalSpent)); // Ensure price is treated as a string

  const updateData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'No authentication token found.');
        return;
      }

      const updatedData = {
        customerName: customerName,
        totalSpent: totalSpent, // The correct field is totalSpent
      };

      const response = await axios.put(
        `${API_URL}/${item._id}`, // Using item._id as the unique identifier
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Update Response:', response.data);
      Alert.alert('Success', 'Service updated successfully');
      navigation.goBack(); // Go back after update
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('Error', 'Failed to update service');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer name *</Text>
      <TextInput
        placeholder="Input a customer name"
        style={styles.inputField}
        value={customerName}
        onChangeText={setCustomerName}
      />
      <Text style={styles.title}>Total Spent *</Text>
      <TextInput
        placeholder="Input total spent"
        style={styles.inputField}
        keyboardType="numeric"
        value={totalSpent}
        onChangeText={setTotalSpent}
      />
      <TouchableOpacity style={styles.button} onPress={updateData}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
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
    fontSize: 16,
    marginVertical: 10,
  },
});
