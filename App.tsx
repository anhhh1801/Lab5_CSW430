import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screen/home/LoginScreen";

import HomeScreen from "./src/screen/home/HomeScreen";
import ServiceDetailScreen from "./src/screen/home/ServiceDetailScreen";
import AddScreen from "./src/screen/home/AddScreen";
import EditScreen from "./src/screen/home/EditScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllCustomer from "./src/screen/customer/AllCustomer";
import AllTransaction from "./src/screen/transaction/AllTransaction";
import TransactionDetail from "./src/screen/transaction/TransactionDetail";
import AddTransaction from "./src/screen/transaction/AddTransaction";
import LogoutScreen from "./src/screen/setting/LogoutScreen";
import AddCustomer from "./src/screen/customer/AddCustomer";
import CustomerDetail from "./src/screen/customer/CustomerDetail";
import EditCustomer from "./src/screen/customer/EditCustomer";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />

        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />

        <Stack.Screen name="AddCustomer" component={AddCustomer} />
        <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
        <Stack.Screen name="EditCustomer" component={EditCustomer} />

        <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Customer" component={AllCustomer} />
      <Tab.Screen name="Transaction" component={AllTransaction} />
      <Tab.Screen name="Setting" component={LogoutScreen} />
    </Tab.Navigator>
  );
}
