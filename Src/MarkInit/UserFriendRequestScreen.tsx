import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Icon, { Icons } from '../Icons';
import { useSelector,} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { AcceptUserScreen } from './AcceptUserScreen';
import Modal from 'react-native-modal';
import { DenyUserScreen } from './DenyUserScreen';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


export const RequestScreen = ({ onPress }) => {
	const [friendList, setFriendList ] = useState([]);
	const { userID, userAllFriends, userFriendRequests } = useSelector(state => state.userReducer)
	const [ showUnaddScreen, setShowUnaddScreen ] = useState(false);
	const [ showAddScreen, setShowAddScreen ] = useState(false);
	const friend_list = [];
	const accepted_names = [];
//	console.log('req allFriends: ' + Object.values(userAllFriends))
	useEffect(() => {
		const loadRequests = async () => {
//			social_list = await firestore().collection('relation').doc(userID).get()
//			let user_map = JSON.stringfy = Object.entries(social_list)[0][1]
//			console.log(user_map)
//			let friend_map = user_map.friendRequest
			let friend_map = userFriendRequests
			console.log(friend_map)
			for (let i = 0; i < Object.keys(friend_map).length; i++ ) {
				var friends = {}
				friends['uid'] = Object.keys(friend_map)[i];
				friends['displayName'] = Object.values(friend_map)[i][0];
				friends['status'] = Object.values(friend_map)[i][1]
				friend_list.push(friends);
				setFriendList(friend_list)
			}
			console.log(friendList)	

		}
		loadRequests()
	}, [setFriendList])
	const friendKeyExtractor = (item) => {
		return item.uid
	}
	const onPressAccept = () => {
		setShowAddScreen(!showAddScreen)
	}
	const onPressDeny = () => {
		setShowUnaddScreen(!showUnaddScreen)
	}

	const renderItem = ({item}) => {
		return (
			<>
			<Modal
				isVisible = { showUnaddScreen }
				useNativeDriver = { true }
				backdropTransitionOuttiming = { 0 }
				style = {{
					marginRight: 10,
					marginTop: 40
				}}
				hideModalContentWhileAnimating>
			<View style = {{ flex: 1, flexDirection: 'column'}}>
				<TouchableOpacity 
					style = {{ flex: 8 }}
					onPress = {() => {
					setShowUnaddScreen(!showUnaddScreen)
				}}>
				<View style = {{
					flex: 6
					}}/>
				</TouchableOpacity>
				<View style = {{ 
					flex: 7, 
					flexDirection: 'row'
				}}>
					<TouchableOpacity 
						style = {{
							flex: 1,
						}}
						onPress = {() => {
							setShowUnaddScreen(!showUnaddScreen)
						}}/>
					<View style = {{
						flex: 14,
						flexDirection: 'column'
					}}>
						<View style = {{
							backgroundColor: 'white',
							flex: 13,
							borderRadius: 20
						}}>
							<DenyUserScreen
								userID = { userID } 
								friendUserID = {item.uid}
								displayName = {item.displayName}
							/>
						</View>
						<View style = {{
							flex: .75,
							borderRadius: 6
						}}/>
						<TouchableOpacity onPress = {() => {
							setShowUnaddScreen(!showUnaddScreen)
						}}
						style = {{
							backgroundColor: 'white',
							flex: 2,
							justifyContent: 'center',
							borderRadius: 9,
							alignItems: 'center'
						}}>
							<Text style = {{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity 
						style = {{
							flex: 1
						}}
						onPress = {() => {
							setShowUnaddScreen(!showUnaddScreen)
						}}/>
				</View>
			</View>
			</Modal>
			<Modal
				isVisible = { showAddScreen }
				useNativeDriver = { true }
				backdropTransitionOuttiming = { 0 }
				style = {{
					marginRight: 10,
					marginTop: 40
				}}
				hideModalContentWhileAnimating>
			<View style = {{ flex: 1, flexDirection: 'column'}}>
				<TouchableOpacity 
					style = {{ flex: 8 }}
					onPress = {() => {
					setShowAddScreen(!showAddScreen)
				}}>
				<View style = {{
					flex: 6
					}}/>
				</TouchableOpacity>
				<View style = {{ 
					flex: 7, 
					flexDirection: 'row'
				}}>
					<TouchableOpacity 
						style = {{
							flex: 1,
						}}
						onPress = {() => {
							setShowAddScreen(!showAddScreen)
						}}/>
					<View style = {{
						flex: 14,
						flexDirection: 'column'
					}}>
						<View style = {{
							backgroundColor: 'white',
							flex: 13,
							borderRadius: 20
						}}>
							<AcceptUserScreen
								onModalPress = { onPress }
								onAcceptPress = { onPressAccept }
								userID = { userID }
								friendUserID = {item.uid}
								displayName = {item.displayName}
								status = { item.status }
							/>
						</View>
						<View style = {{
							flex: .75,
							borderRadius: 6
						}}/>
						<TouchableOpacity onPress = {() => {
							setShowAddScreen(!showAddScreen)
						}}
						style = {{
							backgroundColor: 'white',
							flex: 2,
							justifyContent: 'center',
							borderRadius: 9,
							alignItems: 'center'
						}}>
							<Text style = {{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity 
						style = {{
							flex: 1
						}}
						onPress = {() => {
							setShowAddScreen(!showAddScreen)
						}}/>
				</View>
			</View>
			</Modal>
			<View style = {styles.userBlock }>
				<View style = { styles.metaBlock }>
					<View style = {{paddingHorizontal: 10, paddingTop: 5}}>
						<Icon name = { 'user-circle-o' }
							color = {'white'}
							size = { 35 }
							type = { Icons.FontAwesome }
						/>
					</View>
					<Text style = {styles.requestName}>{item.displayName}</Text>
					<View style = { styles.decideBlock }>
					<View style = { styles.buttonBlock }>
						<TouchableOpacity
							style = {{ backgroundColor: 'blue', zIndex: 1 }}
							onPress = {() => {
								console.log('deny-user')
								setShowUnaddScreen(!showUnaddScreen)
								console.log(item.uid)
							}}>
						<Icon 
							name = { 'block' }
							type = { Icons.Entypo }
							size = { 22 }
							style = {{ color: 'white'}}/>
						</TouchableOpacity>
						<TouchableOpacity
							style = {{flex: 1, zIndex: 3, backgroundColor: 'red'}}
							onPress = {() => {
								console.log('accept-user');
								setShowAddScreen(!showAddScreen)
						}}>
						<Icon
							name = { 'check' }
							type = { Icons.FontAwesome }
							size = { 22 }
							style = {{ color: 'white', paddingHorizontal: 10 }}/>
						</TouchableOpacity>
					</View>
					</View>
					</View>
				</View>
				<View style = {{
					backgroundColor: 'white',
					height: 0.5,
					width: '100%',
				}}/>
				</>
		)
	}
	return (
		<View style = { styles.requestContainer }>
			{ friendList.length > 0 ? (
				<FlatList
					style = {{
						paddingTop: 12,
						padding: 8,
						backgroundColor: '#355C7D'
					}}
					data = {friendList}
					renderItem = {renderItem}
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
		color: 'white',
		fontWeight: 'bold',
		fontSize: 22,
		paddingLeft: 7,
		paddingTop: 10
	},
	userBlock: {
		flex: 3,
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
