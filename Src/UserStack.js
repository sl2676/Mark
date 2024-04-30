import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Platform,
	Text
} from 'react-native';

import auth from '@react-native-firebase/auth';

import { Header, createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native-stack';
import { CircleIcon, CheckIcon, NativeBaseProvider } from 'native-base';
import { 
	createBottomTabNavigator,
	BottomTabBar
	 } from '@react-navigation/bottom-tabs';
import { UserScreen } from './MarkInit/Home';
import { CustomDrawer } from './CustomDrawer';

import { BlurView } from '@react-native-community/blur';
import { NavigationDrawerHeader } from './NavigationDrawerHeader';
import { TestDrawer } from './TestDrawer';
//import Icon, { Icons } from './Icons';
import Icon from 'react-native-ionicons';
import { ScreensArray } from './arrays';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


export const UMap = ({ navigation }) => {
	return (
		<Stack.Navigator 
			initialRouteName = 'UserMap'>

			<Stack.Screen
				name = 'UserScreen'
				component = { UserScreen}
				options = {{
					title: 'Home',
					headerTransparent: true,
					
					headerBackground: () => (
						<BlurView
							tint = 'dark'
							intensity = { 100 }
							style = { StyleSheet.absoluteFill }/>
					),
					headerLeft: () => (
						<NavigationDrawerHeader navigationProps = { navigation }/>
					),
					headerTitleStyle: {
						fontWeight: 'bold',
						color: 'white'
					}
				}}/>
		</Stack.Navigator>
	)
}

const USettings = () => {
	return (
		<Stack.Navigator
			initialRouteName = 'SettingScreen'
			screenOptions = {{
				headerLeft: () => (
					<NavigationDrawerHeader navigationProps = { navigation }/>
				),
				headerStyle: {
					backgroundColor: '#307ecc'
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold'
				}
			}}>
				<Stack.Screen
					name = 'Setting'
					component = { UserSettingScreen }
					options = {{
						title: 'Settings',
						headerShown: false
					}}/>
		</Stack.Navigator>
	)
}

const RightDrawerContent = () => {
	return (
		<View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>This is the right drawer</Text>
		</View>
	)
}

const RightDrawerScreen = createDrawerNavigator();

const RightDrawer = () => {
	return (
		<RightDrawer.Navigator
			id = 'RightDrawer'
			drawerContent = {(props) => <RightDrawerContent {...props}/>}
			screenOptions = {{
				drawerPosition: 'right',
				headerShown: false
			}}>
			<RightDrawer.Screen name = 'HomeDrawer' component = { Init }/>
		</RightDrawer.Navigator>
	)
}

export const Init = ({ props }) => {
	return (
		<Drawer.Navigator
			mode = 'modal'
			screenOptions = {{
				drawerStyle: styles.drawerStyles,
				drawerType: 'front',
				headerShown: false,
				mode: "modal",
				swipeEdgeWidth: Platform.OS === 'android' && 180
			}}
			drawerContent = {(props) => <TestDrawer {...props}/> }>
				{ScreensArray.map((_, i) => (
        			<Drawer.Screen key={i} name={_.route} component={_.component}
          				options={{
            				item: _,
          				}}
        			/>
      			))}			
		</Drawer.Navigator>
	)
}


const styles = StyleSheet.create({
	drawerStyles: {
		width: 260,
		backgroundColor: 'transparent'
	},
	safeArea: {
		flex: 1,
		backgroundColor: 'white'
	}
})
