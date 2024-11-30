import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/transactions';

export default function AddTransaction({ navigation }) {
  const [customerName, setCustomerName] = useState(''); // Default to empty string
  const [totalSpent, setTotalSpent] = useState(''); // Default to empty string
  const [authToken, setAuthToken] = useState('');

  // Fetch token from AsyncStorage when component mounts
  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
        } else {
          Alert.alert('Authentication Error', 'No authentication token found.');
          navigation.navigate('Login'); // Navigate to login if token is missing
        }
      } catch (error) {
        console.error('Error fetching auth token:', error);
        Alert.alert('Error', 'Failed to retrieve authentication token.');
      }
    };
    fetchAuthToken();
  }, [navigation]);

  const postData = async () => {
    if (!customerName || !totalSpent) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    try {
      const newData = {
        name: customerName,
        price: totalSpent,
      };

      const response = await axios.post(API_URL, newData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log('POST Response:', response.data);
      Alert.alert('Success', 'Transaction added successfully');

      // Reset fields after successful submission
      setCustomerName('');
      setTotalSpent('');
      // Optionally navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error posting data:', error);
      Alert.alert('Error', 'Could not add transaction. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Customer Name *</Text>
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
      <TouchableOpacity style={styles.button} onPress={postData}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
