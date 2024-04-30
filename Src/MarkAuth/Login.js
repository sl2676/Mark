import React, { useState, createRef } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	TextInput,
	View,
	Text,
	ScrollView,
	Keyboard,
	TouchableOpacity,
	KeyboardAvoidingView
} from 'react-native';
import { RegisterScreen } from './Register';
import { LoginStyles } from './Components/Styles'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon, { Icons } from '../Icons';
export const LoginScreen = ({ navigation }) => {

	const [ user, setUser ] = React.useState([]);	
	const [ userEmail, setUserEmail ] = React.useState('');
	const [ userPassword, setUserPassword ] = React.useState('');
	const [ userPhoneNumber, setUserPhoneNumber ] = React.useState('');
	const [ userHandle, setUserHandle ] = React.useState('');
	const [ errorText, setErrorText ] = React.useState('');
	const [ data, setData ] = React.useState({
		email: '',
		password: '',
		check_textInputChange: false,
		secureTextEntry: true
	});

	const textInputChange = (val) => {
		if (val.length >= 10) {
			setData({
				...data,
				email: val,
				check_textInputChange: true
			});
		} else {
			setData({
				...data,
				email: val,
				check_textInputChange: false
			});
		}
	}

	const handlePassword = (val) => {
		setData({
			...data,
			password: val
		});
	}
	const updateSecureText = () => {
		setData({
			secureTextEntry: !data.secureTextEntry
		});
	}
	

	const passwordInputRef = createRef();

	const handleSubmitPress = async() => {
		setErrorText('');
		if (!userEmail) {
			alert('Please fill Email');
			return;
		}

		if (!userPassword) {
			alert('Please fill Password');
			return;
		}
		const newReg = auth().signInWithEmailAndPassword(userEmail, userPassword)
			.then((user) => {
				console.log(user);
				if ( user ) navigation.replace('Init');
				return newReg;
			})
			.catch((error) => {
				console.log(error);
				if (error.code === 'auth/invalid-email')
					setErrorText(error.message);
				else if ( error.code === 'auth/user-not-found')
					setErrorText('No User Found');
				else {
					setErrorText(
						'Please check your email id or password'
					);
				}
			});
	};
	return (
				
		    <View style={{ flex: 1, backgroundColor: '#2e7556'}}>
		<View style = {{ marginVertical: 100, marginLeft: 20 }}>
			<TouchableOpacity onPress = { () => navigation.navigate('LoginHomeScreen') }>
				<Icon name = 'arrow-left-circle' type = { Icons.Feather } size = { 35 }/>
			</TouchableOpacity>
		</View>
		<View style = {{ alignItems: 'center' }}>
			<Text style = {{
				fontWeight: 'bold',
				fontSize: 45,
				fontFamily: 'ArgentumSans-Black' }}>
					Login
			</Text>
		
		</View>
		<View style = {{ marginVertical: 60 }}>            
            <View style={LoginStyles.sectionStyle}>
              <TextInput
                style={LoginStyles.inputStyle}
                onChangeText={(userLogin) => {
                 // setUserEmail(UserEmail)
				if (isNaN(userLogin)) {
					console.log('not number')
				} else {
					console.log('is number')
				}
                }}
                placeholder="Enter Email or phone number"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={LoginStyles.sectionStyle}>
              <TextInput
                style={LoginStyles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
				placeholder="Enter Password"
						placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errorText != "" ? (
              <Text style={LoginStyles.errorTextStyle}>
                {" "}
                {errorText}{" "}
              </Text>
            ) : null}
            <TouchableOpacity
              style={LoginStyles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={LoginStyles.buttonTextStyle}>
                LOGIN
              </Text>
            </TouchableOpacity>
            <Text
              style={LoginStyles.registerTextStyle}
              onPress={() =>
                navigation.navigate("RegisterScreen")
              }
            >
              New Here ? Register
            </Text>
			</View>
	  <View style = {{ marginVertical: 230}}>
      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "white"
        }}>
			Mark
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "white",
		  marginBottom: 0
        }}>
        Find your friends
      </Text>
	</View>
	</View>   

	)
}

export default LoginScreen;
