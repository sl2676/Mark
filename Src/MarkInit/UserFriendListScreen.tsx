import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Icon, { Icons } from '../Icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSelector,} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import { DenyUserScreen } from './DenyUserScreen';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export const FriendScreen = ({ route }) => {
	const [friendList, setFriendList] = useState([]);
	const { userID, userAllFriends } = useSelector(state => state.userReducer)
	const [ moreScreen, setMoreScreen ] = useState(false);
	const blocked_list = [];
	const friend_list = [];
	useEffect(() => {
		const loadFriends = async () => {
			social_list = await firestore().collection('relation').doc(userID).get()
			let user_map = JSON.stringfy = Object.entries(social_list)[0][1]						
			let friend_map = user_map.allFriends;


			for (let i = 0; i < Object.keys(friend_map).length; i++) {
				var friends = {}
				const user = Object.entries(friend_map)[i]
				const status = user[1][1]
			
			if (status === 'blocked' || status === 'blocking') {
			} else {
				friends['uid'] = Object.keys(friend_map)[i];
				friends['displayName'] = Object.values(friend_map)[i][0]
				friend_list.push(friends);	
				setFriendList(friend_list)
			}
					
			}
		}
		loadFriends()
	}, [setFriendList])
		
	const friendKeyExtractor = (item) => {
		return item.uid
	}
	const leftSwipe = () => {
		return (
			<View style = {{ 
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'row' ,
				padding: 4 
				}}>
				<TouchableOpacity onPress = {() => {
					setMoreScreen(!moreScreen)
				}}>
				<View style = {{ 
					width: 100,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 5, 
					backgroundColor: 'blue',
					height: 80,
					}}>
					<Icon 
						name = {'expand-more'}
						color = {'white'}
						size = { 30 }
						type = { Icons.MaterialIcons }/>
					<Text style = {{ 
						fontWeight: 'bold',
						fontSize: 20,
						color: 'white'
					}}>More</Text>
				</View>
				</TouchableOpacity>
			</View>
		)
	}
	const renderItem = ({item}) => {
		return (
		<>
			<Modal 
				isVisible = { moreScreen }
				userNativeDriver = { true }
				backdropTransitionOuttiming = { 0 }
				style = {{
					marginRight: 10,
					marginTop: 40
				}}
				hideModalContentWhileAnimating>
				<View style = {{ flex: 1, flexDirection: 'row' }}>
					<View style = {{flex: 1, flexDirection: 'column' }}>
						<TouchableOpacity onPress = {() => { setMoreScreen(!moreScreen) }} style = {{ flex: 1 }}/>
						<View style = {{ 
							flex: 3, 
							backgroundColor: 'white',
							borderRadius: 7,
							padding: 10
							}}>
							<TouchableOpacity onPress = {() => {
								<DenyUserScreen
									userID = { userID }
									friendUserID = { item.uid }
									displayName = { item.displayName }/>
								console.log('unadd')
							}}>
								<Text style = {styles.modalText}>Unadd</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress = {() => {console.log('block')}}>
								<Text style = {styles.modalText}>Block</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress = {() => {console.log('chat')}}>
								<Text style = {styles.modalText}>Chat</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity onPress = {() => { setMoreScreen(!moreScreen) }} style = {{ flex: 3 }}/>
					</View>
					<TouchableOpacity onPress = {() => { setMoreScreen(!moreScreen) }} style = {{ flex: 1 }}/>			
				</View>
			</Modal>
			<Swipeable
				renderLeftActions = {leftSwipe}>
			<View style = {styles.userBlock }>
					<View style = { styles.metaBlock }>
						<View style = {{paddingHorizontal: 10, paddingTop: 5}}>
							<Icon name = { 'user' }
								color = {'white'}
								size = { 35 }
								type = { Icons.Feather }
							/>
						</View>
						<Text style = {styles.requestName}>{item.displayName}</Text>
							<View style = { styles.decideBlock }>
								<View style = { styles.buttonBlock }>
								</View>
							</View>
						</View>
				</View>
			</Swipeable>	
		</>
		)
	}

	return (
		<View style = { styles.friendContainer }>	
			{ friendList.length > 0 ? (
			<FlatList
				style = {{ 
					paddingTop: 12,
					padding: 8,
					backgroundColor: '#355C7D'
					}}
				data = {friendList}
				renderItem = {renderItem }
				keyExtractor = {friendKeyExtractor}
				ItemSeparatorComponent = {() => 
					<View style = {{ height: 3 }}/>
				}
			/>
			) : null }
		</View>
	)
}

const styles = StyleSheet.create({
	friendListContainer: {
		flex: 1,
	},
	friendContainer: {
		flex: 1,
		backgroundColor: '#0f0d0d',
	},
	requestContainer: {
		flex: 1,
		backgroundColor: '#0f0d0d'
	},
	requestName: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 22,
		paddingLeft: 7,
		paddingTop: 10
	},
	userBlock: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		height: 80,
		borderRadius: 5,
		backgroundColor: '#7991B2'
	},
	metaBlock: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center',
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
	},
	modalText: {
		fontWeight: 'bold',
		fontSize: 20
	}
})
