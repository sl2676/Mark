import React, { useEffect, useState, useRef } from 'react';
import { 
		View, 
		StyleSheet, 
		TouchableOpacity,
		Animated,
		StatusBar,
		ScrollView,
		ImageBackground,
		Image,
		Text,
		 } from 'react-native';
import Modal from 'react-native-modal'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import Icon, { Icons } from '../Icons';
import { NavigationDrawerHeader } from '../NavigationDrawerHeader';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BlurView } from '@react-native-community/blur';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks';
import { SearchBox } from './Components/SearchBox';
import { InfiniteHits } from './Components/InfinHits';
import { AgoliaWidget } from './Components/AgoliaWidget';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const searchClient = algoliasearch('WZTJDHERP3', '8a2aa01baf40bdb7c110e1625391360d');

export const ProfileScreen = ({ navigation }) => {
	return (
		<Stack.Navigator
			initialRouteName = 'UserProfile'>
			<Stack.Screen
				name = 'UserProfileScreen'
					component = { WrappedProfile }
					options = {{
						headerStyle: {
							height: 0.1
						},
						headerLeft: () => (
							<NavigationDrawerHeader navigationProps = { navigation }/>
						),												
					}}/>
		</Stack.Navigator>		
	)
}

const WrappedProfile = () => {
	return (
		<SafeAreaProvider>
			<UserProfileScreen/>
		</SafeAreaProvider>
	)
}

function generatePosts(limit) {
	return new Array(limit).fill(0).map((_, index) => {
		const repetitions = Math.floor(Math.random() * 3) + 1;
	return {		
		key: index.toString(),
		text: 'Follow pe.kelly on soundcloud! '.repeat(repetitions),
		author: 'Sean',
		tag: 'm0nb1t',
};
});
}


const POSTS = generatePosts(3);
const HEADER_HEIGHT_EXPANDED = 35;
const HEADER_HEIGHT_NARROWED = 90;

const PROFILE_PICTURE_URI =
'https://pbs.twimg.com/profile_images/975388677642715136/7Hw2MgQ2_400x400.jpg';

const PROFILE_BANNER_URI = '';



const AnimatedImageBackground = Animated.createAnimatedComponent(
	ImageBackground
);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const UserProfileScreen = (props) => {
	const insets = useSafeAreaInsets();
	const scrollY = useRef(new Animated.Value(0)).current;
	const [ showModal, setShowModal ] = useState(false);
	const [ showModalFriends, setShowModalFriends ] = useState(false);
	const [ user, setUser ] = useState('');
	const [ text, setText ] = useState('');

	const {
		userName,
		userHandle
	} = useSelector(state=>state.userReducer);
	

	var postArr = [
		{image: require('./post1.jpeg')}, 
		{image: require('./post2.jpeg')},
		{image: require('./post3.jpeg')}, ];

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged((user) => {
			setUser(user);
		});
		return subscriber;
	}, []);
	
	const listRef = useRef(null);

  function scrollToTop() {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }

	const onChange = (event) => {
		setText(event.target.value);
		console.log(text)
	}

  function Hit({ hit }) {
	return (
		<Text style = {{color: 'white'}}>{hit.objectID}</Text>
	);
}
  const onPress = () => {
	setShowModal(!showModal);
  }
  const onStateChange = ({ uiState, setUiState }) => {
  // Custom logic
    setUiState(uiState);
  };

	return (
		<>
			<Modal
				isVisible = { showModal }
				useNativeDriver = { true }
				backdropTransitionOutTiming = { 0 }
				style = {{ 
					marginRight: 10,
					marginTop: 40  }}			
				hideModalContentWhileAnimating
				animationIn = 'slideInRight'
				animationOut = 'slideOutRight'>
				<View style = {{ 
 						flexDirection: 'row', 
						backgroundColor: 'transparent',
						flex: 1  }}>					
					<View style = {{ backgroundColor: 'transparent', flex: 2 }}>	
						<TouchableOpacity
							style = {{ flex: 1 }}
							onPress = {() => { 
								onPress()
							}}/>
					</View>
					
					<View style = {{ 
						backgroundColor: '#36454F', 
						flex: 5,
						borderRadius: 13,
						height: 110,
						}}>
						<InstantSearch 
							searchClient={searchClient} 
							indexName = "usernames"
							onStateChange={onStateChange}>
							<View style = {{ height: 500 }}>
								<AgoliaWidget
									onPress = { onPress } 
									hitComponent = {Hit}
									/>
							</View>
						</InstantSearch>
					</View>
				</View>				
			</Modal>

			<Modal
				isVisible = { showModalFriends }
				useNativeDriver = { true }
				backdropTransitionTiming = { 0 }
				style = {{
					marginRight: 10,
					marginTop: 40
				}}
				hideModalContentWhileAnimating
				animationIn = 'slideInRight'
				animationOut = 'slideOutRight'>
				<View style = {{
					flexDirection: 'row',
					backgroundColor: 'transparent',
					flex: 1
				}}>
					<View style = {{ flex: 2 }}>
						<TouchableOpacity
							style = {{ flex: 1 }}
							onPress = {() => setShowModalFriends(!showModalFriends)}/>
					</View>
					
					<View style = {{ 
						backgroundColor: '#0f0d0d' , 
						flex: 2,
						borderRadius: 13
						 }}>
						<TouchableOpacity
							style = {{ top: 40, width: 40, height: 40, backgroundColor: 'red'}}
							onPress = {() => { 
								setShowModalFriends(!showModalFriends);
								}}>
							<Icon
								name = 'arrow-left'
								color = {'white'}
								type = { Icons.Feather }
								style = {{ marginVertical: 60 }}/>
						</TouchableOpacity>
						<InstantSearch searchClient={searchClient} indexName="usernames" modalVisible = {showModalFriends}>
							
						</InstantSearch>
					</View>
				</View>
			</Modal>
			<View style = {[ styles.container, { backgroundColor: '#0f0d0d' }]}>
				<StatusBar barStyle = 'light-content'/>
				{/*refresh arrow*/}
				<Animated.View style = {{
					zIndeX: 2,
					position: 'absolute',
					top: insets.top + 13,
					left: 0,
					right: 0,
					alignItems: 'center',
				opacity: scrollY.interpolate({
						inputRange: [-20, 0],
						outputRange: [1, 0]
					}),
					transform: [
						{
							rotate: scrollY.interpolate({
								inputRange: [-45, -35],
								outputRange: ['180deg', '0deg'],
								extrapolate: 'clamp'
							}),
						},
					],
				}}>	
					<Icon 
						name = 'arrow-down' 
						color = {'white'} 
						type = { Icons.Feather } 
						size = { 20 }/>	
				</Animated.View>
				{/* Name + tweet count*/}
				<Animated.View style = {{
					zIndex: 2,
					position: 'absolute',
					top: insets.top + 6,
					left: 0,
					right: 0,
					alignItems: 'center',
					opacity: scrollY.interpolate({
						inputRange: [90, 110],
						outputRange: [0, 1],
					}),
					transform: [{
						translateY: scrollY.interpolate({
							inputRange: [90, 120],
							outputRange: [30, 0],
							extrapolate: 'clamp',
						}),
					}]
				}}>
					<Text style = {[ styles.text, styles.username ]}>{userName}</Text>
					<Text style = {[ styles.text, styles.tweetsCount ]}>
						Profile
					</Text>
				</Animated.View>
				{/*banner*/}
				<AnimatedImageBackground
					source = {require('./mountain-header.jpg.webp')}
					style = {{
						position: 'absolute',
						left: 0,
						right: 0,
						height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
						transform: [{
							scale: scrollY.interpolate({
								inputRange: [-200, 0],
								outputRange: [5, 1],
								extrapolateLeft: 'extend',
								extrapolateRight: 'clamp'
							})
						}]
					}}>
					<AnimatedBlurView
						tint = 'dark'
						intensity = {96}
						style = {{
							...StyleSheet.absoluteFillObject,
							zIndex: 2,
							opacity: scrollY.interpolate({
								inputRange: [-50, 0, 50, 100],
								outputRange: [1, 0, 0, 1]
							})
						}}/>
				</AnimatedImageBackground>
				<Animated.ScrollView
					showsVerticalScrollIndicator = { false }
					onScroll = { Animated.event(
						[{
							nativeEvent: {
								contentOffset: { y: scrollY },
							}
						}],
						{ useNativeDriver: true }
					)}
					style = {{
						zIndex: 3,
						marginTop: HEADER_HEIGHT_NARROWED,
						paddingTop: HEADER_HEIGHT_EXPANDED
					}}>
					<View style = {[ styles.container, { backgroundColor: '#0f0d0d'}]}>
						<View style = {[ styles.container, { paddingHorizontal: 20 }]}>
							<Animated.Image
								source = {require('./seanpp.jpeg')}
								style = {{
									width: 75,
									height: 75,
									borderRadius: 40,
									borderWidth: 4,
									borderColor: 'black',
									marginTop: -30,
									transform: [{
										scale: scrollY.interpolate({
											inputRange: [0, HEADER_HEIGHT_EXPANDED],
											outputRange: [1, 0.6],
											extrapolate: 'clamp'
										}),
									},
									{
										translateY: scrollY.interpolate({
											inputRange: [0, HEADER_HEIGHT_EXPANDED],
											outputRange: [0, 16],
											extrapolate: 'clamp'
										})
									}
									]
								}}/>
									<Text style = {[ styles.text, {
										fontSize: 24,
										fontWeight: 'bold',
										marginTop: 10
									}]}> {userName}
									</Text>
									<Text style = {[ styles.text, {
										fontSize: 15,
										color: 'gray',
										marginBottom: 15,
										left: 10
									}]}>
										@{userHandle}
									</Text>
									<Text style = {[ styles.text, { marginBottom: 15, fontSize: 15 }]}>
										Bio -
									</Text>
								
									<View
										style = {{
											flexDirection: 'row',
											marginBottom: 15
										}}>
										<Text style = {[ styles.text, {
											fontWeight: 'bold',
											marginRight: 10
										}]}>
											69{' '}
										<Text style = {{
											color: 'gray',
											fontWeight: 'normal'
										}}>
											Following
										</Text>
										</Text>
										<Text style = {[ styles.text, { fontWeight: 'bold' }]}>
											420{' '}
										<Text style = {{
											color: 'gray',
											fontWeight: 'normal'
										}}>
											Followers
										</Text>
										</Text>
										<View style = {{ right: 10 }}>
											<View style = {{ left: 160 }}>
											<TouchableOpacity
												onPress = {() => {
													setShowModal(!showModal);
												}}>
												<Icon
													name = 'user-plus'
													color = {'white'}
													type = { Icons.Feather }
													size = { 20 }/>
											</TouchableOpacity>
											</View>
										</View>
										<View style = {{ left: 100 }}>
											<TouchableOpacity
												onPress = {() => {
													setShowModalFriends(!showModalFriends)
												}}>	
												<Icon
													name = 'users'
													color = {'white'}
													type = { Icons.Feather }
													size = { 20 }/>
											</TouchableOpacity>
										</View>
									</View>
								</View>
							
							<View style = {[ styles.container, { flexWrap: 'wrap' }]}>
								{ POSTS.map((item, index) => 
									(	
									<View key = { item.key } style = { styles.tweet }>
									
									<Image 
										source = {postArr[index].image}
										style = {{ resizeMode: 'center', width: 150, height: 180 }}/>
									<Image source = {require('./seanpp.jpeg')}
									style = {{
										height: 50,
										width: 50,
										left: 10,
										borderRadius: 25,
										marginRight: 27
									}}/>
								
								<View style = { styles.container }>
									<Text style = {[ styles.text, {
										fontWeight: 'bold',
										fontSize: 15
									}]}>
										{item.author}{' '}
										<Text style = {{
											color: 'gray',
											fontWeight: 'normal'
										}}>
											@{item.tag} - {index + 1}d
									</Text>
									</Text>
									<Text style = {[ styles.text, { fontSize: 15 }]}>
										{item.text}
									</Text>
								</View>							
								<View style = {{ 
									flexDirection: 'row', 
									width: 230,
									height: 30,
									position: 'absolute',
									left: 180,
									bottom: 10 }}>
									<TouchableOpacity
										onPress = {() => console.log('heart')}>
										<Icon 
											name = 'heart' 
											color = {'white'}
											type = { Icons.Feather }
											style = {{ marginRight: 5 }}/>
									</TouchableOpacity>
									<TouchableOpacity
										onPress = {() => console.log('messages')}>
										<Icon
											name = 'message-circle'
											color = {'white'}
											type = { Icons.Feather }
											style = {{ marginRight: 5 }}/>
									</TouchableOpacity>
									<TouchableOpacity
										onPress = {() => console.log('send')}>
										<Icon
											name = 'send'
											color = {'white'}
											type = { Icons.Feather }
											style = {{ marginRight: 5 }}/>
									</TouchableOpacity>
								
									<TouchableOpacity
										onPress = {() => console.log('globe')}>
										<Icon 
											name = 'globe'
											color = {'white'}
											type = { Icons.Feather }
											style = {{ left: 95 }}/>
									</TouchableOpacity>
								</View>			
								</View>	
								))}								
							</View>					
					</View>					
				</Animated.ScrollView>
			</View>
	</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	
},
text: {
color: 'white',
},
username: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: -3,
},
tweetsCount: {
fontSize: 13,
},
tweet: {
flexDirection: 'row',
paddingVertical: 10,
paddingHorizontal: 10,
borderTopWidth: StyleSheet.hairlineWidth,
borderTopColor: 'rgba(255, 255, 255, 0.25)',
},
})
