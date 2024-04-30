import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	SafeAreaView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserChatScreen } from './UserChat';
import { UserProfileScreen } from './UserProfile';
import { UserConvScreen } from './UserConv';
import { UserProfileScreenEx } from './UserProfileEx';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//import firebase from '@react-native-firebase/'
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const msgsName = 'Messages';
const profileName = 'Profile';

const UserTab = ({ user }) => {
	return (		
		<Tab.Navigator
			initialRouteName = {msgsName}
			screenOptions = {({ route }) => ({
				headerStyle: {
					backgroundColor: 'purple'
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold'
				},
				tabBarActiveTintColor: '#009387',
				tabBarInactiveTintColor: 'grey',
				tabBarLabelStyle: { 
					paddingBottom: 5, 
					fontSize: 10,
					fontWeight: '900'
				}
			})}>
				<Tab.Screen
					name = 'Profile'>
					{props => <UserProfileScreen {...props} user = {user}/>}
				</Tab.Screen>
				<Tab.Screen
					name = 'Chats'>
						{props => <UserChatScreen {...props} user = { user }/>}
				</Tab.Screen>
			</Tab.Navigator>		
	)
}

export const MessageScreen = ({ navigation }) => {

	const [ initializing, setInitializing] = React.useState(true);
	const [ user, setUser ] = React.useState('');
	

	useEffect(() => {
		const userCheck = auth().onAuthStateChanged(userExist => {
			if (userExist) {
				setUser(userExist)
				console.log('USER: ', user)
				
				}
			else { 
			setUser('')
			console.log('NOTHING FOUND')
			 }
		})
		return () => {
			userCheck()
			console.log(user);
		}
	}, [])

/*

	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false)
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		console.log(user)
		return subscriber;
	}, []);
	
	

	if (!user) {
		return (
	
			<View style = {{ flex: 1, }}>
				<Text>loading</Text>
			</View>			
		)
	}
//		console.log(user)
		return (
			<SafeAreaView>
				<View style = {{ backgroundColor: 'blue', height: 40}}>
					<Text>{ user.uid }</Text>
				</View>
			</SafeAreaView>
		)
*/		
	return (
			<Stack.Navigator screenOptions = {{
				headerStyle: {
					backgroundColor: '#009387'
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold'
				},
			}}>
					<Stack.Screen
						name = 'InterPage'
						options = {{ headerShown: false }}>
							{props => <UserTab {...props} user = {user}/>}
					</Stack.Screen>
					<Stack.Screen
						name = 'Chats'
						options = {({ route }) => ({ 
							title: route.params.name,
							headerBackTitleVisible: false
						})}>
						{ props => <UserConvScreen {...props} user ={ user}/>}
					</Stack.Screen>					
			</Stack.Navigator>
	)
}
