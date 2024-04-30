import { 
	View, 
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Dimensions,
	TouchableWithoutFeedback,
	KeyboardAvoidingView
	 } from 'react-native';
import { useCallback, useRef, useState, useEffect } from 'react';
import PhoneInput from "react-native-phone-number-input";
import Icon, { Icons } from '../../Icons';
import { TextField } from './components/TextFieldTest';
import { ThemedButton } from 'react-native-really-awesome-button';
import IntlPhoneField from 'react-native-intl-phone-field';
import Modal from 'react-native-modal';


import { DismissKeyboard } from './components/DismissKeyboard';
import FormField from './components/FormField';
//import { Modal } from './components/Modal';
import OTPInput from './components/OTPInput';
import { ButtonContainer, ButtonText } from './components/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setUserID } from '../../Flux/actions';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Sending...']);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const undeterFlag = () => {
	return (
		<Icon 
			name = 'flag'
			type = { Icons.MaterialIcons }
			size = { 42 }
			/>
	)
}


export const PhoneScreen = ({ navigation }) => {

	const { 
		userName,
		userHandle, 
		userPassword,
		userAge,
		userID,
		 } = useSelector(state=>state.userReducer);
	const dispatch = useDispatch();
		
	const [value, setValue] = useState("");
	const [isEditable, setIsEditable] = useState(true);
	const [ numValid, setNumValid ] = useState(false);
	const [ numResult, setNumResult ] = useState(false);
	const [ userNum, setUserNum ] = useState('');
	const [formattedValue, setFormattedValue] = useState("");
	const phoneInput = useRef<PhoneInput>(null);

	const [ isModalVisible, setIsModalVisible ] = useState(false);
	const [ showModal, setShowModal ] = useState(false);
	const [ otpCode, setOTPCode ] = useState('');
	const [ isPinReady, setIsPinReady ] = useState(false);
	const maximumCodeLength = 6;

	const handleModal = () => setIsModalVisible(() => !isModalVisible);
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ confirm, setConfirm ] = useState(null);
	const [ code, setCode ] = useState('');
	const [ otpVerif, setOtpVerif ] = useState('OTP');
	const [ phoneReg, setPhoneReg ] = useState(null);  	

	const [ userUID, setUserUID ] = useState('');

	const [ errorText, setErrorText ] = useState('');
	const [ codeErrorText, setCodeErrorText ] = useState('');

	
	
	function onAuthStateChanged(user) {

	}
	
	const DismissModal = ({ children }) => (
		<TouchableWithoutFeedback onPress = {() => handleModal()}>
			{children}
		</TouchableWithoutFeedback>
	)	

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);
	
	async function signInWithPhoneNumber(phoneNumber) {
		const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		setConfirm(confirmation);
		//const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		//setConfirm(confirmation);
	}

	async function addName(uid) {
		try {
			firestore().collection('usernames').doc(userHandle).set({
				[userHandle]: uid
			}).then(() => console.log('USERNAME_ADDED'));
		} catch (error) {
			console.log(error);
		}
	}

	async function confirmCode(code) {
		console.log(code)
			try {
				const newReg = await confirm.confirm(code)
				console.log(newReg.user.uid)
				dispatch(setUserID(newReg.user.uid));
				firestore().collection('users').doc(newReg.user.uid).set({
					name: userName,
					displayName: userHandle,
					userPassword: userPassword,
					phoneNumber: newReg.user.phoneNumber,
					userAge: userAge,
					uid: newReg.user.uid
				}).then((newReg) => {
					console.log('REGISTER_SUCCESS')
				}).catch((error) => {
					console.log(error);
				});
				console.log(phoneNumber);
				firestore().collection('phone_numbers').doc(phoneNumber).set({
					[phoneNumber]: newReg.user.uid
				}).then(() => {
					console.log('Auth phoneNumber');
				}).catch((error) => {
					console.log(error);
				});
				addName(newReg.user.uid);
				setOtpVerif('Continue');
				setShowModal(false);
				navigation.replace('Init')
			} catch (error) {
				console.log(error);
				setCodeErrorText('Invalid Code');
			}
		}
		
	


	const setUserMeta = useCallback(
		({ isValid, countryCode, value, formatted, flag }) => {
			console.log(
				isValid, countryCode, value, formatted, flag
			);
		},
		
	);
	
	
	return (
		<DismissKeyboard>
		<View style = { styles.phoneScreenContainer }>
			<View style = { styles.phoneContainer }>
				<Text style = { styles.phoneAsk }>
					Enter your phone number
				</Text>	
					
				<IntlPhoneField
					onEndEditing={ setUserMeta }
					onValidation={(isValid) => { 
						setNumValid(isValid);
					}}
					onValueUpdate = {(value) => {
						setPhoneNumber(value);
					}}
					textInputProps = {{
						editable: isEditable 
					}}
					defaultCountry="US"
					defaultPrefix="+1"  
					flagUndetermined = { undeterFlag }
					containerStyle = {{ 
						height: 60,
						marginTop: 30
					}}
					textInputStyle = {{
						fontSize: 24,
						fontWeight: 'bold'
					}}
					flagTextStyle = {{
						fontSize: 35
					}}/>
				{ errorText != '' ? (
						<Text style = {{ 
							color: 'red', 
							marginLeft: 55,
							fontWeight: 'bold'
						}}>{errorText}</Text>
					) : null
				}
				<Modal 
					isVisible = { showModal }
					useNativeDriver = { true }
					backdropTransitionOutTiming = { 0 }
					hideModalContentWhileAnimating
					animationInTiming = { 1000 }
					animationOutTiming = { 1000 }
					backdropTransitionInTiming = { 800 }
					backdropTransitionOutTiming = { 800 }>
					<TouchableWithoutFeedback onPress = {() => {
						setShowModal(false);
						setCodeErrorText('');
						setIsEditable(true);
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
								onPress = {() => console.log(otpCode)}
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
								confirmCode(otpCode)
							}}
						>
						<Text>Confirm</Text>
						</ThemedButton>
						</View>
					</View>
				<TouchableWithoutFeedback onPress = {() => {
					setShowModal(false);
					setCodeErrorText('');
					setIsEditable(true);
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
					setIsEditable(true);
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
							setIsEditable(true)
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
				<View style = { styles.continueContainer }>
					<ThemedButton
						name = 'bruce'
						type = 'secondary'
						onPress = {() => {
							if (otpVerif != 'Continue') {
							console.log('phoneNumber: ' + phoneNumber)
							firestore().collection('phone_numbers').doc(phoneNumber).get()
							.then((docSnapshot) => {
								if (docSnapshot.exists) {
									console.log('docSnapshot id: ' + docSnapshot.id);
									console.log('user alr exists');								
								} else {
									console.log('new user');
								if ( otpVerif === 'OTP' && numValid === true ) {
									setErrorText('');
									setShowModal(true)
									setIsEditable(false);	
									signInWithPhoneNumber(phoneNumber);
								} else if ( numValid === false ) {
									setErrorText('Please enter valid phone number');
								} else {
									setErrorText('');
								}
							console.log(errorText);
								}
							});
							} else if (otpVerif === 'Continue' && numValid === true ) { 
								console.log('LOGIN')
								setErrorText('');
								navigation.replace('Init');
							}
							
		
						}}>
						<Text style = {{ color: 'black', fontSize: 18 }}>
							{otpVerif}
						</Text>
					</ThemedButton>
				</View>
			</View>				
			</View>
			</DismissKeyboard>
	)
}

const styles = StyleSheet.create({
	phoneScreenContainer: {
		flex: 1,
		backgroundColor: '#6200ff'
	},
	phoneContainer: {
		marginTop: 120,
		marginLeft: 35,
		marginRight: 35,
		margin: 10,
		
	},
	phoneInputStyle: {
		marginLeft: 35,
		width: 180,
		height: 90,
		fontSize: 30,
		marginTop: 100
	},
	phoneAsk: {
		fontFamily: 'ArgentumSans-Black',
		fontSize: 45,
		color: '#61fbbf'
	},
	continueContainer: {
		bottom: -45,
		marginLeft: 60
	},
	continueButton: {
		backgroundColor: 'white',
		borderWidth: 4,
		width: 200,
		height: 50,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
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
