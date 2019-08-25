import React from "react";
//import { MaterialIcons } from '@expo/vector-icons'; 
import { DefaultTheme, Button, Appbar, Title, Provider as PaperProvider } from 'react-native-paper';
import {
  View, Text, AsyncStorage, TextInput, Alert, DatePickerAndroid,
  TimePickerAndroid, Picker, StyleSheet, Dimensions, FlatList, ScrollView
} from "react-native";
export default class  atest extends React.Component {

    render() {
      return (
        <PaperProvider>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>aScreen</Text>
  
          </View>
        </PaperProvider>
      );
    }
  }
  