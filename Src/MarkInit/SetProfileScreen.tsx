import { 
	Image, 
	View, 
	StyleSheet, 
	Text,
	Platform,
	PermissionsAndroid } from 'react-native';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import {
	launchCamera,
	launchImageLibrary
} from 'react-native-image-picker';
import { setUserPhotoURI } from '../Flux/actions';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';


const SetProfileScreen = () => {

	const dispatch = useDispatch()
	const { userPhoto, userID } = useSelector(state => state.userReducer)
	const [filePath, setFilePath] = useState({});	


	const user = firebase.auth().currentUser;
	if (user) {
//		console.log(user)
	}

	const uploadImage = async(filePath) => {
		try {
			console.log('uploadImage function')
			const bucketFile = `/images/${userID}/profile_picture`;
			const localFile = filePath.assets[0].uri;
			const storageRef = storage().ref(bucketFile);

			const task = await storageRef.putFile(localFile);
			const url = await storageRef.getDownloadURL();
			console.log('image url', url);
		} catch (error) {
			console.log('firebase upload image error: ' + error)
		}
	}

	const requestCameraPermission = async() => {
		if (Platform.OS === 'android' ) {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.CAMERA,
					{
						title: 'Camera Permission',
						message: 'App needs camera permissino',
					},
				)
					return granted === PermissionsAndroid.RESULTS.GRANTED
			} catch (error) {
				console.warn(error)
				return false
			}
		} else return true
	} 

	const requestExternalWritePermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
						title: 'External Stroage Write Permission',
						message: 'App needs write permission'
					}
				)
				return granted === PermissionsAndroid.RESULTS.GRANTED
			} catch (error) {
				console.warn(error)
			}
			return false
		} else return true
	}

	const captureImage = async (type) => {
		let options = {
			mediaType: type,
			maxWidth: 300,
			maxHeight: 550,
			quality: 1,
			saveToPhotos: true 
		}
		let isCameraPermitted = await requestCameraPermission()
		let isStoragePermitted = await requestExternalWritePermission()
		if (isCameraPermitted && isStoragePermitted) {
		launchCamera(options, (response) => {
//			console.log('Response = ', response)

			if (response.didCancel) {
				console.log('User cancelled camera picker')
				return
			} else if (response.errorCode == 'camera_unavailable') {
				console.log('Camera not available on device')
				return
			} else if (response.errorCode == 'permission') {
				console.log('Permission not satisfied')
				return
			} else if (response.errorCode == 'others') {
				console.log(response.errorMessage)
				return
			}
			setFilePath(response);
			dispatch(setUserPhotoURI(response))
		})
	}
	}
	const chooseFile = (type) => {
		let options = {
			mediaType: type,
			maxWidth: 300,
			maxHeight: 550,
			quality: 1
		}
		launchImageLibrary(options, (response) => {
//			console.log('Response = ', response)
			if (response.didCancel) {
				console.log('User cancelled camera picker')
				return
			} else if (response.errorCode == 'camera_unavailable') {
				console.log('Camera not available on device')
				return
			} else if (response.errorCode == 'permission') {
				console.log('Permission not satisfied')
				return
			} else if (response.errorCode == 'others') {
				console.log(response.errorMessage)
				return
			}
			setFilePath(response);
			dispatch(setUserPhotoURI(response))
			if (Object.entries(filePath).length > 0) {
				console.log('uploadingImage')
				uploadImage(filePath)	
			}

		})
		
	}
	return (
		<View style = {styles.profileScreenContainer}>
			<View style = {styles.controlContainer}>
				<TouchableOpacity 
					style = {{ padding: 20 }}
					onPress={() => {
						chooseFile('photo')
						}}>
					<Text style = {styles.controlText}>Access Library</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style = {{ padding: 20 }}
					onPress = {() => {
						captureImage('photo')
					}}>
					<Text style = {styles.controlText}>Camera</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	profileScreenContainer: {
		flex: 1,
		backgroundColor: '#246EE9',
		borderRadius: 18
	},
	controlContainer: {
		justifyContent: 'space-between',
		marginTop: 10,
		alignItems: 'center'
	},
	controlText: {
		fontWeight: 'bold',
		fontSize: 24
	},
	imageContainer: {
		width: 200,
		height: 200,
		margin: 5
	}
})

export default SetProfileScreen;
