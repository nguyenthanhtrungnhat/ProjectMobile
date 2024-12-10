import {
  Text,
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

const API_URL = "http://localhost:3000/customer";

export default function AddCustomer({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [authToken, setAuthToken] = useState("");

  // Fetch token from AsyncStorage when component mounts
  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          setAuthToken(token);
        } else {
          Alert.alert("Authentication Error", "No authentication token found.");
          navigation.navigate("Login"); // Navigate to login if token is missing
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
        name: customerName,
        phone: phone,
      };

      const response = await axios.post(API_URL, newData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("POST Response:", response.data);
      setCustomerName("");
      setPhone("");

      setModalVisible(true);
    } catch (error) {
      console.error("Error posting data:", error);
      Alert.alert("Error", "Could not add customer. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Modal Component */}
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

      {/* Input Fields */}
      <Text style={styles.title}> Customer name *</Text>
      <TextInput
        placeholder="Input a customer name"
        style={styles.inputField}
        value={customerName}
        onChangeText={setCustomerName}
      />
      <Text style={styles.title}> Phone *</Text>
      <TextInput
        placeholder="Input phone"
        style={styles.inputField}
        keyboardType="numeric"
        value={phone}
        onChangeText={setPhone}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={postData}>
        <Text style={styles.buttonText}> Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
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
  title: {
    fontWeight: "bold",
    marginVertical: 10,
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
});
