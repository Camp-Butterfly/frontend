// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation';
import CameraRoll from "@react-native-community/cameraroll";
import { PermissionsAndroid } from 'react-native';

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

/*let pic = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};*/

class CameraScreen extends React.Component {
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
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
             <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else {
      return null
    }
  }
  state = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
  }
  
  render() {
    return (
      this.renderCamera()
    );
  }

  //portrait", "portraitUpsideDown", "landscapeLeft" or "landscapeRight
  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 1, base64: true, orientation: "portraitUpsideDown" };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        uri: data.uri
      });
      requestCameraRollPermission();
      CameraRoll.saveToCameraRoll(data.uri);
    }
  };
}

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
});

export default withNavigationFocus(CameraScreen);