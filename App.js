// Main App file where everything comes together
import React from "react";

// Navigation imports (Updated)
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// UI Components
import {
  DefaultTheme,
  Button,
  Appbar,
  Title,
  Provider as PaperProvider,
} from "react-native-paper";

// Screens
import atest from "./screens/atest";
import AddScreen from "./screens/AddScreen";
import HomeScreen from "./screens/HomeScreen";

// Create Bottom Tab Navigator
const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      activeColor="#F44336"
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="A" component={atest} />
    </Tab.Navigator>
  );
}

// Create Stack Navigator
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Add"
        component={AddScreen}
        options={{
          title: "Go Back",
          headerStyle: { backgroundColor: "#da70d6", height: 100 },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
