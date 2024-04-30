import { 
		View, 
		Text,
		TouchableOpacity,
		Dimensions,
		StyleSheet } from 'react-native';
import { useState, createContext } from 'react';
import TextInput from 'react-native-text-input-interactive';
import { TextField } from './components/TextFieldTest';
import { ThemedButton } from 'react-native-really-awesome-button';
import { DismissKeyboard } from './components/DismissKeyboard';
import Icon, { Icons } from '../../Icons';
import { useSelector, useDispatch } from 'react-redux';
import { setUserName } from '../../Flux/actions';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


export const NameScreen = ({ navigation }) => {

	//const [ userName, setUserName ] = useState('');	
	
	const { userName } = useSelector(state=>state.userReducer)
	const [ errorText, setErrorText ] = useState('');
	const dispatch = useDispatch();	

	return (
		<DismissKeyboard>
		<View style = { styles.nameScreenContainer }>
			<View style = { styles.nameContainer }>
				<Text style = { styles.nameAsk }>
					Enter your name
				</Text>
			
				<TextInput
					textInputStyle = { styles.nameInputStyle }
					placeholder = 'Enter name'
					onChangeText = {(name) => {
						dispatch(setUserName(name))
						}}
					autoCorrect = {false}
					mainColor = {'black'}
					/>
			</View>
			<View style = { styles.continueContainer }>
				<View style = {{top: -30, marginLeft: 15}}>
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
					onPress = {() => {
						if (!userName.replace(/\s/g, '').length) {
	
						}
						if (userName.replace(/\s/g, '').length > 0) {
							console.log(userName);
							setErrorText('');
							navigation.navigate('DisplayNameScreen');
						} else {
							setErrorText('Please enter a valid name');
						}
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
	nameScreenContainer: {
		flex: 1,
		backgroundColor: '#4b51f5'
	},
	nameContainer: {
		marginTop: 120,
		marginLeft: 35,
		marginRight: 35,
		margin: 10
	},
	nameInputStyle: {
		marginLeft: 35,
		marginTop: 100,
		width: 250,
		height: 60,
		borderWidth: 2,
		borderRadius: 8,
		fontSize: 14,
		padding: 8,
		color: 'black',
		fontWeight: 'bold',
		backgroundColor: 'white'
	},
	nameAsk: {
		fontFamily: 'ArgentumSans-Black',
		fontSize: 45,
		color: '#e8a117'
	},
	continueContainer: {
		bottom: -30,
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
