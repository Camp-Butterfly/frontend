// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, TouchableHighlight } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

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

  get_that = () => {
    console.log("Button pressed")
    let endpoint = "https://enigmatic-spire-53426.herokuapp.com/api/v1/images.json";
    axios.get(endpoint)
    .then(result => {
      //this.setState({result:result.data});
      this.setState({ markers: result.data });
      console.log( this.state.markers );
    });
  }

  /*<Marker
    coordinate={marker.coordinate}
    title={marker.title}
    description={marker.description}
  >
    <Image source={{uri: basey}} style={{height: 60, width: 60, borderRadius: 120, borderWidth: 3, borderColor: '#fff'}}/>
  </Marker>*/

  render() {
    // data:image/png;base64,
    // Append that to all base 64
    
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
        {this.state.markers.map(marker => {
          if( !marker.latitude || !marker.longitude || !marker.image_content ){
            return null;
          }
          if( marker.image_content.length < 100){
            return null;
          }
  
          const marker_coordinate = {
            latitude: parseFloat(marker.latitude),
            longitude: parseFloat(marker.longitude),
          }
          const marker_uri = "data:image/png;base64," + marker.image_content;

          return (
            <Marker
              key={marker.id}
              coordinate={marker_coordinate}
              //title={marker.title}
              //description={marker.description}
            >            
              <Image source={{uri: marker_uri }} style={{height: 60, width: 60, borderRadius: 120, borderWidth: 3, borderColor: '#fff'}}/>
            </Marker>
          )
        })}
        </MapView>
        <Button
          title="Left button"
          onPress={this.get_that}
        />
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

