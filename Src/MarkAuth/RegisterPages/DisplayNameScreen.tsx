import { 
		View, 
		Text,
		TouchableOpacity,
		Dimensions,
		StyleSheet } from 'react-native';
import { useState, createContext, useContext } from 'react';
import { ThemedButton } from 'react-native-really-awesome-button';
import { TextField } from './components/TextFieldTest';
import { DismissKeyboard } from './components/DismissKeyboard';
import TextInput from "react-native-text-input-interactive";
import Icon, { Icons } from '../../Icons';
import { useSelector, useDispatch } from 'react-redux';
import { setUserHandle } from '../../Flux/actions';
import { Input } from './components/Input';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const DisplayNameScreen = ({ navigation }) => {

	const [ errorText, setErrorText ] = useState('');
	const { userHandle } = useSelector(state=>state.userReducer)
	const [ userName, setUserName ] = useState('');
	const [ isValid, setIsValid ] = useState({});
	const dispatch = useDispatch();

	async function addPhone() {
		try {
			firestore().collection('usernames').doc(userName).set({
				[userName]: true
			}).then(() => console.log('USERNAME_ADDED'));
		} catch (error) {
			console.log(error);
		}
	}
	
	return (
		
		<DismissKeyboard>
		<View style = { styles.displayNameScreenContainer }>
			<View style = { styles.displayNameContainer }>
				<Text style = { styles.displayNameAsk }>
					What should we call you?
				</Text>
				<Icon name = {'alternate-email'}
					type = { Icons.MaterialIcons }
					size = { 22 }
					style = {{
						color: 'black',
						top: 52, 
						left: 45, 
						zIndex:  1,
						width: 22}}/>
				<Input
					textInputStyle = { styles.displayNameInputStyle }
					placeholder = ''
					pattern = {[
						'^(?=\\S+$).{5,12}$',
					]}
					onChangeText = {(handle) => {
						setUserName(handle);
						//dispatch(setUserHandle(handle))
					}}
					onValidation = {(isValid) => setIsValid({ isValid })}
					mainColor = {'black'}/>
			</View>
			<View style = { styles.continueContainer }>
				<View style = {{ top: -45, marginLeft: 15}}>
					{
						errorText != '' ? (
							<Text style = {{
								color: 'red',
								fontWeight: 'bold'
							}}>
								{errorText}
							</Text>
						) : null
					}
				</View>
				<ThemedButton
					name = 'bruce'
					type = 'secondary'
					style = {{ marginTop: -20}}
					onPress = {() => {
						console.log(Object.values(isValid)[0][0])
						firestore().collection('usernames').doc(userName).get()
						.then((docSnapshot) => {
							if (docSnapshot.exists) {
								console.log('docSnapshotID:' + docSnapshot.id);
								console.log('username is already taken');
								setErrorText('UserName is already taken');
							} else {
								if ( Object.values(isValid)[0][0] ) {
									setErrorText('');
									dispatch(setUserHandle(userName));
									navigation.navigate('PasswordScreen')
								} else if ( Object.values(isValid)[0][0] === false ) {
									setErrorText('5-12 characters\nno whitespaces');
								}		 	
							}
						}).catch((error) => {
							console.log(error);
						}) 
							
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
	displayNameScreenContainer: {
		flex: 1,
		backgroundColor: '#331cfe'
	},
	displayNameContainer: {
		marginTop: 110,
		marginLeft: 35,
		marginRight: 35,
		margin: 10,
		width: 200,
	},
	displayNameInputStyle: {
		marginLeft: 35,
		paddingLeft: 35,
		width: 250,
		height: 60,
		borderWidth: 2,
		borderRadius: 8,
		fontSize: 14,
		marginTop: 10,
		padding: 8,
		fontWeight: 'bold',
		backgroundColor: 'white',
		color: 'black'
	},
	displayNameAsk: {
		fontFamily: 'ArgentumSans-Black',
		fontSize: 45,
		color: '#05ff7d'
	},
	continueContainer: {
		bottom: -45,
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
	}
})
