import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Customer({ navigation }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Error state
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/customer');
      console.log('Fetched data:', response.data);
      setData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError('Failed to load data. Please try again later.');
      console.error('Error making GET request:', error);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="green" />
        <Text>Loading customers...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <Text style={styles.title}>Danh sách</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddCustomer')}
          >
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
          <View style={styles.border}>
            <Text style={styles.rowTitle}>Customer Name: {item.name}</Text>
            <Text style={styles.rowText}>Phone: {item.phone}</Text>
            <Text style={styles.rowText}>Total Money: ${item.totalSpent}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#ecf0f1', padding: 8 },
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
  border: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  rowTitle: { fontWeight: 'bold', fontSize: 16 },
  rowText: { fontSize: 14, marginTop: 5 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
