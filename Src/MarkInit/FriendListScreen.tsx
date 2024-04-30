import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon, { Icons } from '../Icons';
import Svg, { Path, PathProps } from 'react-native-svg';
import { NavigationContainer } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import {
  AnimatedTabBarNavigator,
  DotSize, 
  TabElementDisplayOptions, 
  TabButtonLayout,
  IAppearanceOptions 
} from 'react-native-animated-nav-tab-bar'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


//const Tab = AnimatedTabBarNavigator();

import randomColor from './randomColor';
import Animated from 'react-native-reanimated';
import { AcceptUserScreen } from './AcceptUserScreen';
import { DenyUserScreen } from './DenyUserScreen';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import DropDownPicker from 'react-native-dropdown-picker';
import { captureImage, chooseFile } from './MediaInterface';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  faHome,
  faHeart,
  faCommentAlt,
  faBars,
  faUserGroup,
  faPaperPlane,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import BubbleTabBar, {
  IBubbleTabConfig,
  IIconRenderer,
} from 'react-native-bubble-tabbar';
const { width, height } = Dimensions.get('window');
import { LogBox } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUserFollower, setUserFollowee, setUserBlocked, setUserOutgoing, setUserRequest } from '../Flux/actions';
import FollowerScreen from './FollowerScreen';
import FolloweeScreen from './FolloweeScreen';
import BorScreen from './BorScreen';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export const FriendListScreen = ({ onPress }) => {

	const hasValue = (obj, value) => Object.values(obj).includes(value);

	const dispatch = useDispatch()
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('friends');
		
	const [ownRequest, setOwnRequest] = useState([]);
	const [friendRequest, setFriendRequest] = useState([]);
	const [allFriends, setAllFriends] = useState([]);
		
	const [blockedList, setBlockedList] = useState([]);
	const [followeeList, setFolloweeList] = useState([]);
	const [followerList, setFollowerList] = useState([]);
	const [requestList, setRequestList] = useState([]);
	const [orequestList, setORequestList] = useState([]);
		
	const { userID } = useSelector(state => state.userReducer)	
		
	const follower_list = []
	const followee_list = []
	const block_list = []
	const request_list = []
	const orequest_list = []
	
	useEffect(() => {	
		const sort_map = (user_map, status, name) => {
			try {
			for (let i = 0; i < Object.keys(user_map).length; i++) {
				var user_metadata = Object.values(user_map)[i]
				if (hasValue(user_metadata, status)) {
					if (name === 'all_friends') {
						if(status === 'follower') {
							const follower = {}
							follower['uid'] = Object.keys(user_map)[i]
							follower['displayName'] = Object.values(user_map)[i][0]
							follower['status'] = Object.values(user_map)[i][1]
							follower_list.push(follower)
						} else if (status === 'followee') {
							const followee = {}
							followee['uid'] = Object.keys(user_map)[i]
							followee['displayName'] = Object.values(user_map)[i][0]
							followee['status'] = Object.values(user_map)[i][2]
							followee_list.push(followee)
						} else if (status === 'blocked') {
							const blocked = {}
							blocked['uid'] = Object.keys(user_map)[i]
							blocked['displayName'] = Object.values(user_map)[i][0]
							blocked['status'] = Object.values(user_map)[i][1]
							block_list.push(blocked)
						}
					} else if (name === 'friend_request') {
						var request = {}
						request['uid'] = Object.keys(user_map)[i]
						request['displayName'] = Object.values(user_map)[i][0]
						request['status'] = Object.values(user_map)[i][1]
						request_list.push(request)				
					} else if (name === 'own_request') {
						const orequest = {}
						orequest['uid'] = Object.keys(user_map)[i]
						orequest['displayName'] = Object.values(user_map)[i][0]
						orequest['status'] = Object.values(user_map)[i][1]
						orequest_list.push(orequest)
					}	
				}
			}
			} catch (error) {
				console.log(error)
			}
		}
		const loadRequests = async () => {
				var social_list = await firestore().collection('relation').doc(userID).get()
				var user_map = JSON.stringfy = Object.entries(social_list)[0][1]
			try {
				const so_blocked_list = sort_map(user_map.allFriends, 'blocked', 'all_friends')
				dispatch(setUserBlocked(block_list))
			} catch (error) {
				dispatch(setUserBlocked(block_list))
			}
			try {
				const so_request_list = sort_map(user_map.friendRequest, 'pending', 'friend_request')
				dispatch(setUserRequest(request_list))
			} catch (error) {
				dispatch(setUserRequest(request_list))
			}
			try {
				const so_outgoing_list = sort_map(user_map.ownRequest, 'pending', 'own_request')
				dispatch(setUserOutgoing(orequest_list))
			} catch (error) {
				dispatch(setUserOutgoing(orequest_list))				
			}
			try {
				const so_follower_list = sort_map(user_map.allFriends, 'follower', 'all_friends')
				dispatch(setUserFollower(follower_list))
			} catch (error) {
				dispatch(setUserFollower(follower_list))
			}
			try {
				const so_followee_list = sort_map(user_map.allFriends, 'followee', 'all_friends')
				dispatch(setUserFollowee(followee_list))
			} catch (error) {
				dispatch(setUserFollowee(followee_list))
			}
		}
		loadRequests()
	}, [setFolloweeList, setBlockedList, setRequestList, setORequestList])
	return ( 
		<View style = { styles.friendListContainer }>
			<View style = {{ zIndex: 0,left: 5, top: 10, flexDirection: 'row' }}>
				<TouchableOpacity
					onPress = {() => {
						onPress()
				}}>
				<View style = {{ paddingHorizontal: 10 }}>
					<Icon
						name = {'arrow-left'}
						type = { Icons.FontAwesome }
						size = { 20 }
						style = {{ color: 'white' }}/>
				</View>	
				</TouchableOpacity>
			</View>
			<Tab.Navigator
				swipeEnabled = {false}
				tabBarOptions = {{
					tabBarStyle: {
						
					}
				}}
				screenOptions = {{
					headerShown: false
				}}>
						<Tab.Screen
							name = 'Followers'
							component = { FollowerScreen }
							
							initialParams = {{ friendList: allFriends }}/>
						<Tab.Screen
							name = 'Following'
							initialParams = {{
								backgroundColor: '#641B4E',
				//				nextScreen: 'Bor',
							}}
							component = { FolloweeScreen }/>
						<Tab.Screen
							name = 'Bor'
							initialParams = {{
								backgroundColor: '#72540C',
				//				nextScreen: 'Followers'
							}}
							component = { BorScreen }/>
			</Tab.Navigator>
		</View>
	)
}
const styles = StyleSheet.create({
	friendListContainer: {
		flex: 1,
		zIndex: 0
	},
	friendContainer: {
//		flex: 1,
	},
	requestContainer: {
//		flex: 1,
		backgroundColor: 'red'
	//	backgroundColor: '#0f0d0d'
	},
	requestName: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 22,
		paddingLeft: 7,
		paddingTop: 10
	},
	userBlock: {
		padding: 15,
		flexDirection: 'row',
		height: 80,
		backgroundColor: '#7991B2'
	},
	metaBlock: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	decideBlock: {
		flex: 2,
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingHorizontal: 10,		
		paddingBottom: 15,
		justifyContent: 'flex-end'
	},	
	buttonBlock: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
	},
	denyModalButton: {
		width: '50%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	denyButtonText: {
		fontSize: 24,
		fontWeight: 'bold'
	}
})
