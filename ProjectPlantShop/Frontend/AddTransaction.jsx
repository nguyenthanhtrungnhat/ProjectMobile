import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:3000/transactions";

export default function AddTransactionScreen({ navigation }) {
  const [customerId, setCustomerId] = useState("");
  const [products, setProducts] = useState([{ productId: "", quantity: "" }]);
  const [authToken, setAuthToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch authentication token
  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setAuthToken(token);
        } else {
          Alert.alert("Authentication Error", "No authentication token found.");
        }
      } catch (error) {
        console.error("Error fetching auth token:", error);
      }
    };
    fetchAuthToken();
  }, []);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { productId: "", quantity: "" }]);
  };

  const handleSubmit = async () => {
    if (
      !customerId ||
      products.some((product) => !product.productId || !product.quantity)
    ) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    try {
      const transactionData = {
        customerId,
        products: products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      };

      const response = await axios.post(API_URL, transactionData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Transaction added:", response.data);
      setModalVisible(true);
      setCustomerId("");
      setProducts([{ productId: "", quantity: "" }]);
    } catch (error) {
      console.error("Error adding transaction:", error);
      Alert.alert("Error", "Failed to add transaction. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Customer added successfully!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Add Transaction</Text>

      <Text style={styles.label}>Customer ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter customer ID"
        value={customerId}
        onChangeText={setCustomerId}
        keyboardType="numeric"
      />

      {products.map((product, index) => (
        <View key={index} style={styles.productContainer}>
          <Text style={styles.label}>Product ID {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product ID"
            value={product.productId}
            onChangeText={(value) =>
              handleProductChange(index, "productId", value)
            }
            keyboardType="numeric"
          />

          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter quantity"
            value={product.quantity}
            onChangeText={(value) =>
              handleProductChange(index, "quantity", value)
            }
            keyboardType="numeric"
          />
        </View>
      ))}

      <TouchableOpacity
        style={styles.addProductButton}
        onPress={handleAddProduct}
      >
        <Text style={styles.addProductButtonText}>Add Another Product</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    padding: 15,
    backgroundColor: "blue",
    borderRadius: 10,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  input: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    padding: 15,
    backgroundColor: "green",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  addProductButton: {
    padding: 15,
    backgroundColor: "#007bff",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  addProductButtonText: {
    color: "white",
    fontSize: 18,
  },
  productContainer: {
    marginBottom: 15,
  },
});
