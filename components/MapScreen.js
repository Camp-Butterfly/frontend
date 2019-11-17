// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

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

let _mapView;

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
    //console.log("REGION", region);
    this.setState({ region });
    //console.log(region);
    Geolocation.getCurrentPosition(info => console.log(info));
    Geolocation.getCurrentPosition(info => console.log(info.coords.longitude));


  }

  center = () => {
    console.log("Center Button Pressed");
    let _info;
    Geolocation.getCurrentPosition(info => _info = info)
    
    _mapView.animateCamera({
        latitude: _info.coords.latitude,
        longitude: _info.coords.longitude
    }, 1000);
      /*let changedLocation = {
        latitude: info.coords.latitude,
        latitudeDelta: this.state.region.latitudeDelta,
        longitude: info.coords.longitude,
        longitudeDelta: this.state.region.longitudeDelta
      }
      console.log(changedLocation);
      this.setState({region: changedLocation});
      console.log(this.state.region)*/
     // {"latitude": 40.7651832514949, 
     // "latitudeDelta": 0.016988027439730047, 
    //  "longitude": -73.96668506786227,
      // "longitudeDelta": 0.012099780142307281}
      //this.onRegionChange(info.coords)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref = {(mapView) => { _mapView = mapView; }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
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