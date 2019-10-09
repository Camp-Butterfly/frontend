// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

/*let pic = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};*/

class MapScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
            MapScreen Here
        </Text>
        <Button
          title="Go to profile screen"
          onPress={() => this.props.navigation.push('Profile')}
        />
      </View>
    );
  }
};

export default MapScreen;