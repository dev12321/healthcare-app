/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Button,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ImagePicker from 'react-native-image-picker';

class Cancer extends Component {
  constructor() {
    super();
    this.state = {
      isUploading: false,
      avatarSourse:
        'file:///storage/emulated/0/Android/data/com.cancerdetectionapp/files/Pictures/image-b1e34f84-8794-43cc-bc21-69c5a3c5b2a7.jpg',
    };
  }

  uploadImage = async () => {
    if (this.state.avatarSourse) {
      this.setState({isUploading: true});
      // let base_url = 'http://10.0.2.2:5000';
      // let base_url = 'http://jayjain-58805.portmap.io:58805';
      let base_url = 'http://ec2-3-22-99-96.us-east-2.compute.amazonaws.com';
      let uploadImage = new FormData();
      uploadImage.append('file', {
        type: 'image/jpg',
        uri: this.state.avatarSourse,
        name: 'uploadImageTmp.jpeg',
      });
      //   uploadImage.append('submit', 'ok');

      //   uploadImage.append('file', {uri: this.state.avatarSourse});
      fetch(base_url, {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: uploadImage,
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);

          if (response) {
            this.setState({isUploading: false});
            Alert.alert(
              'Result',
              `${response[0].label} -> Accuracy = (${parseFloat(
                response[0].score,
              ) * 100}%)`,
            );
          } else {
            this.setState({isUploading: false});
            Alert.alert('Error', response.message);
          }
        })
        .catch(() => {
          this.setState({isUploading: false});
          Alert.alert('Error', 'Error on Network');
        });
    } else {
      Alert.alert('Error', 'No Image Selected');
    }
  };

  selectImage = async () => {
    ImagePicker.showImagePicker(
      {noData: true, mediaType: 'photo', allowsEditing: true, quality: 0.7},
      response => {
        if (response.didCancel) {
          Alert.alert('Error', 'User Cancelled');
        } else if (response.error) {
          Alert.alert('Error', 'Image Picker Error');
        } else if (response.customButton) {
          Alert.alert('Error', 'User tapped custom button');
        } else {
          console.log(response.uri);

          this.setState({avatarSourse: response.uri});
          // this.uploadImage(response.uri);
        }
      },
    );
  };
  render() {
    return (
      <>
        <SafeAreaView>
          <View style={styles.imageContainer}>
            <Image
              style={{
                width: 300,
                height: 300,
                margin: 'auto',
                alignSelf: 'center',
                marginTop: 100,
              }}
              source={{uri: this.state.avatarSourse}}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonView}>
              <Button onPress={this.selectImage} title={'Select Image'} />
            </View>
            <View style={styles.buttonView}>
              <Button onPress={this.uploadImage} title={'Upload Image'} />
            </View>
          </View>
          {/* <View></View> */}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  imageContainer: {
    minHeight: 500,
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    // flex: 1,
    marginTop: 'auto',
    // flexWrap: 'wrap',
  },
  buttonView: {
    marginTop: 20,
    // marginRight: 'auto',
    // flexWrap: 'wrap',
    // alignContent: 'center',
    // alignItems: 'center',
  },
});

export default Cancer;
