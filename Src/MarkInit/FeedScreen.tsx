import {
	View,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	LogBox,
	useWindowDimensions
} from 'react-native';
import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BlurView } from '@react-native-community/blur';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationDrawerHeader } from '../NavigationDrawerHeader';
import Icon, { Icons } from '../Icons';
import { TabView, SceneMap } from 'react-native-tab-view';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

LogBox.ignoreLogs(['Sending...']);

export const FeedScreen = ({ navigation }) => {
	return (
		<Stack.Navigator
			initialRouteName = 'FeedScreen'>
			<Stack.Screen
				name = 'UserFeedScreen'
				component = { FeedTab }
				options = {{					
					headerStyle: {
						height: 0.1
					},
					headerLeft: () => (
						<NavigationDrawerHeader navigationProps = { navigation }/>
					),
					
				}}/>

		</Stack.Navigator>		
	)
}

const FeedUserScreen = () => {
	return (
		<View style = {{ flex: 1, backgroundColor: 'red' }}/>
	)
}

const ExploreUserScreen = () => {
	return (
		<View style = {{ flex: 1, backgroundColor: 'blue' }}/>
	)
}



const FeedTab = (props) => {
	return( 
	<Tab.Navigator
		initialRouteName = 'FeedScreen'
		>
		<Tab.Screen name = 'FeedScreen' component = { FeedUserScreen }/>
		<Tab.Screen name = 'ExploreScreen' component = {ExploreUserScreen}/>
		
	</Tab.Navigator>
	)
}



const styles = StyleSheet.create({
	feedContainer: {
		flex: 1,
		backgroundColor: 'blue'
	}
})
