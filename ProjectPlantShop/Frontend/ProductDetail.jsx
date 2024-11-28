
import { Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';


export default function ServiceDetail({ route, navigation }) {
   const { item } = route.params;
  return (
    <View>
      <Text style={styles.title}>Product name: {item.name}</Text>
      <Text style={styles.title}>Price: ${item.price}</Text>
      <Text style={styles.title}>Time: {item.createdAt}</Text>
      <Text style={styles.title}>Final update: {item.updatedAt}</Text>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Edit', { item })}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: 'green',
    borderRadius: 10,
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
    marginLeft: 20,
    marginTop: 20,
  },
 
});
