import * as React from 'react'
import Animated from 'react-native-reanimated';
import Svg, { Path, PathProps } from 'react-native-svg';
import { View, StatusBar, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { NavigationDrawerHeader } from '../NavigationDrawerHeader';
import AnimatedTabBar, { TabsConfig, BubbleTabBarItemConfig } from '@gorhom/animated-tabbar'
import Icon, { Icons } from '../Icons';

interface SVGProps {
	color: Animated.Node<string>;
	size: number;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator<MainTabsParams>();

const AnimatedPath = Animated.createAnimatedComponent (
	Path
) as any as React.ComponentClass<
	Animated.AnimatedProps<{}, PathProps & { style?: any}>
>;

Animated.addWhitelistedNativeProps({
	stroke: true
});


const MessageUserScreen = () => {
	return (
		<View style = {{ flex: 1, backgroundColor: '#5B37B7'}}/>
	)
}

const GameScreen = () => {
	return (
		<View style = {{ flex: 1, backgroundColor: '#C9379D'}}/>
	)
}

const ChallengeScreen = () => {
	return (
		<View style = {{ flex: 1, backgroundColor: '#E6A919'}}/>
	)
}

const MsgIcon = ({ color, size }: SVGProps ) => {
	return (
		<Icon name = 'chat'
			color = 'white'
			type = { Icons.Entypo }
			size = { 20 }/>
	)
}

const ChallengeIcon = ({ color, size } : SVGProps ) => {
	return (
		<Icon name = 'sword-cross'
		color = 'white'
		type = { Icons.MaterialCommunityIcons }
		size = { 20 }/>
	)
}

const GamesIcon = ({ color, size }: SVGProps ) => {
	return (
		<Icon name = 'pin'
		color = 'white'
		type = { Icons.Entypo }
		size = { 20 }/>		
	)
}

const tabs: TabsConfig<FlashyTabBarItemConfig, MainTabsParams> = {
	Messages: {
		labelStyle: {
			color: '#5B37B7'
		},
		icon: {
			component: MsgIcon,
			color: 'white'
		}
	},
	Games: {
		labelStyle: {
			color: '#C9379D'
		},
		icon: {
			component: GamesIcon,			
			color: 'white',
		},
	},
	Challenge: {
		labelStyle: {
			color: '#E6A919'
		},
		icon: {
			component: ChallengeIcon,
			color: 'white'
		}
		}
	}



export const MessageScreen = ({ navigation }) => {
	const [ index, setIndex ] = React.useState(0);
	return (
		<Stack.Navigator
			initialRouteName = 'UserMessageScreen'>
			<Stack.Screen
				name = 'UserMessageScreen'
				component = { UserMessageScreen }
				options = {{
					title: 'Social',
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

const UserMessageScreen = (
		animation: 'iconWithLabel' | 'iconOnly' | 'iconWithLabelOnFocus'
	) => {
	const [ index, setIndex ] = React.useState(0);
	return (
        <Tab.Navigator
          tabBar={props => (
            <AnimatedTabBar
              preset="flashy"
			  tabs = {tabs}
				style = {{ backgroundColor: '#0f0d0d'}}
			  {...props}/>
          )}
        >			
			<Tab.Screen
				name = 'Messages'
				initialParams = {{
					backgroundColor: tabs.Messages.labelStyle.color,
         	        nextScreen: 'Games',
				}}
				component = { MessageUserScreen }/>	
			<Tab.Screen
				name = 'Games'	
				initialParams={{
              backgroundColor: tabs.Games.labelStyle.color,
              nextScreen: 'Challenge',
            }}
				component = { GameScreen }/>	

			<Tab.Screen
				name = 'Challenge'
				initialParams = {{
					backgroundColor: tabs.Challenge.labelStyle.color,
					nextScreen: 'Messages'
				}}
				component = { ChallengeScreen }
				/>	
		</Tab.Navigator>
	)
}

const styles = StyleSheet.create({
	
	backContainer: {
		marginVertical: 50,
		marginLeft: 30,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#f0f0f0'
	}
})
