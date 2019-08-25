//this is where the everything comes togther, React navigation is implemented here

import React from "react";

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";

import { DefaultTheme, Button, Appbar, Title, Provider as PaperProvider } from 'react-native-paper';


import atest from './screens/atest'
import AddScreen from './screens/AddScreen'
import HomeScreen from './screens/HomeScreen'






//this is to make a Bottom tab navigator that hilds our screens that can be accsessed from the bottom bar

const Tabnavi = createMaterialBottomTabNavigator({

  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      icon: 'music'
    })
  },
  A: atest

},
  {

    header: 'null',
    activeColor: '#F44336',
  }
)


//this is a stack navigator that contains all the others sceens that are not in the bottom bar navigator  and the it contains the  bottom bar navigator 
const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Add: {
    screen: AddScreen,
    navigationOptions: {
      header: null,
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


//this is to export all these screens and navigator we contain  them in some container 

const AppContain = createAppContainer(AppNavigator);


//this is where the app gets exported
class App extends React.Component {


  render() {

    return (
      <PaperProvider>
        <AppContain
          ref={AppNavigator => {
            this.navigator = AppNavigator;
          }}
        />
      </PaperProvider>
    );

  }
}
export default App;