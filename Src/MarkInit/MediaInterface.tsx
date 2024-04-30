import React, { useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	image,
	Platform,
	PermissionsAndroid
} from 'react-native';

import {
	launchCamera,
	launchImageLibrary
} from 'react-native-image-picker';

const [filePath, setFilePath] = useState({});

export const requestCameraPermission = async () => {
	if (Platform.OS === 'android') {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					title: 'Camera Permission',
					message: 'App needs camera permission'
				},
			);
		return granted === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			console.warn(err);
			return false;
		}
	} else return true;
}
/*
export const requestExternalWritePermission = async () => {
	if (Platform.OS === 'android') {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
				{
					title: 'External Storage Write Permission',
					message: 'App needs write permission'
				},
			);
			return granted === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			console.warn(err);
			alert('Write permission err', err);
		}
		return false;
	} else return true;
}
*/
export const captureImage = (type) => {
	let options = {
		mediaType: type,
		maxWidth: 300,
		maxHeight: 550,
		quality: 1,
		videoQualtiy: 'low',
		durationLimit: 30,
		saveToPhotos: true,
	};
//	let isCamerapermitted = await requestCameraPermission();
//	let isStoragePermitted = await requestExternalWritePermission();
		launchCamera(options, (response) => {
		        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
		})
	
}

export const chooseFile = (type) => {
	let options = {
		mediaType: type,
		maxWidth: 300,
		maxHeight: 550,
		quality: 1
	};
	launchImageLibrary(options, (response) => {
	      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);		
	})
}
