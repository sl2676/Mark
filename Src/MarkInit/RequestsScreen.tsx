import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  AnimatedTabBarNavigator,
  DotSize, 
  TabElementDisplayOptions, 
  TabButtonLayout, 
  IAppearanceOptions 
} from 'react-native-animated-nav-tab-bar';
import AcceptUserScreen from './AcceptScreen';
import Icon, { Icons } from '../Icons';
import Modal from 'react-native-modal';
import DenyUserScreen from './DenyScreen';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const RequestScreen = ({onPress}) => {
	const { 
		userID,
		userRequest
	} = useSelector(state => state.userReducer)
	const [showUnaddScreen, setShowUnaddScreen] = useState(false);
	const [showAddScreen, setShowAddScreen] = useState(false);
	const [requestList, setRequestList] = useState([]);
	const [displayName, setDisplayName] = useState();
	const [friendUserID, setFriendUserID] = useState();
	useEffect(() => {
		setRequestList(userRequest)
	})
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
								console.log(item.displayName)
								setDisplayName(item.displayName)
								setFriendUserID(item.uid)
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
								setShowAddScreen(!showAddScreen)
								setDisplayName(item.displayName)
								setFriendUserID(item.uid)
								console.log(friendUserID)
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
					data = {requestList}
					renderItem = {renderItem}
					keyExtractor = {friendKeyExtractor}
					ItemSeparatorComponent = {() => 
						<View style = {{ height: 3 }}/>
					}
				/>
				
		</View>
		<Modal
				isVisible = { showUnaddScreen }
				useNativeDriver = {true}
				backdropTransitionOuttiming = {0}
				style = {{
					marginRight: 10,
					marginTop: 40
				}}
				hideModalContentWhileAnimating>
					<View style = {{ flex: 1 }}>
						<View 
							onStartShouldSetResponder = {() => { setShowUnaddScreen(!showUnaddScreen)}}
							style = {{ flex: 2, backgroundColor: 'transparent' }}/>
							<View style = {{
								flex: 2,
								flexDirection: 'row'
							}}>
							<View
								style = {{ flex: .15, backgroundColor: 'transprent '}}
								onStartShouldSetResponder = {() => { setShowUnaddScreen(!showUnaddScreen)}}/>
								<View 
									style = {{
										flex: 3,
										backgroundColor: 'white',
										borderRadius: 18
									}}>
									<DenyUserScreen
										displayName = {displayName}
										friendUserID = {friendUserID}
									/>
								</View>
							<View
								style = {{ flex: .15, backgroundColor: 'transparent'}}
								onStartShouldSetResponder = {() => { setShowUnaddScreen(!showUnaddScreen)}}/>
							</View>
						<View
							onStartShouldSetResponder = {() => { setShowUnaddScreen(!showUnaddScreen)}}
							style = {{ flex: 2, backgroundColor: 'transparent' }}/>
					</View>
				</Modal>
				<Modal
				isVisible = { showAddScreen }
				useNativeDriver = {true}
				backdropTransitionOuttiming = {0}
				style = {{
					marginRight: 10,
					marginTop: 40
				}}
				hideModalContentWhileAnimating>
					<View style = {{ flex: 1 }}>
						<View 
							onStartShouldSetResponder = {() => { setShowAddScreen(!showAddScreen)}}
							style = {{ flex: 2, backgroundColor: 'transparent' }}/>
							<View style = {{
								flex: 2,
								flexDirection: 'row'
							}}>
							<View
								style = {{ flex: .15, backgroundColor: 'transprent '}}
								onStartShouldSetResponder = {() => { setShowAddScreen(!showAddScreen)}}/>
								<View 
									style = {{
										flex: 3,
										backgroundColor: 'white',
										borderRadius: 18
									}}>
									<AcceptUserScreen
										displayName = {displayName}
										friendUserID = {friendUserID}
									/>
								</View>
							<View
								style = {{ flex: .15, backgroundColor: 'transparent'}}
								onStartShouldSetResponder = {() => { setShowAddScreen(!showAddScreen)}}/>
							</View>
						<View
							onStartShouldSetResponder = {() => { setShowAddScreen(!showAddScreen)}}
							style = {{ flex: 2, backgroundColor: 'transparent' }}/>
					</View>
				</Modal>
				</>
	)
}

export default RequestScreen;

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
