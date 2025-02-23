import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  TextInput,
  Alert,
  DatePickerAndroid,
  TimePickerAndroid,
  Picker,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";

import { BarChart } from "react-native-chart-kit";
import {
  DefaultTheme,
  Button,
  Appbar,
  Title,
  Provider as PaperProvider,
} from "react-native-paper";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    },
  };

  constructor(props) {
    super(props);
    this.state = { items: [], name: [] };
  }

  //a fucntion to clear the presisted data in the app
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  //function to get data from async storage and push into a state array in this screen
  formatData = async () => {
    let booga = "";

    booga = await AsyncStorage.getItem("ex");

    let y = JSON.parse(booga);

    let arrayLength = y.length;
    let temparray = [];

    for (var i = 0; i < arrayLength; i++) {
      temparray.push(y[i]);
    }

    this.setState({ name: temparray });
  };

  //the fucntion to render all the transactions in the main screen , will be used in a scroll view component
  rendernameoftrans() {
    this.formatData();
    let { name } = this.state;
    //let x =Array.from(name);
    return name.map((item) => {
      return (
        <Text>
          Name:{item.name} Amount:{item.amount} Month:{item.month} Day:
          {item.day}
        </Text>
      );
    });
  }

  render() {
    //get the expenses and format them into an array just to get numbers data
    let { name } = this.state;
    const numbers = [];
    let arrayLength = name.length;
    for (var i = 0; i < arrayLength; i++) {
      numbers.push(name[i].amount);
    }
    //graph data
    const data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: numbers,
          color: (opacity = 90) => `rgba(153, 0, 204, ${opacity})`, // optional
          //strokeWidth: 2 // optional
        },
      ],
    };
    const chartConfig = {
      backgroundGradientFrom: "#F6F6F6",
      backgroundGradientTo: "#F6F6F6",
      color: (opacity = 90) => `rgba(153, 0, 204, ${opacity})`,
      // strokeWidth: 2 // optional, default 3
    };
    const screenWidth = Dimensions.get("window").width;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ flex: 1 }} />

        <BarChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
        />

        <View style={{ flex: 1 }} />

        <Button onPress={() => this.props.navigation.navigate("Add")}>
          Add expense
        </Button>
        <Button onPress={this.clearAsyncStorage}>Clear Data</Button>
        <ScrollView>{this.rendernameoftrans()}</ScrollView>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}
