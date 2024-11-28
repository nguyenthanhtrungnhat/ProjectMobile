import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function TransactionDetail({ route, navigation }) {
  const { item } = route.params;

  // Calculate total payment
  const totalPayment = item.products.reduce((total, product) => total + (product.productPrice * product.quantity), 0);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* General Information Block */}
      <View style={styles.block}>
        <Text style={styles.title}>General Information</Text>
        <Text style={styles.rowText}>Transaction Code: {item.transactionId}</Text>
        <Text style={styles.rowText}>Creation Time: {new Date(item.createAt).toLocaleDateString()}</Text>
        <Text style={styles.rowText}>Customer: {item.customerName}</Text>
        
        {/* Edit Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditTransaction', { item })}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Product List Block */}
      <View style={styles.block}>
        <Text style={styles.title}>Product List</Text>
        {item.products.map((product, index) => (
          <Text key={index} style={styles.rowText}>
            {product.productName}: {product.quantity} x ${product.productPrice}
          </Text>
        ))}
      </View>

      {/* Total Payment Block */}
      <View style={styles.block}>
        <Text style={styles.title}>Total Payment</Text>
        <Text style={styles.rowText}>Total: ${totalPayment.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: 'pink',
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  rowText: {
    fontSize: 16,
    marginVertical: 5,
  },
  block: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
});
