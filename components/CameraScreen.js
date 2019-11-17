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
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:50,
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

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        const data = {
          fileName: response.fileName,
          type: response.type,
          uri: response.uri,
        }
        //this.setState({ photo.filename: response });
        this.handleUploadPhot2(data);
      }
    });
  };

  upload = () => {
    fetch('http://146.95.74.249:3000/api/upload', {
      method: 'POST',
      body: JSON.stringify({ x: 5, y: 6 }),
    })
      .then(response => response.text())
      .then(response => {
        console.log('upload success', response);
        alert('Upload success!');
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

  renderCamera = () => {
    const { photo } = this.state;

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
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
             <Text> SNAP </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photo && (
            <Image
            source={{ uri: photo.uri }}
            style={{ width: 100, height: 100 }}
            />
            )}
          <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
          <Button title="Test Upload" onPress={this.upload} />
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
      const options = { quality: 1, base64: true, orientation: "portraitUpsideDown" };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        uri: data.uri
      });

      // let _info;

      //requestCameraRollPermission();
      //CameraRoll.saveToCameraRoll(data.uri);
      Geolocation.getCurrentPosition(info => this.handleUploadPhoto(data.base64, info.coords.latitude, info.coords.longitude));
    }
  };
  
  render() {
    return (
      this.renderCamera()
    );
  }
}

export default withNavigationFocus(CameraScreen);