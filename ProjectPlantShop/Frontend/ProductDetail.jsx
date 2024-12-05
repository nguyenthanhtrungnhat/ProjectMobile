import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductDetail({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Details</Text>
      <View style={styles.block}>
        <Text style={styles.rowText}>
          <Text style={styles.boldText}>Product Name:</Text> {item.name}
        </Text>
        <Text style={styles.rowText}>
          <Text style={styles.boldText}>Price:</Text> ${item.price}
        </Text>
        <Text style={styles.rowText}>
          <Text style={styles.boldText}>Created At:</Text> {item.createdAt}
        </Text>
        <Text style={styles.rowText}>
          <Text style={styles.boldText}>Final Update:</Text> {item.updatedAt}
        </Text>
      </View>
      {/* Edit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Edit', { item })}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    padding: 15,
    backgroundColor: 'green',
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rowText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  block: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
