import React, { useRef, useState } from 'react';
import {
	Pressable, 
	Image, 
	TextInput, 
	ScrollView, 
	Text, 
	StyleSheet,
	View, 
	FlatList,
	TouchableOpacity } from 'react-native';
import { useSearchBox, useInfiniteHits } from 'react-instantsearch-hooks';
import Icon, { Icons } from '../../Icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';


export function AgoliaWidget({ onPress, hitComponent: Hit, ...props }) {
	const { hits, isLastPage, showMore } = useInfiniteHits(props);
	const { query, refine } = useSearchBox(props);
	const [inputValue, setInputValue] = useState(query);
	const [ text, setText ] = useState('');
	const inputRef = useRef(null);
		
	const {
		userHandle,
		userID
	} = useSelector(state => state.userReducer);
	
	const ownRequest = {};
	const friendRequest = {};
	const navigation = useNavigation();
	
	function setQuery(newQuery) {
		setInputValue(newQuery);
		refine(newQuery);
	}
	function sendFQ(ownRequest, userFriendID, friendName, status) {
		ownRequest[userFriendID] = [friendName, status];
		console.log('oR list: ', ownRequest)
	}
	function receiveFQ(friendRequest, userID, userHandle, status) {
		friendRequest[userID] = [userHandle, status];
		console.log('fR list: ', friendRequest)
	}
	
	function addFriend(item) {
		const userFriendID = Object.values(item)[0];
		const friendName = Object.values(item)[3];
		var status = 'pending'
		sendFQ(ownRequest, userFriendID, friendName, status)
		receiveFQ(friendRequest, userID, userHandle, status)
		try {
			firestore().collection('relation').doc(userID).set({
				ownRequest
			}, { merge: true })	
			firestore().collection('relation').doc(userFriendID).set({
				friendRequest
			}, { merge: true })
		} catch(error) {
			console.log(error);
		}
		
	}
	
	if (query !== inputValue && !inputRef.current?.isFocused()) {
		setInputValue(newQuery);
	}

	return (			
		<View style = {styles.container}>
			<View style = {{ top: -7, flexDirection: 'row'}}>
				<TouchableOpacity
					onPress = {() => {
						onPress()
					}}>
				<Icon name = {'arrow-left'}
					type = {Icons.FontAwesome}
					size = { 20 }
					style = {{ color: 'white'}}/>
				</TouchableOpacity>
				<Text style = {{
					color: 'white',
					left: 40,
					fontSize: 20,
					fontWeight: 'bold',
					fontFamily: 'ArgentumSans-black'
					}}>Add Friends</Text>
			</View>
			<View style = {{ top: 10}}>
			<Icon name = {'alternate-email'}
				type = {Icons.MaterialIcons}
				size = {22}
				style = {{
					color: 'black',
					zIndex: 1,
					width: 20,
					top: 13,
					left: 5
				}}/>
			<TextInput
				ref = {inputRef}
				style = {styles.input}
				value = {inputValue}
				onChangeText = {(value) => {
					setQuery(value);
					setText(value);
				
				}}
				clearButtonMode = 'while-editing'
				autoCapitalize = 'none'
				autoCorrect = {false}
				spellCheck = {false}
				autoCompleteType = 'off'
			/>
			</View>
			<View style = {{
				left: -20, 
				top: 5, 
				width: 320,
				height: 680,
//				backgroundColor: 'red',
				}}>
				<FlatList
					data = {hits}
					keyExtractor={(item) => item.objectID}
					ItemSeparatorComponent={() => <View/>}
					onEndReached={() => {
						if (!isLastPage) {
							showMore();
						}
					}}
					renderItem={({ item }) => (
						<View style={styles.item}>
							{ text != '' ? (
							<View style = {styles.itemContainer}>
								<View style = {{
									width: 75,
									height: 75,
									borderRadius: 40,
									borderWidth: 4,
									borderColor: 'black',
									top: 10,
									left: 20,
									backgroundColor: 'white'						
									}}/>
									<View style = {{ right: 25 }}>		
										<Text style = {styles.itemText}>{item.objectID}</Text>
											<TouchableOpacity
												style = {{ 
												bottom: 63,
												left: 200,
												width: 30
												}}
												onPress = {() => {
													addFriend(item)
													//addFriend(item.objectID)
												}}>
												<Icon name = 'person-add-alt-1'
													color = {'white'}
													size = { 30 }
													type = { Icons.MaterialIcons }/>	
											</TouchableOpacity>

											<TouchableOpacity
												style = {{ 
													left: 160,
													bottom: 93,
													width: 30 }}
													onPress = {() => {
														navigation.navigate('FriendScreen');
														onPress()
													}}>
														<Icon name = 'user-circle-o'
															color = {'white'}
															size = {30}
															type = { Icons.FontAwesome}
														/>
											</TouchableOpacity>
									</View>
								</View>
								) : null }
							</View>
							)}/>
					</View>
					</View>
	)
}

const styles = StyleSheet.create({
	container: {
//		backgroundColor: 'gray',
		padding: 18
	},
	input: {
		height: 50,
		paddingLeft: 30,
		fontSize: 16,
		backgroundColor: 'white',
		borderRadius: 8,
		borderWidth: 1,
		color: 'black',
		fontWeight: 'bold',
		borderColor: '#ddd',
		top: -23
	},
	separator: {
		borderBottomWidth: 1,
		borderColor: '#ddd'
	},
	item: {
		padding: 10,
	},
	itemText: {
		color: 'white',
		fontSize: 18,
		padding: 10,
		fontWeight: 'bold',
		textAlign: 'left',
		bottom: 65,
		left: 150,
		paddingBottom: 10,
	},
	itemContainer: {
		borderRadius: 13,
		height: 100,
		width: 240,
		left: 0,
		backgroundColor: '#36454F'
	},
})
