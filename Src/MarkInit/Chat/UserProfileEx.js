import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	SafeAreaView
} from 'react-native';
import firestore from '@react-native-firebase/firestore'
export const UserProfileScreenEx = ({ user }) => {
/*
	const getUsers = async() => {
		try {
			const querySanp = 
				await firestore()
					.collection('users')
					.where('uid', '!=', user.uid)
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(documentSnapshot => {
							console.log('User ID: ', documentSnapshot.id, documentSnapshot.data())
						})
					})
		} catch(err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getUsers()
	}, [])
*/
	return (
		<SafeAreaView>
		<View style = {{ backgroundColor: 'purple', height: 40 }}>
			<Text>{user.email}</Text>
		</View>
		</SafeAreaView>

	)
}
