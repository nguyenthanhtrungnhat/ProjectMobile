import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Transaction({ navigation }) {
  const [data, setData] = useState([]);

  // Fetching data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get('http://26.184.100.176:3000/transactions');
      console.log('Fetched data:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={styles.transaction}
      onPress={() => navigation.navigate('TransactionDetail', { item })}>
      {/* Displaying transaction ID and formatted date */}
      <Text style={styles.serviceTitle}>
        {item.transactionId} - {new Date(item.createAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <Text style={styles.title}>Danh sách </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddTransaction')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.transactionId.toString()} // Make sure to use transactionId as key
        renderItem={renderTransaction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  button: {
    backgroundColor: 'pink',
    borderRadius: 50,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  title: { fontWeight: 'bold', marginLeft: 10, marginTop: 10, fontSize: 18 },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
  },
  transaction: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  rowText: {
    fontSize: 16,
    marginVertical: 2,
  },
});
