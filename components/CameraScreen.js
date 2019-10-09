// This mode disables usage of variables that are not declared
'use strict';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

/*let pic = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};*/

class Camera extends React.Component {
  state = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <Image source={this.state} style={{width: 193, height: 110}}/>
        </View>
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
      console.log("uri: ", data.uri);
      console.log("Picture Orientation: ", data.pictureOrientation);
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

export default Camera;