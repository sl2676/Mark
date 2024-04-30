import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export const TestScreen = ({ navigation }) => {

	const {
		userName,
		userHandle,
		userPassword,
		userID
	} = useSelector(state=>state.userReducer);
	const dispatch = useDispatch();

	return (
		<View style = {{ flex: 1, backgroundColor: 'red' }}>
			<View style = {{ marginLeft: 100, top: 200 }}>
				<Text>userName: {userName}</Text>
				<Text>userHandle: {userHandle}</Text>
				<Text>userPassword: {userPassword}</Text>
				<Text>userID: {userID}</Text>
				<Text></Text>
			</View>
		</View>
	)
}
