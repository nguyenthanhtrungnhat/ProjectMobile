import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function TransactionDetail({ route, navigation }) {
  const { item } = route.params;

 
  return (
    <View style={{ flex: 1, padding: 10 }}>
     <Text>chua xong</Text>
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
