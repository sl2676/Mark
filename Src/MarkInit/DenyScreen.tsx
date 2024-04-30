import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import Icon, { Icons } from '../Icons';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
const DenyUserScreen = ({ friendUserID, displayName }) => {

	const {
		userID,
		userHandle
	} = useSelector(state => state.userReducer)
	const [userName, setUserName] = useState(userHandle);
	const [friendName, setFriendName] = useState(displayName);
	console.log('denyScreen')
	console.log(friendUserID)
	console.log(displayName)

	const userRef = firestore().collection('relation').doc(userID)
	const friendRef = firestore().collection('relation').doc(friendUserID)

	function denyUser() {	
		userRef.set({
			friendRequest: {
				[friendUserID]: firestore.FieldValue.delete()
			}
		}, { merge: true });
	
		friendRef.set({
			ownRequest: {
				[userID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
	}

	function blockUserStatus() {
		try {
		userRef.set({
			friendRequest: {
				[friendUserID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
		} catch(error) {
			console.log('fr fruid: userRef')
			console.log(error)
		}
		try {
		userRef.set({
			ownRequest: {
				[friendUserID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
		} catch (error) {
			console.log('or fruid: userRef')
			console.log(error)
		}
		try {
		userRef.set({
			allFriends: {
				[friendUserID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
		} catch (error) {
			console.log('aF fruid: userRef')
			console.log(error)
		}
		try {
		friendRef.set({
			ownRequest: {
				[userID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
		} catch (error) {
			console.log('or: uid')
			console.log(error)
		}
		try {
		friendRef.set({
			friendRequest: {
				[userID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
		} catch (error) {
			console.log('fr: uid')
			console.log(error)
		}
		try {
		friendRef.set({
			allFriends: {
				[userID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
		} catch (error) {
			console.log('aF: uid')
			console.log(error)
		}
	}
	function userBlock() {
		const allFriends = {}
		allFriends[friendUserID] = [displayName, 'blocked']
		userRef.set({
			allFriends
		}, { merge: true })
		userRef.set({
			ownRequest: {
				[friendUserID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
	}
	function friendBlock() {
		const allFriends = {}
		allFriends[userID] = [userHandle, 'blocker']
		friendRef.set({
			allFriends
		}, { merge: true })
	}

	function blockUser() {
		try {
			blockUserStatus()
			userBlock()
			friendBlock()
			
		} catch(error) {
			console.log(error)
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
				<Text style = {{ color: 'white', fontSize: 24, fontWeight: 'bold'}}>{friendName}</Text>
			</View>
			<View style = {{ flex: 2, padding: 45, justifyContent: 'space-between' }}>
				<TouchableOpacity onPress = {() => {
					denyUser()
					}}>
					<Text style = {{ color: 'white', fontSize: 20, fontWeight: 'bold'}}>Deny</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress = {() => {
					blockUser()
					}}>
					<Text style = {{ color: 'white', fontSize: 20, fontWeight: 'bold'}}>Block</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default DenyUserScreen;
