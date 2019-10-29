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

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeMarker () {
  x = randomIntFromInterval(40.7600, 40.7700);
  y = randomIntFromInterval(-73.9600, -73.9700);

  coordinates = {
    latitude: x,
    longitude: y
  }
  return(
    <Marker
            coordinate={coordinates}
            title= "Cool"
            description= "Suppppper Coooool"
    />
  )
}

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 40.7678,
        longitude: -73.9645,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      markers: [
        {
          coordinate: {
            latitude: 40.7678, 
            longitude: -73.9645
          },
          title: "Mehhh Squidward",
          description: "MEHHHHH SQUIDWARDDDD"
        },
        {
          coordinate: {
            latitude: 40.7698, 
            longitude: -73.9685
          },
          title: "Mehhh Squidward",
          description: "MEHHHHH SQUIDWARDDDD"
        },
        {
          coordinate: {
            latitude: 40.7684, 
            longitude: -73.9665
          },
          title: "Mehhh Squidward",
          description: "MEHHHHH SQUIDWARDDDD"
        },
        {
          coordinate: {
            latitude: 40.7678, 
            longitude: -73.9685
          },
          title: "Mehhh Squidward",
          description: "MEHHHHH SQUIDWARDDDD"
        },
      ]
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
        {this.state.markers.map(marker => (
          <Marker
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}         
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