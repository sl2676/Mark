import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useState, useEffect } from 'react';
import {
  AnimatedTabBarNavigator,
  DotSize, 
  TabElementDisplayOptions, 
  TabButtonLayout, 
  IAppearanceOptions 
} from 'react-native-animated-nav-tab-bar';
import { AcceptUserScreen } from './AcceptUserScreen';
import Icon, { Icons } from '../Icons';
import Modal from 'react-native-modal';
import { DenyUserScreen } from './DenyUserScreen';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import RequestScreen from './RequestsScreen';
import OutgoingScreen from './OutgoingScreen';
import BlockedScreen from './BlockedScreen';
const Tabs = AnimatedTabBarNavigator();

const BorScreen = () => {
	
	return (
		<Tabs.Navigator
			initialRouteName = 'RequestScreen'
			appearance={{
				shadow: true,
				whenActiveShow: 'icon-only',
				whenInactiveShow: 'icon-only'
			}}
			tabBarOptions = {{
				showIcon: true,
				activeTintColor: '#2F7C6E',
				inactiveTintColor: '#222222'	
			}}>
			<Tabs.Screen 
				name = 'Blocked' 
				component = {BlockedScreen}
				options = {{
					tabBarIcon: () => (
						<Icon 
							name = {'user-x'}
							type = {Icons.Feather}
							size = {30}
							color = {'black'}
						/>
					)
				}}/>
			<Tabs.Screen 
				name = 'Outgoing' 
				component = {OutgoingScreen}
				options = {{
					tabBarIcon: () => (
						<Icon
							name = {'user-check'}
							type = {Icons.Feather}
							size = {30}
							color = {'black'}
						/>
					)
				}}/>
			<Tabs.Screen 
				name = 'RequestScreen' 
				component = {RequestScreen}
				options = {{
					tabBarIcon: () => (
						<Icon
							name = {'user-plus'}
							type = {Icons.Feather}
							size = {30}
							color = {'black'}
						/>
					)
				}}
			/>
		</Tabs.Navigator>
	)
}





export default BorScreen;
