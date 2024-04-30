import { View, StyleSheet, FlatList, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import {
  AnimatedTabBarNavigator,
  DotSize, 
  TabElementDisplayOptions, 
  TabButtonLayout, 
  IAppearanceOptions 
} from 'react-native-animated-nav-tab-bar';
import Icon, { Icons } from '../Icons';
import Modal from 'react-native-modal';
import DenyUserScreen from './DenyScreen';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import CancelScreen from './CancelScreen';

const OutgoingScreen = ({ onPress }) => {
	const { userID, userOutgoing } = useSelector(state => state.userReducer)
	const [orequestList, setORequestList] = useState([]);
	const [showCancelScreen, setShowCancelScreen] = useState(false);
	const [displayName, setDisplayName] = useState();
	const [friendUserID, setFriendUserID] = useState();	
	useEffect(() => {
		setORequestList(userOutgoing)	
	}, [setORequestList])

const friendKeyExtractor = (item) => {		
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
						<TouchableOpacity
							onPress = {() => {
								setDisplayName(item.displayName)
								setFriendUserID(item.uid)
								setShowCancelScreen(!showCancelScreen)
							}}>
						<Icon 
							name = { 'block' }
							type = { Icons.Entypo }
							size = { 22 }
							style = {{ color: 'white'}}/>
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
					}}
					data = {orequestList}
					renderItem = {renderItem}
					keyExtractor = {friendKeyExtractor}
					ItemSeparatorComponent = {() => 
						<View style = {{ height: 3 }}/>
					}
				/>
		</View>
		<Modal
				isVisible = { showCancelScreen }
				useNativeDriver = {true}
				backdropTransitionOuttiming = {0}
				style = {{
					marginRight: 10,
					marginTop: 40
				}}
				hideModalContentWhileAnimating>
					<View style = {{ flex: 1 }}>
						<View 
							onStartShouldSetResponder = {() => { setShowCancelScreen(!showCancelScreen)}}
							style = {{ flex: 2, backgroundColor: 'transparent' }}/>
							<View style = {{
								flex: 2,
								flexDirection: 'row'
							}}>
							<View
								style = {{ flex: .15, backgroundColor: 'transprent '}}
								onStartShouldSetResponder = {() => { setShowCancelScreen(!showCancelScreen)}}/>
								<View 
									style = {{
										flex: 3,
										backgroundColor: 'white',
										borderRadius: 18
									}}>
									<CancelScreen
										friendUserID = {friendUserID}
										displayName = { displayName }
									/>
								</View>
							<View
								style = {{ flex: .15, backgroundColor: 'transparent'}}
								onStartShouldSetResponder = {() => { setShowCancelScreen(!showCancelScreen)}}/>
							</View>
						<View
							onStartShouldSetResponder = {() => { setShowCancelScreen(!showCancelScreen)}}
							style = {{ flex: 2, backgroundColor: 'transparent' }}/>
					</View>
				</Modal>
				</>
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
		zIndex: 1000, 
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

export default OutgoingScreen;
