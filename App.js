// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import Camera from './components/Camera.js';
import MapScreen from './components/MapScreen.js';
import ProfileScreen from './components/ProfileScreen.js';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const AppNavigator = createStackNavigator(
  {
    Map: MapScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Map',
  }
);

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  tabs = [
    {
      key: 'map',
      icon: 'map',
      label: 'Map',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'camera',
      icon: 'camera',
      label: 'Camera',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'profile',
      icon: 'account',
      label: 'Profile',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ]

  renderIcon = icon => ({ isActive }) => (
    <Icon size={26} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <AppContainer/>
        </View>
        <BottomNavigation
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
}








/*class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppContainer/>
      </React.Fragment>
    );
  }
};*/

export default App;