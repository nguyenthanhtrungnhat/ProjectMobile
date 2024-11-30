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

const API_URL = 'http://26.184.100.176:3000/products';

export default function AddProduct() {
  
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
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
         
        }
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
    };
    fetchAuthToken();
  }, []);

  const postData = async () => {
    try {
      const newData = {
        name: serviceName,
        price: price,
      };

      const response = await axios.post(API_URL, newData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log('POST Response:', response.data);
      
      setServiceName('');
      setPrice('');
    } catch (error) {
      console.error('Error posting data:', error);
      Alert.alert('Error', 'Could not add service. Please try again.');
    }
  };

  return (
    <View>
      <Text style={styles.title}> Product name *</Text>
      <TextInput
        placeholder="Input a product name"
        style={styles.inputField}
        value={serviceName}
        onChangeText={setServiceName}
      />
      <Text style={styles.title}> Price *</Text>
      <TextInput
        placeholder="Input a product price"
        style={styles.inputField}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TouchableOpacity style={styles.button} onPress={postData}>
        <Text style={styles.buttonText}> Add</Text>
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
