import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default function Transaction({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transactions'); // Replace with server IP
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to load transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={styles.transaction}
      onPress={() => navigation.navigate('TransactionDetail', { item })}
    >
      <Text style={styles.transactionText}>
        {item.transactionId} - {new Date(item.createAt).toLocaleDateString()}
      </Text>
      <Text style={styles.transactionSubText}>Customer: {item.customerName}</Text>
      <Text style={styles.transactionSubText}>Products: {item.productNames}</Text>
      <Text style={styles.transactionSubText}>Quantities: {item.quantities}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction List</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTransaction')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.transactionId.toString()}
        renderItem={renderTransaction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 50,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white', fontWeight: 'bold', textAlign: 'center'
  },
  transaction: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionSubText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
