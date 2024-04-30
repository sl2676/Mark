import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  AnimatedTabBarNavigator,
  DotSize, 
  TabElementDisplayOptions, 
  TabButtonLayout, 
  IAppearanceOptions 
} from 'react-native-animated-nav-tab-bar';
import Icon, { Icons } from '../Icons';
import Modal from 'react-native-modal';
import UnBlockScreen from './UnBlockScreen';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const BlockedScreen = () => {
	const { userID, userBlocked } = useSelector(state => state.userReducer)
	const [ showOptionScreen, setShowOptionScreen ] = useState(false); 
	const [displayName, setDisplayName] = useState()
	const [friendUserID, setFriendUserID] = useState()
	const [blockedList, setBlockedList] = useState([])
	useEffect(() => {
		setBlockedList(userBlocked)
	})	

	const blockedKeyExtractor = (item) => {
		return item.uid
	}
	

	const renderItem = ({item}) => {
		return (
			<View 
				style = {{ 
					zIndex: 1,
					height: 100,
					flexDirection: 'row', 
					backgroundColor: '#3700B3',	
			}}>
					<Text style = {{ 
						fontWeight: 'bold',
						color: 'white',
						fontSize: 25
						}}>{item.displayName}</Text>
					<TouchableOpacity
						style = {{ height: 30, backgroundColor: 'red'}}
						onPress = {() => {
						setDisplayName(item.displayName)
						setFriendUserID(item.uid)
						setShowOptionScreen(!showOptionScreen)
						}}>
						<Icon 
							name = {'minus-square'}
							color = {'white'}
							size = {35}
							type = { Icons.Feather}/>
					</TouchableOpacity>
			</View>
		)
	}

	return (
		<>
		<View style = {{ flex: 1 }}>
				<FlatList
					style = {{
						paddingTop: 12,
						padding: 8,
						zIndex: 1
					}}
					data = {blockedList}
					renderItem = {renderItem}
					keyExtractor = {blockedKeyExtractor}
					ItemSeparatorComponent = {() => 
						<View style = {{ height: 3 }}/>
					}
				/>
		</View>
		<Modal
				isVisible = { showOptionScreen }
				useNativeDriver = {true}
				backdropTransitionOuttiming = {0}
				style = {{
					marginRight: 10,
					marginTop: 40
				}}
				hideModalContentWhileAnimating>
					<View style = {{ flex: 1 }}>
						<View 
							onStartShouldSetResponder = {() => { setShowOptionScreen(!showOptionScreen)}}
							style = {{ flex: 2, backgroundColor: 'transparent' }}/>
							<View style = {{
								flex: 2,
								flexDirection: 'row'
							}}>
							<View
								style = {{ flex: .15, backgroundColor: 'transprent '}}
								onStartShouldSetResponder = {() => { setShowOptionScreen(!showOptionScreen)}}/>
								<View 
									style = {{
										flex: 3,
										backgroundColor: 'white',
										borderRadius: 18
									}}>
									<UnBlockScreen
										displayName = {displayName}
										friendUserID = {friendUserID}	
									/>
								</View>
							<View
								style = {{ flex: .15, backgroundColor: 'transparent'}}
								onStartShouldSetResponder = {() => { setShowOptionScreen(!showOptionScreen)}}/>
							</View>
						<View
							onStartShouldSetResponder = {() => { setShowOptionScreen(!showOptionScreen)}}
							style = {{ flex: 2, backgroundColor: 'transparent' }}/>
					</View>
				</Modal>
				</>
	)
	

}

export default BlockedScreen;

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
