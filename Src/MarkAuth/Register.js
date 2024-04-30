import React, { useState, createRef } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	TextInput,
	View,
	Text,
	KeyboardAvoidingView,
	Keyboard,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import { RegisterStyles, LoginStyles } from './Components/Styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon, { Icons } from '../Icons';
export const RegisterScreen = ({ navigation }) => {
	const [ user, setUser ] = React.useState({});
	const [ userName, setUserName ] = React.useState('');
	const [ userEmail, setUserEmail ] = React.useState('')
	const [ userPassword, setUserPassword ] = React.useState('');
	const [ errorText, setErrorText ] = React.useState('');
	const [ data, setData ] = React.useState({
		email: '',
		password: '',
		userName: '',
		check_textInputChange: false,
		secureTextEntry: true
	})

	const emailInputRef = createRef();
	const passwordInputRef = createRef();

	const textInputChange = ( val ) => {
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
		})
	}
		
	const handleSubmitButton = async() => {
		setErrorText('');
		if (!userName) return alert('Please fill Name');
		if (!userEmail) return alert('Please fill Email');
		if (!userPassword) return alert('Please fill Address');
	
		 const newReg = await auth().createUserWithEmailAndPassword( userEmail, userPassword )
		 	firestore().collection('users').doc(newReg.user.uid).set({
					displayName: userName,
					email: newReg.user.email,
					uid: newReg.user.uid
				})
			.then((userCred) => {
				console.log(
					'Registration Successful. Please Login to proceed'
				);
				console.log(userName)
				navigation.replace('Init')
			})
			.catch((error) => {
				console.log(error);
				if (error.code === 'auth/email-already-in-use') {
					setErrorText(
						'That email address is already in use!'
					);
				} else {
					setErrorText(error.message);
				}
			});	
	};
	return (
      <>           
          <View style={{ flex: 1, height: 80, marginTop: 200, marginVertical: 80 }}>
			<View style = {{ marginVertical: 30, marginTop: -70, marginLeft: 20 }}>
				<TouchableOpacity onPress = { () => navigation.navigate('LoginHomeScreen') }>
					<Icon name = 'arrow-left-circle' type = { Icons.Feather } size = { 40 }/>
				</TouchableOpacity>
			</View>
			<View style = {{ alignItems: 'center', marginVertical: 50 }}>
				<Text style = {{ 
					fontWeight: 'bold',
					fontSize: 45,
					fontFamily: 'ArgentumSans-Black'}}>
					Sign Up
				</Text>
			</View>
            <View style = { RegisterStyles.sectionStyle }>
			<TextInput
              style={ RegisterStyles.inputStyle }
              onChangeText = {setUserName}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
			</View>		        
			<View style = { RegisterStyles.sectionStyle }>
            <TextInput
              style={ RegisterStyles.inputStyle }
              onChangeText={setUserEmail}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
			</View>
			<View style = { RegisterStyles.sectionStyle }>
            <TextInput
              style={ RegisterStyles.inputStyle }
              onChangeText={setUserPassword}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
        	</View>
	
		
          {errorText != "" ? (
            <Text style={ RegisterStyles.errorTextStyle }>
              {" "}
              {errorText}{" "}
            </Text>
          ) : null}
          <TouchableOpacity
            style ={ RegisterStyles.buttonStyle }
            activeOpacity={0.5}
            onPress={handleSubmitButton}
          >
            <Text style={ RegisterStyles.buttonTextStyle }>
              REGISTER
            </Text>
          </TouchableOpacity>
        
		<Text style = { RegisterStyles.loginTextStyle }
			onPress = {() => navigation.navigate('LoginScreen')}>
				Have an account already?
		</Text>
		</View>
	</>      
	)}
