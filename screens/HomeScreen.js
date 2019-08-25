

import React from "react";
import {
  View, Text, AsyncStorage, TextInput, Alert, DatePickerAndroid,
  TimePickerAndroid, Picker, StyleSheet, Dimensions, FlatList, ScrollView
} from "react-native";


import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import { DefaultTheme, Button, Appbar, Title, Provider as PaperProvider } from 'react-native-paper';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }


  constructor(props) {
    super(props);


    let x = this.props.navigation.x
    //alert(x);
    this.state = { items: [], name: [] }



  }

  componentDidMount() {

  }
  componentDidUpdate() {
    //this.formatData()

  }
  //to return the transactions in keys


  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }


  formatData = async () => {
    let booga = '';

    //const keys = await AsyncStorage.getAllKeys()
    booga = await AsyncStorage.getItem('ex')
    //const x=JSON.parse(booga);
    // let k=x[1].name
    // console.log( k);
    let y = JSON.parse(booga);

    // var myStringArray = ["Hello", "World"];
    let arrayLength = y.length;
    let temparray = []
    for (var i = 0; i < arrayLength; i++) {
      temparray.push(y[i]);

      //Do something
    }
    this.setState({ name: temparray })




    //return items


    // return booga;


    //alert(booga[0][0]);


  }

  parseme() {
    this.formatData();
    let { items } = this.state;
    //let mama =JSON.parse(items);
    return items;
  }


  rendernameoftrans() {
    this.formatData();
    let { name } = this.state;
    //let x =Array.from(name);
    return name.map((item) => {
      return (
        <Text>{item.name}</Text>
      );
    });
  }
  render() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 90) => `rgba(153, 0, 204, ${opacity})` // optional
        //strokeWidth: 2 // optional
      }]
    }
    const chartConfig = {
      backgroundGradientFrom: '#F6F6F6',
      backgroundGradientTo: '#F6F6F6',
      color: (opacity = 90) => `rgba(153, 0, 204, ${opacity})`,
      // strokeWidth: 2 // optional, default 3
    }
    const screenWidth = Dimensions.get('window').width

    //console.log(items);
    //let item1 = items[0]['name'];
    //alert(item1);
    //let booga1 = 
    // this.formatData()
    let { name } = this.state
    //let name = items[0].toString()
    //let atest = this.parseme().toString();
    //alert(items);

    return (

      //<PaperProvider>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ flex: 1 }} />

        <BarChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
        //<Text>Name:{items.name} Amount:{items.amount} Month:{items.month} Day:{items.day}</Text>
        />


        <View style={{ flex: 1 }} />

        <Button onPress={() => this.props.navigation.navigate('Add')} >
          Add expense
          </Button>
        <Button onPress={this.clearAsyncStorage} >
          Clear Data
            </Button>
        <ScrollView>

          {this.rendernameoftrans()}




        </ScrollView>
        <View style={{ flex: 1 }} />
      </View>

      //</PaperProvider>
    );
  }
}