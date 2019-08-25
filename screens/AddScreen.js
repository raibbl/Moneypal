
import React from "react";
import {
  View, Text, AsyncStorage, TextInput, Alert, DatePickerAndroid,
  TimePickerAndroid, Picker, StyleSheet, Dimensions, FlatList, ScrollView
} from "react-native";
import { DefaultTheme, Button, Appbar, Title, Provider as PaperProvider } from 'react-native-paper';
import MapView, { PROVIDER_GOOGLE, Callout } from 'react-native-maps'
export default class AddScreen extends React.Component {


    constructor(props) {
  
      super(props);
  
      //  AsyncStorage.setItem('i',i );
  
  
      this.state = { trans: '', fontLoaded: false, text: '', name: '', amount: '', budget: '', date: '', year: '', month: '', day: '', longitude: 0, latitude: 0, pickerValue: '' };
    }
  
  
    async componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          })
        })
      //await Expo.Font.loadAsync({ 'MaterialIcons': require('./assets/fonts/MaterialIcons.ttf') });
      this.setState({ fontLoaded: true });
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
  
      let { year, month, day, name, amount, budget, longitude, latitude, count } = this.state;
  
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
  
      this.setState({ trans: newTrans });
      //pass newTrans to new home
  
      //this.props.navigation.navigate('Home', { newTrans})
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
      let x = this.state.trans;
     // alert(x);
      return (
  
  
        <PaperProvider>
          <React.Fragment>
            <Appbar>
              <Appbar.BackAction onPress={() => this.props.navigation.navigate('Home', { x })} />
              <Appbar.Content title='Go Back' />
            </Appbar>
            <View style={{ flex: 1, alignItems: "center", backgroundColor: 'white' }}>
              <View style={{ height: 40, width: 40, alignItems: "center", justifyContent: "space-evenly", backgroundColor: 'white' }} />
              <Button onPress={this.SavetoGlobalTransaction}>
                Save expense
              </Button>
              <TextInput
                style={{ flex: 1 }}
                placeholder="Name of expense"
                onChangeText={name => this.setState({ name })} />
              <TextInput
                style={{ flex: 1 }}
                placeholder="Amount"
                onChangeText={amount => this.setState({ amount })} />
  
              <Button onPress={this.saveDate} >
                Date of transaction
              </Button>
  
  
  
              <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly", backgroundColor: 'white', flexDirection: "row" }}>
  
  
                <Button disabled={false}>
                  Category
                </Button>
                <Picker
  
  
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ budget: itemValue })
                    //<View style={{ height: 40, width: 40, alignItems: "center", justifyContent: "space-evenly", backgroundColor: 'white' }} />
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js1" />
                  <Picker.Item label="booga" value="js2" />
                  <Picker.Item label="mooga" value="js3" />
                  <Picker.Item label="mooga" value="js4" />
                  <Picker.Item label="mooga" value="js5" />
                  <Picker.Item label="mooga" value="js6" />
  
                </Picker>
  
  
  
              </View>
  
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ height: 250, width: 250, borderRadius: 250 / 2, }}
                region={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
  
              /*<Callout>
              <View style={{
                flexDirection: "row",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 10,
                width: "40%",
                marginLeft: "30%",
                marginRight: "30%",
                marginTop: 20
              }} >
                <TextInput style={{
                  borderColor: "transparent",
                  marginleft: 10,
                  width: "90%",
                  marginRight: 10,
                  height: 40,
                  borderWidth: 0.0
                }}
                  placeholder={"Search"}
                />
              </View>
            </Callout>
            */
              />
  
  
  
  
              <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "space-around", backgroundColor: 'white', flexDirection: "row" }}>
  
              </View>
  
            </View>
          </React.Fragment>
        </PaperProvider>
      );
    }
  
  
  }