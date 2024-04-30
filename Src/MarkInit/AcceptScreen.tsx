import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon, { Icons } from '../Icons';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';

const AcceptUserScreen = ({friendUserID, displayName}) => {
	const { userID, userHandle, userFollowee } = useSelector(state=>state.userReducer)

	
	const hasValue = (obj, value) => Object.values(obj).includes(value);

	const addUserAcceptBoth = async() => {
		userRef = await firestore().collection('relation').doc(userID)
		const allFriends = {}
		allFriends[friendUserID] = [displayName, 'follower', 'followee']
		userRef.set({
			allFriends
		}, { merge: true })
		userRef.set({
			friendRequest: {
				[friendUserID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
	}

	const addFriendAcceptBoth = async() => {
		friendRef = await firestore().collection('relation').doc(friendUserID)
		const allFriends = {}
		allFriends[userID] = [userHandle, 'follower', 'followee']
		friendRef.set({
			allFriends
		}, { merge: true })
		friendRef.set({
			ownRequest: {
				[userID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
	}	

	const addUserAccept = async() => {
		userRef = await firestore().collection('relation').doc(userID)
		const allFriends = {}
		allFriends[friendUserID] = [displayName, 'follower']
		userRef.set({
			allFriends
		}, { merge: true })
		userRef.set({
			friendRequest: {
				[friendUserID]: firestore.FieldValue.delete()	
			}
		}, { merge: true })
	}

	const addFriendAccept = async() => {
		friendRef = await firestore().collection('relation').doc(friendUserID)
		const allFriends = {}
		allFriends[userID] = [userHandle, 'followee']
		friendRef.set({
			allFriends
		}, { merge: true })
		friendRef.set({
			ownRequest: {
				[userID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
	}

	const checkUserStatus = (user_metadata) => {
		for (let i = 0; i < user_metadata.length; i++) {
			if (user_metadata[i] === 'followee') {
				return true
			}
		}
		return false;
	}

	const checkFriendStatus = (friend_metadata) => {
		for (let i = 0; i < friend_metadata.length; i++) {
			if (friend_metadata[i] === 'follower') {
				return true
			}
		}	
		return false;
	}

	const addUser = async (friendUserID) => {
			
			userRef = await firestore().collection('relation').doc(userID).get()
			friendRef = await firestore().collection('relation').doc(friendUserID).get()
			
			const user_map = JSON.stringfy = Object.entries(userRef)[0][1]	
			const user_allFriends = user_map.allFriends;
			
			const friend_map = JSON.stringfy = Object.entries(friendRef)[0][1]
			const friend_allFriends = friend_map.allFriends;
			
			try {
				for (let i = 0; i < Object.keys(user_allFriends).length; i++) {
					var user_metadata = Object.values(user_allFriends)[i]
					var user_friendUserID = Object.keys(user_allFriends)[i]
					if (user_friendUserID === friendUserID) {
						console.log('user exists')
						if (checkUserStatus(user_metadata)) {
							console.log('both')
							addUserAcceptBoth()
							addFriendAcceptBoth()
						} else {
							console.log('first time')
							acceptUserStatus()
							acceptFriendStatus()
						}
					} else {
						addUserAccept()
						addFriendAccept()
					}
				}
			} catch(error) {
				try {
					for (let i = 0; i < Object.keys(friend_allFriends).length; i++) {
						var friend_metadata = Object.values(friend_allFriends)[i]
						var friend_friendUserID = Object.keys(friend_allFriends)[i]
						if (friend_friendUserID === friendUserID) {
							if (checkFriendStatus(friend_metadata)) {
								addUserAcceptBoth()
								addFriendAcceptBoth()
							} else {
								addUserAccept()
								addFriendAccept()
							}
						} else {
							addUserAccept()
							addFriendAccept()
						}
					}
				} catch (error) {
					addUserAccept()
					addFriendAccept()
				}	
			}
	}
	return (
		<View style = {{
			flex: 1,
			backgroundColor: '#121212',
			borderRadius: 18,
			alignItems: 'center'
		}}>
			<View style = {{ flex: 2, padding: 25, justifyContent: 'space-between' }}>
			<View style = {{ alignItems: 'center', padding: 10}}>
				<Icon name = {'user-circle-o'}
						color = {'white'}
						size = { 35 }
						type = { Icons.FontAwesome }/>
			</View>
				<Text style = {{ color: 'white', fontSize: 24, fontWeight: 'bold'}}>{displayName}</Text>
			</View>
			<View style = {{ flex: 2, padding: 45, justifyContent: 'space-between' }}>
				<TouchableOpacity onPress = {() => addUser(friendUserID)}>
					<Text style = {{ color: 'white', fontSize: 20, fontWeight: 'bold'}}>Accept</Text>
				</TouchableOpacity>

			</View>
		</View>
	)
}

export default AcceptUserScreen;
