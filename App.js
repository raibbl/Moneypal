// In App.js in a new project

import React from "react";

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";

import { DefaultTheme, Button, Appbar, Title, Provider as PaperProvider } from 'react-native-paper';


import atest from './screens/atest'
import AddScreen from './screens/AddScreen'
import HomeScreen from './screens/HomeScreen'








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




const AppContain = createAppContainer(AppNavigator);



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