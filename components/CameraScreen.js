// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation';
import CameraRoll from "@react-native-community/cameraroll";
import { PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  snapButton: {
    position: 'absolute',
    bottom: 15,
    padding: 16,
    alignItems: 'center',
    height: 60, //Size of button
    width: 60,  //The Width must be the same as the height
    borderRadius: 120, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor:'rgb(255, 255, 255)',
  },
  loading: {
    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
});

async function requestCameraRollPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: {
        fileName: "",
        type: "",
        uri: "",
        loading: false
      },
      uri: "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg"
    };
  }

  handleUploadPhoto = (b64, lat, lon) => {
    console.log("Sending");
    fetch('https://enigmatic-spire-53426.herokuapp.com/api/v1/images', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        image_content: b64,
        latitude: lat,
        longitude: lon,
      })
    })
      .then(response => response.text())
      .then(response => {
        console.log('upload success', response);
        alert('Upload success!');
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  renderCamera = () => {
    console.log(this.props.navigation.isFocused())
    const isActive = this.props.navigation.isFocused()
    if(isActive == true) {
      return(
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            // Specifies that we are using the back camera
            type={RNCamera.Constants.Type.back}
            // Determines if we are using flash
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.snapButton}>
            </TouchableOpacity>
          </View>
          {this.state.loading === true ? (
          <View style={styles.loading}>
          <ActivityIndicator size={75} color="#2f9ac4" />
          </View>
          ) : null }
          
        </View>
      )
    }
    else {
      return null
    }
  }
  
  //portrait", "portraitUpsideDown", "landscapeLeft" or "landscapeRight
  takePicture = async() => {
    this.setState({ loading: true });
    console.log("Capture Button Pressed");
    if (this.camera) {
      let options;
      if (Platform.OS === 'android'){
        options = { quality: 1, base64: true, orientation: "portrait", fixOrientation: true };
      }
      else{
        options = { quality: 1, base64: true, orientation: "portrait" };
      }
      const data = await this.camera.takePictureAsync(options);
     
      // Code taken from documentation
      // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
      const geo_options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      };
      
      const success = pos => {
        var crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        this.props.navigation.navigate("Crop",
        {
          uri: data.uri,
          height: data.height,
          width: data.width,
          lat: crd.latitude,
          lon: crd.longitude
        });
      }
      
      const error = err => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      await Geolocation.getCurrentPosition(success, error, geo_options);

      //this.props.navigation.navigate("Crop",
      //{
      //  uri: data.uri,
      //  height: data.height,
      //  width: data.width
      //});
      //AppNavigator.navigate("Crop");
      //this.setState({
      //  uri: data.uri
      //});
      // let _info;
      //requestCameraRollPermission();
      //CameraRoll.saveToCameraRoll(data.uri);
      //Geolocation.getCurrentPosition(info => this.handleUploadPhoto(data.base64, info.coords.latitude, info.coords.longitude));
    }
    this.setState({ loading: false });
  };
  
  render() {
    return (
      this.renderCamera()
    );
  }
}

export default withNavigationFocus(CameraScreen);