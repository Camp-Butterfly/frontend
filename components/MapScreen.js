// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
/*let pic = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};*/

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 40.7678,
        longitude: -73.9645,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }
    };
  }
  onRegionChange = (region) => {
    this.setState({ region });
    console.log(region);
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          <Marker
            coordinate={{ 
              latitude: 40.7678, 
              longitude: -73.9645
            }}
            title={"Mehhh Squidward"}
            description={"MEHHHHH SQUIDWARDDDD"}
          />
        </MapView>
   </View>
    );
  }
};

export default MapScreen;

/*
<Marker
  coordinate=(40.7687, -74.1231)
  title="Mehhh Squidward"
  description="MEHHHHH SQUIDWARDDDD"
/>
*/