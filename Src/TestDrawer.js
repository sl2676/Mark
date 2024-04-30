import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	ImageBackground,
	TouchableOpacity,
	Alert,
	Pressable
} from 'react-native';
import React, { useState, useReducer, useRef, useEffect } from 'react';
import Icon, { Icons } from './Icons';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';
import {
	DrawerContentScrollView,
	useDrawerProgress
} from '@react-navigation/drawer';
import { NativeBaseProvider, Avatar } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import { UserArray, ProfileArray } from './arrays'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
//import { DrawerItem, DrawerItemList } from './DrawerItemList';
const Drawer = createDrawerNavigator();

const DrawerItem = ({ label, onPress, tabBarTestID, type, name, notification,
  activeItemColor, color, styles }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID={tabBarTestID}
      accessibilityRole="button"
      style={{ 
			flexDirection: 'row',
			alignSelf: 'flex-start',
			padding: 8,
			width: 225,
			borderRadius: 10,
			backgroundColor: activeItemColor }}>
      <View style={{ flexDirection: 'row',
					alignItems: 'center' }}>
        <Icon type={type} name={name} {...{ color }} />
        <Text style={{
			fontSize: 16,
	        color: color,
    	    paddingHorizontal: 16
			}}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

const DrawerItemList = ({ state, descriptors, navigation, styles }) => {
  return (
    <View style={styles.view}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }
        {/* console.log(options) */ }

        const drawerItem = options.item;
        const color = isFocused ? '#123' : '#999999';
        const activeItemColor = isFocused ? '#60c5a8' : null;

        return (
          <DrawerItem key={index} label={drawerItem.label}
            tabBarTestID={options.tabBarTestID}
            onPress={onPress}
            name={drawerItem.icon}
            type={drawerItem.type}
            
            color={color}
            activeItemColor={activeItemColor}
            styles={styles}
          />
        )
      })}
    </View>
  )
}


const ActionItem = ({ label, onPress, type, name, activeItemColor, color, }) => {
	return (
		<TouchableOpacity
			onPress = { () => {
				if (label === 'Friends') {
					console.log('FriendsButton');
				} else if (label === 'Collections') {
					console.log('CollectionsButton');
				} else if (label === 'Mint') {
					console.log('MintButton');
				}

			}}
			style = {[ styles.row, { backgroundColor: activeItemColor }]}>
				<View style = {[ styles.iconContainer, { backgroundColor: color }]}>
					<Icon type = { type } name = { name } color = { 'white' }/>
				</View>
				<Text style = { styles.label }>{label}</Text>
		</TouchableOpacity>
	)
}

const ProfileItem = ({ props, label, onPress, type, name }) => {
	return (
		<TouchableOpacity
			onPress = { () => { 
				if (label === ' Timeline') { 
					console.log(' TimelineButton');
				} else if (label === ' Community') {
					console.log(' CommunityButton');
				} else if (label === ' Share') {
					console.log(' ShareButton');
				} else if (label === ' Logout') {
					console.log('Logout')
					Alert.alert('Logout', 'Are you sure? You want to logout?',

						[
							{
								text: 'Cancel',
								onPress: () => {
									return null;
								},
							},
							{
								text: 'Confirm',
								onPress: () => {
									auth()
										.signOut()
										.then(() => props.navigation.replace('Auth'))
										.catch((error) => {
											console.log(error);
											if(error.code === 'auth/no-current-user')
												props.navigation.replace('Auth');
											else alert(error);
										});
								},
							},
						], { cancelable: false });
				}
			}}
			style = {[ styles.row, { margin: 4 }]}>
				<Icon type = { type } 
					name = { name } 
					size = { 18 } 
					color = { '#123' }/>
				<Text style = {{
						fontSize: 16,
						color: '#123'
					}}>{label}</Text>
		</TouchableOpacity>
	)
}

export const TestDrawer = (props) => {
	const {
		userName,
		userHandle,
		userPassword,
		userAge,
		userID
	} = useSelector(state=>state.userReducer);

//	console.log('userHandle: ' + userHandle);
//	console.log('userName: ' + userName);

	const { state, descriptors, navigation } = props;
	const [ user, setUser ] = React.useState('');
	const scrollRef = useRef(null)

	const [ show, toggleProfile ] = useReducer(s => !s, false);

	const drawerProgress = useDrawerProgress();

	const fun = () => {
		show ? scrollRef.current.scrollTo({
			y: 0,
			animated: true
		}) : scrollRef.current.scrollToEnd({
			animated: true
		})
		toggleProfile()
	}

	const viewStyles = useAnimatedStyle(() => {
		const translateX = interpolate(
			drawerProgress.value,
			[0, 1],
			[-200, 0]
		)
		return {
			transform: [{ translateX }]
		}
	})

	const viewStyles2 = (type) => useAnimatedStyle(() => {
		const val = type === 'top' ? -100: 100;
		const translateY = interpolate(
			drawerProgress.value,
			[0,1],
			[val,0]
		)
		const opacity = interpolate(
			drawerProgress.value,
			[0,1],
			[0,1]
		)
		return {
			transform: [{ translateY }], opacity
		}
	})

	const progress = useDerivedValue(() => {
		return show ? withTiming(1) : withTiming(0);
	})

	const menuStyles = useAnimatedStyle(() => {
		const scaleY = interpolate(
			progress.value,
			[0, 1],
			[0, 1],
		)
		return {
			transform: [{ scaleY }]
		}
	})
	const [username, setUsername] = useState('');
	
	useEffect(() => {
		const subscriber = auth().onAuthStateChanged((user) => {
			setUser(user);
			
		});
		return subscriber;
	}, []);
	return (

	<View style = { styles.container }>
	<Animated.View 
		style = {[ styles.view, styles.marginTop, viewStyles2('top') ]}>
			<Icon name = 'github' color = {'white'} type = { Icons.Entypo } size = {30}/>
			<Text style = { styles.headerTitle }>Mark</Text>
	</Animated.View>

	<Animated.ScrollView {...props}
		ref = { scrollRef }
		showsVerticalScrollIndicator = { false }
		style = {[ styles.marginVertical, viewStyles ]}>

	
			<DrawerItemList {...props} styles={styles} />
	
		<View style = {[ styles.view, styles.marginVertical ]}>
			{UserArray.map((_, i) => (
				<ActionItem key = {i}
					label = {_.title}
					type = { _.iconType }
					color = { _.color }
					name = { _.icon }
					/>
			))}
		</View>
		<View style = {[ styles.view, styles.marginVertical ]}>
			<Text style = { styles.label }>Games</Text>
			<View style = { styles.seperator}/>
			<DrawerItem label = {''}/>
		</View>
	
		<Animated.View style = {[ styles.view, { backgroundColor: '#60c5a8' }, menuStyles ]}>
			<Text>
			{
				user? (
					<Text>
						{
							userName
						}
					</Text>
				) : null
			}
			</Text>
			{
				user? (
					<View style = {{ flexDirection: 'row'}}>
						<Icon 
							name = 'bandcamp'
							style = {{ left: 5 }} 
							type = { Icons.FontAwesome5 }
							size = {15 }/>	
						<Text style = {{ fontWeight: 'bold' }}>  .005 </Text>	
					</View>
				
			) : null}
			<View style = { styles.seperator }/>
				{ProfileArray.map((_, i) => (										
					<ProfileItem key = {i}
						label = {_.label}
						type = {_.iconType}
						name = {_.icon}
						props = {props}
						/>
				)
					
				)}
		</Animated.View>
		
	</Animated.ScrollView>

	<TouchableOpacity
		onPress = { fun }>
		<Animated.View style = {[ styles.row, styles.view, styles.marginBottom, viewStyles2('bottom') ]}>
		<Image style = { styles.profile }/>
		<View style = { styles.textContainer }>
			<Text>
				{
					user? (
						<Text style = { styles.headerTitle }>
							{
								userHandle
							}
						</Text> 
					) : null }
			</Text>
			
		</View>
		</Animated.View>
	</TouchableOpacity>
	
	</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	view: {
		backgroundColor: '#121212',
		borderRadius: 10,
		padding: 10,
		marginHorizontal: 8
	},
	marginTop: {
		marginTop: 35
	},
	marginBottom: {
		marginBottom: 22
	},
	marginVertical: {
		marginVertical: 8
	},
	textContainer: {

	},
	label: {
		fontSize: 16,
		color: '#babfc5',
		paddingHorizontal: 16
	},
	headerTitle: {
		fontSize: 24,
		color: '#babfc5'
	},
	seperator: {
		width: '100%',
		height: 1,
		backgroundColor: '#999999',
		marginVertical: 8
	},
	drawerItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
		justifyContent: 'space-between',
		borderRadius: 10
	},
	profile: {
		marginVertical: 8,
		marginRight: 16,
		marginLeft: 8,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#f0f0f0'
	},
	text: {
		fontWeight: 'bold',
		fontSize: 15
	},
	iconContainer: {
		padding: 6.6,
		borderRadius: 10,
		margin: 8,
		backgroundColor: '#60c5a8'
	}
})
