import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:3000/products";

export default function AddProduct() {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // New state for imageUrl
  const [authToken, setAuthToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch token from AsyncStorage when component mounts
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

  const postData = async () => {
    try {
      const newData = {
        name: serviceName,
        price: price,
        imageUrl: imageUrl, // Include imageUrl in the data sent to the backend
      };

      const response = await axios.post(API_URL, newData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("POST Response:", response.data);

      setServiceName("");
      setPrice("");
      setImageUrl(""); // Clear the imageUrl after submission
      setModalVisible(true);
    } catch (error) {
      console.error("Error posting data:", error);
      Alert.alert("Error", "Could not add product. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <Text style={styles.title}>Product name *</Text>
      <TextInput
        placeholder="Input a product name"
        style={styles.inputField}
        value={serviceName}
        onChangeText={setServiceName}
      />
      <Text style={styles.title}>Price *</Text>
      <TextInput
        placeholder="Input a product price"
        style={styles.inputField}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <Text style={styles.title}>Image URL</Text>
      <TextInput
        placeholder="Input an image URL (optional)"
        style={styles.inputField}
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TouchableOpacity style={styles.button} onPress={postData}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  button: {
    padding: 20,
    backgroundColor: "green",
    borderRadius: 10,
    margin: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
  title: {
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
});
