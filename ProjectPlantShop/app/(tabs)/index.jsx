import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Login from "@/Frontend/login";
import Home from "@/Frontend/Home";
import TransactionDetail from "@/Frontend/TransactionDetail";
import AddTransaction from "@/Frontend/AddTransaction";
import Transaction from "@/Frontend/Transaction";
import AddCustomer from "@/Frontend/AddCustomer";
import Logout from "@/Frontend/Logout";
import AddProduct from "@/Frontend/AddProduct";
import ProductDetail from "@/Frontend/ProductDetail";
import Edit from "@/Frontend/Edit";
import Customer from "@/Frontend/Customer";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Updated Theme
const greenTheme = {
  primary: "#4CAF50",
  light: "#A5D6A7",
  dark: "#2E7D32",
  background: "#E8F5E9",
  text: "#2E7D32",
};

function CustomerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: greenTheme.primary },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Customer" component={Customer} />
      <Stack.Screen name="AddCustomer" component={AddCustomer} />
    </Stack.Navigator>
  );
}

function LogoutStack({ onLogoutSuccess }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: greenTheme.dark },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <Stack.Screen name="Logout">
        {() => <Logout onLogoutSuccess={onLogoutSuccess} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function TransStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: greenTheme.primary },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        ...TransitionPresets.DefaultTransition,
      }}
    >
      <Stack.Screen name="Transaction" component={Transaction} />
      <Stack.Screen name="AddTransaction" component={AddTransaction} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: greenTheme.primary },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{ title: "Add Product" }}
      />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ title: "Product Detail" }}
      />
    </Stack.Navigator>
  );
}

function MyTab({ onLogoutSuccess }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: greenTheme.primary,
        tabBarInactiveTintColor: greenTheme.text,
        tabBarStyle: {
          backgroundColor: greenTheme.background,
          borderTopWidth: 1,
          borderTopColor: greenTheme.light,
          elevation: 5, // Shadow for Android
          shadowColor: greenTheme.dark, // Shadow for iOS
          shadowOpacity: 0.15,
          shadowRadius: 6,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "leaf";
          } else if (route.name === "Transaction") {
            iconName = "wallet";
          } else if (route.name === "Customer") {
            iconName = "people";
          } else if (route.name === "Setting") {
            iconName = "settings";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Setting"
        children={() => <LogoutStack onLogoutSuccess={onLogoutSuccess} />}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogoutSuccess = () => setIsLoggedIn(false);

  return (
    <MenuProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: greenTheme.background }]}
      >
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
  },
});
