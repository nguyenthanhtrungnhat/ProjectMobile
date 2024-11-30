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
 

 
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chua xong</Text>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
