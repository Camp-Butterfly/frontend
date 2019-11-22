import React, { Component } from 'react';
import AmazingCropper from 'react-native-amazing-cropper';
import ImageRotate from 'react-native-image-rotate';
import CustomCropperFooter from './CustomCropperFooter.js';
import { Text, Alert, TouchableOpacity } from 'react-native';

class CropScreen extends Component {
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
          console.warn('YES Pressed');
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