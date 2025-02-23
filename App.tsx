// Main App file where everything comes together
import React from "react";

import "@expo/metro-runtime";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// UI Components
import { Provider as PaperProvider } from "react-native-paper";

// Screens
import Atest from "./screens/Atest";
import HomeScreen from "./screens/HomeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Create Bottom Tab Navigator

const Tabs = createBottomTabNavigator();

// Inside TabNavigator component

function TabNavigator() {
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="testScreen"
        component={Atest}
        options={{
          tabBarLabel: "Test Screen",
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

// Create Stack Navigator
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen
      name="Add"
      component={AddScreen}
      options={{
        title: "Go Back",
        headerStyle: { backgroundColor: "#da70d6", height: 100 },
        headerShown: false,
      }}
      /> */}
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
