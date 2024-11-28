import React, { useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, TouchableOpacity,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout({ navigation }) {

  const logout = async () => {
    try {
      // Remove the auth token from AsyncStorage
      await AsyncStorage.removeItem('authToken');
      
      // Show a success message
      Alert.alert('Success', 'You have logged out successfully.');
      
      // Navigate to the login screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity  onPress={logout} style={styles.button}><Text style={styles.buttonText}>Logout</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ecf0f1',
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
});
