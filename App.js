// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CameraScreen from './components/CameraScreen.js';
import MapScreen from './components/MapScreen.js';
import ProfileScreen from './components/ProfileScreen.js';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarLabel: 'Camera',
        tabBarColor: '#1e1e1d',
        tabBarIcon: <Icon size={26} color="white" name='camera'/>
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarColor: '#1e1e1d',
        tabBarIcon: <Icon size={26} color="white" name='map'/>
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarColor: '#1e1e1d',
        tabBarIcon: <Icon size={26} color="white" name='account'/>
      }
    }
  },
  {
    initialRouteName: 'Profile',
    activeColor: '#ffedf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#f5b11d' },
    order: [ 'Map', 'Camera', 'Profile']
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppContainer/>
      </React.Fragment>
    );
  }
};

export default App;