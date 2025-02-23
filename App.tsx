import React from "react";
import "@expo/metro-runtime";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import Atest from "./screens/Atest";
import HomeScreen from "./screens/HomeScreen";
import { AddTransaction } from "./screens/AddTransaction";

// Create Navigators
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export type Screens = {
  TestScreen: undefined;
  AddTransaction: undefined;
};

function TabNavigator() {
  const navigation = useNavigation<StackNavigationProp<Screens>>();
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#F44336",
        tabBarStyle: { backgroundColor: "white" },
      }}
    >
      <Tabs.Screen
        name="Transactions"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              style={{ marginRight: 20 }}
              name="plus"
              onPress={() => navigation.navigate("AddTransaction")}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="TestScreen"
        component={Atest}
        options={{
          tabBarLabel: "Test",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="test-tube-empty"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{
          title: "Add Transaction",
          headerRight: () => (
            <MaterialCommunityIcons
              style={{ marginRight: 20 }}
              name="content-save"
              onPress={() => alert("Add new transaction")}
              size={26}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
