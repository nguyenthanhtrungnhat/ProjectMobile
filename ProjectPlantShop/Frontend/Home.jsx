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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
 
      console.log('Fetched data:', response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load data. Please try again later.');
      setLoading(false);
      console.error('Error making GET request:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.firstRow}>
          <Text style={styles.title}>Product List</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddProduct')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate('ProductDetail', { item })}>
              
              {/* Display product image if available */}
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
              ) : (
                <View style={styles.noImage}><Text>No Image</Text></View>
              )}

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
  button: {
    backgroundColor: 'green',
    borderRadius: 50,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  noImage: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
