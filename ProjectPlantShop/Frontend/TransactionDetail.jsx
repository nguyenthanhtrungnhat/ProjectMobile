import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function TransactionDetail({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>
      <View style={styles.block}>
        <Text style={styles.rowText}>
          <Text style={styles.boldText}>Transaction ID:</Text> {item.transactionId}
        </Text>
        <Text style={styles.rowText}>
          <Text style={styles.boldText}>Customer Name:</Text> {item.customerName}
        </Text>
        <Text style={styles.rowText}>
          <Text style={styles.boldText}>Date:</Text> {new Date(item.createAt).toLocaleDateString()}
        </Text>
        <Text style={styles.rowText}>
          <Text style={styles.boldText}>Products:</Text> {item.productNames}
        </Text>
        <Text style={styles.rowText}>
          <Text style={styles.boldText}>Quantities:</Text> {item.quantities}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
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
