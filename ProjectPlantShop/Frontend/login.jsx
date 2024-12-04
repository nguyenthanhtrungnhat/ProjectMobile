import { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://localhost:3000/auth'; // Replace with your local API URL
const image = require('./image/loginbackground.jpg');

export default function Login({ onLoginSuccess }) {
  const [phone, setPhone] = useState('0922639956');
  const [password, setPassword] = useState('123');

  const login = async () => {
    try {
      const response = await axios.post(API_URL, { phone, password });

      if (response.data.token) {
        const token = response.data.token;
        console.log('Login successful, Token:', token);

        await AsyncStorage.setItem('authToken', token);
        Alert.alert('Login successful', 'You are now logged in!');
        onLoginSuccess();
      } else {
        Alert.alert('Login failed', 'No token returned.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login failed',
        error.response?.data?.message || 'Please check your credentials and try again.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.loginView}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              placeholder="Phone"
              style={styles.inputField}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.inputField}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width:'100%',
    height:'100%'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a translucent overlay
    justifyContent: 'center',
  },
  loginView: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
  },
  inputField: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
});
