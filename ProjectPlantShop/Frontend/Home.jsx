
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home({ navigation }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {

      const response = await axios.get(
        'http://localhost:3000/products'
      );
      console.log('Fetched data:', response.data);
      setData(response.data);
    } catch (error) {
      setError('Failed to load data. Please try again later.');
      console.error('Error making GET request:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error during request setup:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View >

        <View style={styles.firstRow}>
          <Text style={styles.title}>Danh sách </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddProduct')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>


      <FlatList
        data={data}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate('ProductDetail', { item })}>
              <Text style={styles.rowText}>{item.name}</Text>
              <Text style={styles.SubText}>${item.price}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#f8f9fa', padding: 8 },
  logo: { width: '100%' },
  button: {
    backgroundColor: 'green',
    borderRadius: 50,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  title: {  fontSize: 20,
    fontWeight: 'bold',
    color: '#333',},
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
  },
  row: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  rowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  SubText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
