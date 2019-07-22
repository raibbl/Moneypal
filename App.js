// In App.js in a new project

import React from "react";
import {
  View, Text, AsyncStorage, TextInput, Alert, DatePickerAndroid,
  TimePickerAndroid, Picker, StyleSheet, Dimensions
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Callout } from 'react-native-maps'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DropdownMenu from 'react-native-dropdown-menu';
//import { MaterialIcons } from '@expo/vector-icons'; 
//import { MaterialIcons } from '@expo/vector-icons'; 
import { DefaultTheme, Button, Appbar, Title, Provider as PaperProvider } from 'react-native-paper';

//import LinearGradient from 'react-native-linear-gradient';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
//import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

//for saving all transactions


class AddScreen extends React.Component {


  constructor(props) {

    super(props);

    //  AsyncStorage.setItem('i',i );


    this.state = { fontsAreLoaded: false, text: '', name: '', amount: '', budget: '', date: '', year: '', month: '', day: '', longitude: 0, latitude: 0, pickerValue: '' };
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
    await Font.loadAsync(MaterialIcons.font)
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

    return (


      <PaperProvider>
        <React.Fragment>

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


              <Button disabled='true'>
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



class HomeScreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
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
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      color: (opacity = 90) => `rgba(153, 0, 204, ${opacity})`,
      // strokeWidth: 2 // optional, default 3
    }
    const screenWidth = Dimensions.get('window').width
    return (
      <PaperProvider>

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{flex: 1}} />
          <BarChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
          />
          <View style={{flex: 1}} />
          <Button onPress={() => this.props.navigation.navigate('Add')} >
            Add expense
          </Button>
          <View style={{flex: 1}} />
        </View>
      </PaperProvider>
    );
  }
}

class atest extends React.Component {

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
      title: 'Go back',
      headerStyle: {
        backgroundColor: '#da70d6 ',
        elevation: null,

      },

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



class App extends React.Component {


  render() {

    return <AppContain />;
  }
}
export default App;