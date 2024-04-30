import { 
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	TouchableWithoutFeedback,
	Dimensions } from 'react-native';
import { useCallback, useRef, useEffect, useState } from 'react';
import { Input } from './RegisterPages/components/Input';
import { DismissKeyboard } from './RegisterPages/components/DismissKeyboard';
import OTPInput from './RegisterPages/components/OTPInput';

import {
	setUserName,
	setUserHandle,
	setUserAge,
	setUserPassword,
	setUserID
} from '../Flux/actions';

import { ThemedButton } from 'react-native-really-awesome-button';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';


import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const LoginScreen = ({ navigation }) => {

	const [ userLoginValue, setUserLoginValue ] = useState('');
	const [ userLoginPassword, setUserLoginPassword ] = useState('');

	const [ showModal, setShowModal ] = useState(false);

	const [ otpCode, setOTPCode ] = useState('');
	const [ isPinReady, setIsPinReady ] = useState(false);
	const [ codeErrorText, setCodeErrorText ] = useState('');
	const [ confirm, setConfirm ] = useState(null);
	
	const [ uID, setuID ] = useState('');

	const maximumCodeLength = 6;

	const {
		userName,
		userHandle,
		userAge,
		userID
	} = useSelector(state => state.userReducer);
	const dispatch = useDispatch();

	function onAuthStateChanged(user) {

	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	async function phoneNumberSignIn(phoneNumber, password) {
		const userPhoneNumber = '+'+phoneNumber;
		firestore().collection('phone_numbers').doc(userPhoneNumber).get()
		.then((docSnapshot) => {
			if (docSnapshot.exists) {
				const uid = Object.values(docSnapshot.data())[0]
				firestore().collection('users').doc(uid).get()
				.then((docSnapshot) => {
					if (docSnapshot.data().userPassword === password) {
						console.log('login with phone number success');
						signInWithPhoneNumber(userPhoneNumber);
						setuID(uid);
						setShowModal(true);
					} else {
						console.log('wrong password')
					}
				})
			} else if (!docSnapshot.exists && phoneNumber != '') {
				console.log('phone number is not registered')
			} else {
				console.log('phone/email empty')
			}
		})
	}

	async function signInWithPhoneNumber(phoneNumber) {
		const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		setConfirm(confirmation);
	}

	async function confirmCode(code) {
		console.log(code)
		try {
			const newReg = await confirm.confirm(code);
			setShowModal(false);	
			console.log('enter homescreen');
			firestore().collection('users').doc(uID).get()
			.then((docSnapshot) => {
				console.log(docSnapshot.data());
				dispatch(setUserName(docSnapshot.data().name));
				dispatch(setUserHandle(docSnapshot.data().displayName));
				dispatch(setUserAge(docSnapshot.data().userAge));
				dispatch(setUserPassword(docSnapshot.data().userPassword));
				dispatch(setUserID(uID));
			}).catch((error) => {
				console.log(error);
			});
			navigation.replace('Init');
		} catch (error) {
			console.log(error);
			setCodeErrorText('Invalid Code');
		}
	}

	async function handleSubmit(userLoginValue, userLoginPassword) {
		if (isNaN(userLoginValue)) {
			console.log('email');
		} else {
			console.log('phoneNumber');
			phoneNumberSignIn(userLoginValue, userLoginPassword)
		}
	}

	return (
		<DismissKeyboard>
		<View style = {{ flex: 1, backgroundColor: '#1F51FF' }}>
			<View style = { styles.loginTitle }>
				<Text style = { styles.loginText }>Login</Text>
			</View>
			<View style = { styles.userInputContainer }>
				<Input style = { styles.userInput }
					placeholder = 'Email / Phonenumber'
					onChangeText = {(value) => {
						setUserLoginValue(value);
					}}/>
				<Input style = { styles.userInput }
					placeholder = 'Password'
					onChangeText = {(value) => {
						setUserLoginPassword(value);
					}}/>
			</View>
			<View style = { styles.submitContainer }>	
				<ThemedButton
					name = 'bruce'
					type = 'secondary'
					style = {{ 
						marginTop: 35,
						marginLeft: 30 }}
					height = { 50 }
					width = { 150 }
					onPress = {() => {
						handleSubmit(userLoginValue, userLoginPassword);
					}}>
					<Text style = {{ color: 'black', fontSize: 18}}>
						Submit
					</Text>
				</ThemedButton>	
			<Modal
				isVisible = { showModal }
				useNativeDriver = { true }
				backdropTransitionOutTiming = { 0 }
				hideModalContentWhileAnimating
				animationInTiming = { 1000 }
				animtationOutTiming = { 2000 }
				backdropTransitionInTiming = { 800 }
				backdropTransitionOutTiming = { 800 }>
					<TouchableWithoutFeedback onPress = {() => {
						setShowModal(false);
						setCodeErrorText('');
						
						}}>	
						<View 
							style = {{
							//	backgroundColor: 'red',
								top: 250,
								width: windowWidth,
								height: 250,
								left: -20	
						}}/>	
					</TouchableWithoutFeedback>			
						<View style = { styles.authScreen }>
							<Text 
								style = {{ 
									fontSize: 18, 
									fontWeight: 'bold',
									left: 80,
									top: 5 }}>
								Enter verification code
							</Text>
							<View style = { styles.authBody }>
								<OTPInput
									code = { otpCode }
									setCode = { setOTPCode }
									maximumLength = { maximumCodeLength }
									setIsPinReady = { setIsPinReady }
								/>
						<View style = {{ left: 135, top: 10 }}>
						{
							codeErrorText != '' ? (
								<Text style = {{ color: 'red', fontWeight: 'bold'}}>{codeErrorText}</Text>
							) : null
						}
						</View>
						</View>
						<View style = { styles.authFooter }>
					
						<View style = {{ top: -140, flexDirection: 'row'}}>
							<Text style = {{left: 10, }}>Didn't recieve otp? </Text>
							<Text 
								style = {{left: 10, fontWeight: 'bold' }}
								onPress = {() => {}}
							>Resend Code</Text>
						</View>
						<ThemedButton
							name = 'bruce'
							type = 'secondary'
							width = { 150 }
							height = { 50 }
							style = {{
								left: -180,
								top: -125,
								position: 'absolute',
							}}
							onPress = { () => {
								confirmCode(otpCode);								
							}}
						>
						<Text>Confirm</Text>
						</ThemedButton>
						</View>
					</View>
				<TouchableWithoutFeedback onPress = {() => {
					setShowModal(false);
					setCodeErrorText('');
					}}>
					<View 
						style = {{
							height: 220,
							left: -20,		
							width: 20,
							top: 30, 
					//		backgroundColor: 'blue',							
						}}/>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress = {() => {
					setShowModal(false);
					setCodeErrorText('');
					}}>
					<View
						style = {{
							height: 220,
							left: 350,
							width: 20,
							top: -190,
					//		backgroundColor: 'blue'
						}}/>
				</TouchableWithoutFeedback>
					<TouchableWithoutFeedback
						onPress = {() => {
							setShowModal(false);
							setCodeErrorText('');
						}}>
					<View 
						style = {{
							top: -190,
							width: windowWidth,
							height: 420,
					//		backgroundColor: 'red',
							left: -20
						}}
						/>
					</TouchableWithoutFeedback>					
			</Modal>	
			</View>		
		</View>
		</DismissKeyboard>
	)
}

const styles = StyleSheet.create({
	loginTitle: {
		marginLeft: 35,
		top: 120,
	},
	loginText: {
		fontSize: 65,
		color: 'black',
		fontFamily: 'FredokaOne-Regular'		
	},
	userInputContainer: {
		marginLeft: 35,
		marginTop: 170,
		marginRight: 35,
		margin: 10,
	},
	userInput: {
		marginLeft: 35,
		top: 30,
		width: 250,
		height: 60,
		borderWidth: 2,
		borderRadius: 8,
		fontSize: 14,
		padding: 8,
		color: 'black',
		fontWeight: 'bold',
		backgroundColor: 'white',
		margin: 10
	},
	submitContainer: {
		marginLeft: windowWidth / 4
	},
	picker: {
		width: 120,
		height: 90,
		marginLeft: 20,
		marginTop: 100,
		backgroundColor: 'white',
		borderRadius: 18
	},
	authScreen: {
		backgroundColor: 'white',
		borderColor: 'gray',
		borderRadius: 25,
		borderStyle: 'solid',
		borderWidth: 1,
		width: 350,
		height: 220,
		top: 250,
		zIndex: 2
	},
	authHeader: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	authBody: {
		justifyContent: 'center',
		paddingHorizontal: 0,
		minHeight: 100,
		top: 10
	},
	authFooter: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		flexDirection: 'row',
		top: 140
	}
})
