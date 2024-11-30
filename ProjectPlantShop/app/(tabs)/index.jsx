import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "@/Frontend/login"; // Make sure the login component exists
import Home from "@/Frontend/Home";
import TransactionDetail from "@/Frontend/TransactionDetail";
import AddTransaction from "@/Frontend/AddTransaction";
import EditTransaction from "@/Frontend/EditTransaction";
import Transaction from "@/Frontend/Transaction";
import AddCustomer from "@/Frontend/AddCustomer";
import Logout from "@/Frontend/Logout";
import AddProduct from "@/Frontend/AddProduct";
import ProductDetail from "@/Frontend/ProductDetail";
import Edit from "@/Frontend/Edit";
import Customer from "@/Frontend/Customer";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CustomerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
    </Stack.Navigator>
  );
}

function LogoutStack({ onLogoutSuccess }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Logout">
        {() => <Logout onLogoutSuccess={onLogoutSuccess} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function TransStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Transaction" component={Transaction} />
      <Stack.Screen name="AddTransaction" component={AddTransaction} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
    </Stack.Navigator>
  );
}

// HomeStack.js
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          title: "Add Product",
        }}
      />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          title: "Product Detail",
        }}
      />
    </Stack.Navigator>
  );
}

function MyTab({ onLogoutSuccess }) {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false, // Hide the header for this screen
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransStack}
        options={{
          headerShown: false, // Hide the header for this screen
          tabBarLabel: "Transaction",
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerStack}
        options={{
          headerShown: false, // Hide the header for this screen
          tabBarLabel: "Customer",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        children={() => <LogoutStack onLogoutSuccess={onLogoutSuccess} />}
        options={{
          headerShown: false,
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This function will be called after a successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update state to reflect that the user is logged in
  };
  // This function will be called after a successful logout
  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
  };
  return (
    <MenuProvider>
      <SafeAreaView style={styles.container}>
        {/* If logged in, show MyTab, else show Login */}
        {isLoggedIn ? (
          <MyTab onLogoutSuccess={handleLogoutSuccess} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </SafeAreaView>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
