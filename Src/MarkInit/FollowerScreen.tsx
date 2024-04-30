import { useEffect, useState } from 'react';
import Icon, { Icons } from '../Icons';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FollowerScreen = () => {

	const { userFollower } = useSelector(state => state.userReducer)
	const [followerList, setFollowerList] = useState([])
	useEffect(() => {
		setFollowerList(userFollower)
	}, [setFollowerList])

	const followerKeyExtractor = (item) => {
		return item.uid
	}

	const renderItem = ({item}) => {
		return (
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
					</View>
					</View>
					</View>
				</View>
			)
	}

	return (
		<View style = {{ flex: 1 }}>
			<FlatList
				style = {{
					paddingTop: 12,
					padding: 8,
					zIndex: 1
				}}
				data = {followerList}
				renderItem = {renderItem}
				keyExtractor = {followerKeyExtractor}
				ItemSeparatorComponent = {() =>
					<View style = {{ height: 3 }}/>
				}
			/>
		</View>
	)
}

	

const styles = StyleSheet.create({
	friendListContainer: {
		flex: 1,
		zIndex: 1
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
		zIndex: 1,
		padding: 15,
		flexDirection: 'row',
		height: 80,
		backgroundColor: '#7991B2'
	},
	metaBlock: {
		flex: 2,
		zIndex: 1,
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
		zIndex: 1,
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

export default FollowerScreen;
