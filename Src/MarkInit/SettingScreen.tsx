import { useState, useRef, useReducer, useEffect } from 'react';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated'
import { 
		View, 
		StyleSheet, 
		TouchableOpacity,
		ScrollView,
		Text,
		Switch,
		Dimensions
} from 'react-native';
import {
	useSafeAreaInsets ,
	SafeAreaProvider
} from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationDrawerHeader } from '../NavigationDrawerHeader';
import { BlurView } from '@react-native-community/blur';
import Icon, { Icons } from '../Icons';
import { AppearanceArray, AccountArray } from './settingArray';
const Stack = createStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const SettingScreen = ({ navigation }) => {
	return (
		<Stack.Navigator
			initialRouteName = 'User Settting'>
			<Stack.Screen
				name = 'UserSettingScreen'
				component = { UserSettingScreen }
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


const HEADER_HEIGHT_EXPANDED = 35;
const HEADER_HEIGHT_NARROWED = 145;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const SettingItem = ({ props, label, onPress, type, name }) => {
	
	const [ isDarkMode, setIsDarkMode ] = useState(false);
	const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

	return (
		<TouchableOpacity
			onPress = { () => {
				console.log('ITEM')	
			}}
			style = {{ flexDirection: 'row', alignItems: 'center'}}>
			<Icon type = { type }
				name = { name }
				size = { 18 }
				color = { 'white' }
				style = {[ styles.row, { margin: 4 }]}/>
				<Text style = {{
					fontSize: 16,
					color: 'white',
				}}>{label}</Text>
				{ label === 'Dark Mode' ? 
					<View style = {{ left: 10 }}>
						<Switch
							trackColor = {{ false: 'red', true: 'green' }}
							thumbColor = { isDarkMode ? 'blue' : 'yellow' }
							ios_backgroundColor = '#3e3e3e'
							onValueChange = { toggleSwitch }
							value = { isDarkMode }/>
					</View> : null }
		</TouchableOpacity>
	)
}


const UserSettingScreen = (props) => {
	const insets = useSafeAreaInsets();
	const scrollY = useRef(new Animated.Value(0)).current;
	const scrollRef = useRef(null);
	
	const [ isDarkMode, setIsDarkMode ] = useState(false);
	const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

	const [ shouldAcctShow, setShouldAcctShow ] = useState(true);
 	const [ shouldNotiShow, setShouldNotiShow ] = useState(false);
	const [ shouldPriShow, setShouldPriShow ] = useState(false);
	const [ shouldDisplayShow, setShouldDisplayShow ] = useState(false);
	const [ shouldMoreShow, setShouldMoreShow ] = useState(false);
		

	const [ show, toggleProfile ] = useReducer(s => !s, false)
	
	const progress = useDerivedValue(() => {
		return show ? withTiming(1) : withTiming(0);
	})

	const open = () => {
		show ? scrollRef.current.scrollTo({
			y: 0,
			animated: true
		}) : scrollRef.current.scrollToEnd({
			animated: true
		})
		toggleProfile()
	}

	const menuStyles = useAnimatedStyle(() => {
		const scaleY = interpolate(
			progress.value,
				[0, 1],
				[0, 1]
			)
			return {
				transform: [{ scaleY }]
			}
		
	})

	return (
		<View style = { styles.settingContainer }>
			<Animated.View style = {{
				zIndex: 2,
				position: 'absolute',
				top: insets.top + 6,
				left: 0,
				right: 0,
				alignItems: 'center',
				opacity: scrollY.interpolate({
					inputRange: [90, 110],
					outputRange: [0, 1]
				}),
				transform: [{
					translateY: scrollY.interpolate({
						inputRange: [90, 120],
						outputRange: [30, 0],
						extrapolate: 'clamp'
					})
				}]
			}}/>
			<Animated.View
				style = {{
					position: 'absolute',
					left: 0,
					right: 0,
					height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
				}}>
				<Text style = {{
					fontWeight: 'bold',
					fontSize: 40,
					color: 'white',
					marginLeft: 30,
					marginTop: 90
				}}>
				Settings
				</Text>				
			</Animated.View>
			<Animated.ScrollView
				showsVerticalScrollIndicator = { false }
				scrollEventThrottle = { 5 }
				ref = { scrollRef }
				onScroll = { Animated.event([{
					nativeEvent: {
						contentOffset: { y: scrollY }
					}
				}],
				{ useNativeDriver: true }
				)}
				style = {{
					zIndex: 3,
					marginTop: HEADER_HEIGHT_NARROWED,
					paddingTop: HEADER_HEIGHT_EXPANDED
				}}>
				<View style = { styles.settingContainer }>
					<View style = {[ styles.optionContainer, { paddingHorizontal: 20 }]}>			

						<TouchableOpacity onPress = {() => setShouldAcctShow(!shouldAcctShow)}>
						<View style = {styles.setContainer}>
							<Icon 
								name = 'user-alt'
								color = 'white'
								type = { Icons.FontAwesome5 }
								size = { 18 }
								style = {{ paddingHorizontal: 10 }}/>
							<Text style = { styles.setText }>Account</Text>
						</View>
						</TouchableOpacity>
							
							{ shouldAcctShow ? (
								<View style = {[ styles.optText, { marginLeft: 40 }]}>	
									{
									AccountArray.map((_, i) => (
										<SettingItem
											key = {i}
											label = {_.label}
											type = {_.iconType}
											color = {_.color}
											name = {_.icon}/>
									))
									}
								</View>						
							) : null }

							<View style = { styles.seperator }/>
						<TouchableOpacity onPress = {() => setShouldNotiShow(!shouldNotiShow)}>
						<View style = {styles.setContainer}>
							<Icon
								name = 'notifications'
								color = 'white'
								type = { Icons.MaterialIcons }
								size = { 23 }
								style = {{ paddingHorizontal: 7 }}/>
							<Text style = { styles.setText }>Notifications</Text>
						</View>
						</TouchableOpacity>

						{ shouldNotiShow ? (
						<View style = {[ styles.optContainer, { backgroundColor: 'red' }]}>
							<Text style = {{ fontSize: 20, color: 'white' }}>WORKS</Text>
						</View>
						) : null }

						<View style = { styles.seperator }/>
		
						<TouchableOpacity onPress = {() => setShouldPriShow(!shouldPriShow)}>
						<View style = { styles.setContainer }>
							<Icon
								name = 'privacy-tip'
								color = 'white'
								type = { Icons.MaterialIcons }
								size = { 23 }
								style = {{ paddingHorizontal: 7 }}/>
							<Text style = { styles.setText }>Privacy</Text>
						</View>
						</TouchableOpacity>

						{ shouldPriShow ? (
							<View style = {[ styles.optContainer, { backgroundColor: 'red' }]}>
								<Text style = {{ color: 'white'}}>Privacy</Text>
							</View>
						) : null }

						<View style = { styles.seperator }/>
						
						<TouchableOpacity onPress = {() => setShouldDisplayShow(!shouldDisplayShow)}>
							<View style = { styles.setContainer }>
								<Icon
									name = 'eye'
									color = 'white'
									type = { Icons.Feather }
									size = { 23 }
									style = {{ paddingHorizontal: 8 }}/>
								<Text style = { styles.setText }>Appearance</Text>
							</View>
						</TouchableOpacity>

						{ shouldDisplayShow ? (
							<View style = {[ styles.setContainer, { marginLeft: 40 }]}>
								{
									AppearanceArray.map((_, i) => (
										<SettingItem
											key = {i}
											label = {_.label}
											type = {_.iconType}
											color = {_.color}
											name = {_.icon}/>
									))
								}
							</View>
						) : null }

						<View style = { styles.seperator }/>

						<TouchableOpacity onPress = {() => setShouldMoreShow(!shouldMoreShow)}>
							<View style = { styles.setContainer }>
								<Icon
									name = 'read-more'
									color = 'white'
									type = { Icons.MaterialIcons }
									size = { 23 }
									style = {{ paddingHorizontal: 7 }}/>
								<Text style = { styles.setText }>More</Text>
							</View>
						</TouchableOpacity>

						{ shouldMoreShow ? (
							<View style = {[ styles.optContainer, { backgroundColor: 'red'}]}/>
						) : null }						

					</View>
				</View>
			</Animated.ScrollView>
				
		</View>
	)
}

const styles = StyleSheet.create({
	settingContainer: {
		flex: 1,
		backgroundColor: '#0f0d0d'
	},
	optionContainer: {
		flex: 1,
		backgroundColor: '#0f0d0d',
		//backgroundColor: 'white',
		height: windowHeight
	},
	setContainer: {
		width: '100%',
		marginVertical: 10,
	//	backgroundColor: 'red',		
	},
	setText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold'
	},
	optText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	},
	seperator: {
		width: '100%',
		height: 1,
		backgroundColor: '#999999',
		marginVertical: 0
	},
	optContainer: {
		padding: 4,
		paddingHorizontal: 45
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	}
})
