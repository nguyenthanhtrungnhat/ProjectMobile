
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
        'http://26.184.100.176:3000/products'
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
    <ScrollView>
      <View style={styles.container}>

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
              <Text>${item.price}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#ecf0f1', padding: 8 },
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
  title: { fontWeight: 'bold', marginLeft: 10, marginTop: 10, fontSize: 18 },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
  },
  row: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  rowText: { fontWeight: 'bold', fontSize: 16 },

});
