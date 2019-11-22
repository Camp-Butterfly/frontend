// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
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
    borderRadius: 20,
    alignItems: 'center',
    height: 60, //Size of button
    width: 60,  //The Width must be the same as the height
    borderRadius: 120, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor:'rgb(255, 255, 255)',
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

const createFormData = uri => {
  var data = new FormData();

  data.append("photo", {
    name: uri.fileName,
    type: uri.type,
    uri:
      Platform.OS === 'android' ? uri.uri : uri.uri.replace('file://', ''),
  });

  // This is for adding shit to the body of the request
  /*Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });*/

  return data;
};

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: {
        fileName: "",
        type: "",
        uri: ""
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
          <Image source={this.state} style={{width: 193, height: 110}}/>
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
        </View>
      )
    }
    else {
      return null
    }
  }
  
  //portrait", "portraitUpsideDown", "landscapeLeft" or "landscapeRight
  takePicture = async() => {
    if (this.camera) {
      // FIx orenitation is android only so put android only code here
      let options;
      if (Platform.OS === 'android'){
        options = { quality: 1, base64: true, orientation: "portrait", fixOrientation: true };
      }
      else{
        options = { quality: 1, base64: true, orientation: "portrait" };
      }
      const data = await this.camera.takePictureAsync(options);
      console.log(data, '\n\n\n\n\n\n');
      this.props.navigation.navigate("Crop",
      {
        uri: data.uri,
        height: data.height,
        width: data.width
      });
      //AppNavigator.navigate("Crop");
      this.setState({
        uri: data.uri
      });
      // let _info;
      //requestCameraRollPermission();
      //CameraRoll.saveToCameraRoll(data.uri);
      //Geolocation.getCurrentPosition(info => this.handleUploadPhoto(data.base64, info.coords.latitude, info.coords.longitude));
    }
  };
  
  render() {
    return (
      this.renderCamera()
    );
  }
}

export default withNavigationFocus(CameraScreen);