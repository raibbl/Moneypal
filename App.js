// In App.js in a new project

import React from "react";
import {
  View, Text, Button, AsyncStorage, TextInput, Alert, DatePickerAndroid,
  TimePickerAndroid, Picker
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import DropdownMenu from 'react-native-dropdown-menu';

//for saving all transactions


class AddScreen extends React.Component {


  constructor(props) {

    super(props);

    //  AsyncStorage.setItem('i',i );


    this.state = { text: '', name: '', amount: '', budget: '', date: '', year: '', month: '', day: '', longitude: 0, latitude: 0, pickerValue: '' };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        })
      })
  }

  setName = () => {
    const { text } = this.state;
    AsyncStorage.setItem('name', text);
    alert("data Saved " + text);
  }




  saveDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(),

      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ year, month, day });
      }


    } catch ({ code, message }) {
      console.warn('Cannot open date picker11111', message);
    }


  }

  SavetoGlobalTransaction = async () => {



    //get everything from state

    let { year, month, day, name, amount, budget, longitude, latitude } = this.state;

    //  console.log(name);
    trans = {
      name, amount, budget, longitude, latitude, year, month, day,
    }
    //check for existing transactions
    const existingTrans = await AsyncStorage.getItem('ex')
    //const existingTrans1 = await AsyncStorage.getItem('date')
    alert(existingTrans);

    //get what we have
    let newTrans = JSON.parse(existingTrans);
    if (!newTrans) {
      newTrans = []
    }

    newTrans.push(trans);
    await AsyncStorage.setItem('ex', JSON.stringify(newTrans))
      .then(() => {
        console.log('It was saved successfully')
      })
      .catch(() => {
        console.log('There was an error saving the product')
      })
    //  alert("data Saved " +trans['name']);
  }

  showData = async () => {



    //  let d = JSON.parse(data);



    data = await AsyncStorage.getItem('i');
    alert(data);
    //      data => this.setState({data})
  }


  render() {
    let data = [["C", "Java", "JavaScript", "PHP"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
    return (
      <React.Fragment>
        <View style={{ flex: 1, alignItems: "center", backgroundColor: '#fffff5' }}>
          <View style={{ height: 40, width: 40, alignItems: "center", justifyContent: "space-evenly", backgroundColor: '#fffff5' }} />

          <Button
            style={{ flex: 2 }}
            title='Save expense'
            onPress={this.SavetoGlobalTransaction} />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Name of expense"
            onChangeText={name => this.setState({ name })} />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Amount"
            onChangeText={amount => this.setState({ amount })} />


          <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "space-around", backgroundColor: '#fffff5', flexDirection: "row" }}>
            <Button
              //style={{flex:2}}
              title="which Budget?"
              onPress={this.setName}
            />

            <Picker
              selectedValue={this.state.budget}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ budget: itemValue })
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js1" />
              <Picker.Item label="booga" value="js2" />
              <Picker.Item label="mooga" value="js3" />
              <Picker.Item label="mooga" value="js4" />
              <Picker.Item label="mooga" value="js5" />
              <Picker.Item label="mooga" value="js6" />
            </Picker>
            <View style={{ height: 40, width: 40, alignItems: "center", justifyContent: "space-evenly", backgroundColor: '#fffff5' }} />

            <Button
              //style={{flex:2}}
              title='Date'
              onPress={this.saveDate} />

          </View>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{ height: 180, width: 300 }}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
          </MapView>
          <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "space-around", backgroundColor: '#fffff5', flexDirection: "row" }}>

          </View>
        </View>
      </React.Fragment>
    );
  }


}


class HomeScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }

  render() {
    return (

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Add Expense"
          onPress={() => this.props.navigation.navigate('Add')}
        />
      </View>
    );
  }
}

class atest extends React.Component {

  render() {
    return (

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>aScreen</Text>

      </View>
    );
  }
}



const Tabnavi = createBottomTabNavigator({

  Home: HomeScreen,
  A: atest

},
  {
    header: 'null'
  }
)


const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Add: {
    screen: AddScreen,
    navigationOptions: {
      header: null
    }
  },
  tab: {
    screen: Tabnavi,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteName: "tab"
  },

);




const AppContain = createAppContainer(AppNavigator);



export default class App extends React.Component {


  render() {
    return <AppContain />;
  }
}
