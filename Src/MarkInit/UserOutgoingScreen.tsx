import { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon, { Icons } from '../Icons';
import { useSelector,} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export const OutgoingScreen = () => {

	const { userID } = useSelector(state => state.userReducer)	
	const [outgoingList, setOutgoingList] = useState([]);
	const friend_list = [];
	const outgoing_list = [];

	useEffect(() => {
		const loadOutgoing = async () => {
			social_list = await firestore().collection('relation').doc(userID).get()
			let user_map = JSON.stringfy = Object.entries(social_list)[0][1]
			let friend_map = user_map.ownRequest;
			for (let i = 0; i < Object.keys(friend_map).length; i++ ) {
				outgoing_list.push(Object.values(friend_map)[0][1])
			}
			for (let i = 0; i < Object.keys(friend_map).length; i++) {
				var friends = {};
				friends['uid'] = Object.keys(friend_map)[i];
				friends['displayName'] = Object.values(friend_map)[i][0];
				friend_list.push(friends)
				setOutgoingList(friend_list)
			}
//			console.log(outgoingList);
		}	
	
	loadOutgoing()
	}, [setOutgoingList])

	const friendKeyExtractor = (item) => {
		return item.uid
	}

	const leftSwipe = () => {
		return (
			<View style = {{
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'row',
				padding: 20
			}}>	
				<Icon name = {'chatbubbles'}
					color = {'white'}
					size = { 30 }
					type = { Icons.Ionicons }/>
				<Icon name = {'more'}
					color = {'white'}
					size = { 30 }
					type = { Icons.MaterialIcons }/>
			</View>
		)
	}

	const renderItem = ({item}) => {
		return (
			<Swipeable renderLeftActions = {leftSwipe}>
			<View style = { styles.userBlock}>
				<View style = { styles.metaBlock }>
					<View style = {{ paddingHorizontal: 10, padding: 5 }}>
					<Icon name = {'user'}
						color = {'white'}
						size = { 35 }
						type = { Icons.Feather }/>
				</View>
				<Text style = { styles.requestName }>{item.displayName}</Text>
				<View style = { styles.decideBlock }>
					<View style = { styles.buttonBlock }/>
				</View>
			</View>
			</View>
		</Swipeable>
		)
	}	

	return (
		<View style = { styles.friendContainer }>			
			{ outgoingList.length > 0 ? (
			<FlatList
				style = {{ backgroundColor: '#6C5B7B'}}
				data = {outgoingList}
				renderItem = {renderItem }
				keyExtractor = {friendKeyExtractor}
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
		backgroundColor: '#6C5B7B',
	},
	requestContainer: {
		flex: 1,
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
