import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import Icon, { Icons } from '../Icons';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
const CancelScreen = ({ friendUserID, displayName}) => {
	const { userID } = useSelector(state=>state.userReducer)

	const cancelUser = () => {
		userRef = firestore().collection('relation').doc(userID)
		friendRef = firestore().collection('relation').doc(friendUserID)
		console.log(friendUserID)
		userRef.set({
			ownRequest: {
				[friendUserID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
		
		friendRef.set({
			friendRequest: {
				[userID]: firestore.FieldValue.delete()
			}
		}, { merge: true })
		
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
				<TouchableOpacity onPress = {() => {
					cancelUser()
					}}>
					<Text style = {{ color: 'white', fontSize: 20, fontWeight: 'bold'}}>Unsend</Text>
				</TouchableOpacity>
			</View>
		</View>
	)	
}

export default CancelScreen;
