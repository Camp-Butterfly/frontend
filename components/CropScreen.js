import React, { Component } from 'react';
import AmazingCropper from 'react-native-amazing-cropper';
import ImageRotate from 'react-native-image-rotate';
import CustomCropperFooter from './CustomCropperFooter.js';
import { Text, Alert, TouchableOpacity } from 'react-native';
import RNFS from 'react-native-fs';


class CropScreen extends Component {
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
  
  onDone = (croppedImageUri) => {
    console.log('Done button was pressed');
    
    Alert.alert(
      'Confirmation Message',
      'Is this your final crop?',
      [
        {text: 'NO', onPress: () => {
          console.log('No Pressed');
        }, style: 'cancel'},
        {text: 'YES', onPress: () => {
          console.log('Yes Pressed');
          RNFS.readFile(croppedImageUri, 'base64')
          .then(res =>{
            this.handleUploadPhoto(res, this.props.navigation.getParam('lat'), this.props.navigation.getParam('lon'))
          });
          this.props.navigation.goBack();
        }},
      ]
    );
    console.log('croppedImageUri = ', croppedImageUri);
    // send image to server for example
  }
  
  rotate = (image, angle) => {
    const nextAngle = this.state.currentAngle + angle;
    ImageRotate.rotateImage(
      image,
      nextAngle,
      (uri) => {
        this.setState({
          image: uri,
          currentAngle: nextAngle,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onCancel = () => {
    console.log('Cancel button was pressed');
    this.props.navigation.goBack();
    // navigate back
  }

  render() {
    console.log(this.props.navigation.getParam('uri'));
    console.log(this.props.navigation.getParam('height'));
    console.log(this.props.navigation.getParam('width'));
    console.log(this.props.navigation.getParam('lat'));
    console.log(this.props.navigation.getParam('lon'));

    return (
      <AmazingCropper
        footerComponent={<CustomCropperFooter />}
        onDone={this.onDone}
        onCancel={this.onCancel}
        imageUri={this.props.navigation.getParam('uri')}
        imageHeight={this.props.navigation.getParam('height')}
        imageWidth={this.props.navigation.getParam('width')}
        //NOT_SELECTED_AREA_OPACITY={0.3}
        BORDER_WIDTH={0}
      />
    );
  }
}

export default CropScreen;