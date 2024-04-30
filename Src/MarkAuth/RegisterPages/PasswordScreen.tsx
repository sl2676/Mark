import { 
		View, 
		Text,
		TouchableOpacity,
		Dimensions,
		Pressable,
		StyleSheet } from 'react-native';
import { useState, createRef } from 'react';
import TextInput from "react-native-text-input-interactive";
import { DismissKeyboard } from './components/DismissKeyboard';
import { TextField } from './components/TextFieldTest';
import { ThemedButton } from 'react-native-really-awesome-button';
import { Input } from './components/Input';
import { useToggleSecPasswordVisibility, useTogglePasswordVisibility } from './components/ToggleVisb';
import { useSelector, useDispatch } from 'react-redux';
import { setUserPassword } from '../../Flux/actions';
import Icon, { Icons } from '../../Icons';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


export const PasswordScreen = ({ navigation }) => {
	const [ isValid, setIsValid ] = useState({});
	const [ errorText, setErrorText ] = useState('');
	//const [ userPassword, setUserPassword ] = useState('');
	const [ userRePassword, setReUserPassword ] = useState('');

	const passwordInputRef = createRef();

	const { passwordVisibility, rightIcon, handlePasswordVisibility } = 
		useTogglePasswordVisibility();
	const { passwordVisibilitySec, rightIconSec, handlePasswordVisibilitySec } = 
		useToggleSecPasswordVisibility();

	const [ password, setPassword ] = useState('');
	const [ passwordValid, setPasswordValid ] = useState('');

	const { userPassword } = useSelector(state=>state.userReducer)
	const dispatch = useDispatch();

	return (
		<DismissKeyboard>
		<View style = { styles.passwordScreenContainer }>
			<View style = { styles.passwordContainer }>
				<Text style = { styles.passwordAsk }>
					Set password
				</Text>
			
				<Input
					style = { styles.passwordInputStyle}
					placeholder = 'Enter password'
					secureTextEntry = { passwordVisibility }
					pattern = {[
						'^(?=\\S+$).{8,}$',
						'(?=.*\\d)',
						'(?=.*[A-Z])',
						'(?=.*[@#$%^&!-+=()])',
					]}
					ref = { passwordInputRef }
					onChangeText = {(UserPassword) => setReUserPassword(UserPassword)}
					onValidation = {(isValid) => setIsValid({ isValid }) }/>
				<Pressable
					style = {{
						marginLeft: 250,
						top: -10
					}}
					onPress = { handlePasswordVisibility}>
					<Icon
						name = { rightIcon }
						size = { 22 }
						type = { Icons.Feather }/>
				</Pressable>

				<Input
					style = { styles.passwordInputStyle }
					placeholder = 'Re-enter password'
					secureTextEntry = { passwordVisibilitySec }
					ref = { passwordInputRef }
					onChangeText = {UserPassword =>
						setPassword(UserPassword) }/>
				<Pressable 
					style = {{ 
						marginLeft: 250,
						top: -10}}
					onPress = { handlePasswordVisibilitySec }>
					<Icon 
						name = { rightIconSec } 
						size = {22}
						type = { Icons.Feather} />
				</Pressable>
			</View>
			{ errorText != '' ? (
			<Text style = {{ marginLeft: 105, color: 'red' }}>
				{errorText}
			</Text>
			) : null }
				
			<View style = { styles.continueContainer }>				
				<ThemedButton
					name = 'bruce'
					type = 'secondary'
					onPress = {() => {
						if ( Object.values(isValid).length != 0 ) {
						
						let firstReq = Object.values(isValid)[0][0];
						let secReq = Object.values(isValid)[0][1];
						let thirdReq = Object.values(isValid)[0][2];
						let fourthReq = Object.values(isValid)[0][3];

							if ( firstReq === false ) {
								setErrorText('Minimum 8 char/contains a whitespace');
							} else if ( secReq === false ) {
								setErrorText('Needs at least two digits');
							} else if ( thirdReq === false ) { 
								setErrorText('Needs at least a capital letter');
							} else if ( fourthReq === false ) {
								setErrorText('Needs at least one special char');
							} else if ( firstReq === true && secReq === true && thirdReq === true && fourthReq === true ) {
								if ( password === userRePassword ) {
									setErrorText(' ')
									dispatch(setUserPassword(password))
									navigation.navigate('PhoneScreen');
							} else {
								setErrorText('Passwords do not match');
							}
						} else {
							setErrorText('');
						}
						} else {
							setErrorText('Empty password');
						}
						console.log('try: ' + password)
						console.log('try: ' + userRePassword)
						}}>
					<Text style = {{ color: 'black', fontSize: 18 }}>
						Continue
					</Text>
				</ThemedButton>
			</View>
		</View>
		</DismissKeyboard>
	)
}	

const styles = StyleSheet.create({
	passwordScreenContainer: {
		flex: 1,
		backgroundColor: '#4b51f5'
	},
	passwordContainer: {
		marginTop: 120,
		marginLeft: 35,
		marginRight: 35,
		margin: 10
	},
	passwordInputStyle: {
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
	},
	passwordAsk: {
		fontFamily: 'ArgentumSans-Black',
		fontSize: 45,
		color: '#e8a117'
	},
	continueContainer: {
		bottom: -85,
		marginLeft: windowWidth/4
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
	errorText: {
		marginLeft: 125,
		color: 'red'
	}
})
