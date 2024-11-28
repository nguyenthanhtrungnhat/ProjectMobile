import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function TransactionDetail({ route, navigation }) {
  const { item } = route.params;
  return (
    <View>
      <View style={styles.block}>
        <Text style={styles.title}>General information</Text>
        <Text style={styles.title}>Transaction code: {item.id}</Text>
        <Text style={styles.title}>Customer: {item.customer.name}</Text>
        <Text style={styles.title}>
          Creation Time: {item.customer.createAt}
        </Text>
        {/* Edit Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditTransaction', { item })}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.block}>
        <Text style={styles.title}>Service List</Text>
        {item.services.map((service, index) => (
          <Text key={index} style={styles.rowText}>
            - {service.name}: {service.price}
          </Text>
        ))}
      </View>
      <View style={styles.block}>
        <Text style={styles.title}>Cost</Text>
        <Text style={styles.title}>
          Total payment: {item.customer.totalSpent}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: 'pink',
    borderRadius: 20,
    margin: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',  
  },
  block: {
    borderWidth: 1,
    borderRadius: 10,
    margin:10,
    padding:10,
  },
});
