import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ImageBackground,
	StyleSheet,
	Alert,
} from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList
} from '@react-navigation/drawer';
import { Auth } from '../App';
import { NativeBaseProvider, Avatar } from 'native-base';
import auth from '@react-native-firebase/auth';


export const CustomDrawer = (props ) => {
	const [ user, setUser ] = React.useState();

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged((user) => {
//			console.log('user', JSON.stringify(user));
			setUser(user);
		});
		return subscriber;
	}, []);
						
	return (
		<View style = {{ flex: 1, backgroundColor: 'black'}}>
			<View style = {{ height: 130  }}>					
			<NativeBaseProvider> 
				<ImageBackground
					source = {require('./Assets/menu-bg.jpeg')}
					style = {{ padding: 20 }}>
						<Avatar
							bg = 'lightBlue.300'
							source = {{
							//	uri: 'https://bit.ly/broken-link'
							}}
							style = {{ left: -8, top: -5, width: 55, height: 55 }}>
						</Avatar>
					{ user ? (
					<Text style = {{
						color: '#fff',
						fontSize: 17,
						marginBottom: 6
					}}>
						{ user.displayName
							? user.displayName
							: user.email }
					</Text>
					) : null }
					<View style = {{
						flexDirection: 'row'}}>
						<Text style = {{
							color: 'white',
							marginRight: 5,
							fontSize: 10							
						}}>
							NAES Tokens: 280
						</Text>
					</View>
					</ImageBackground>
					</NativeBaseProvider>
					</View>
					<View style = {{
						flex: 1,
						paddingTop: 10,
						
						backgroundcolor: 'green',
					}}>
					<DrawerContentScrollView
						{...props}	
						contentContainerStyle = {{ backgroundColor: 'black' }}>	
					<DrawerItemList 			
					{...props}
					contentContainerStyle = {{ backgroundColor: 'red'}}
					/>
					</DrawerContentScrollView>
				</View>
				
			<View style = {{
				padding: 20,
				borderTopWidth: 1,
				borderTopColor: '#ccc'
			}}>
				<TouchableOpacity
					onPress = {() =>{}}
					style = {{paddingVertical: 15}}>
					<View style = {{
						flexDirection: 'row',
						alignItems: 'center'	
					}}>
						<Text style = {{
							fontSize: 15,
							marginLeft: 5,
						
						}}>
							Tell a Friend
						</Text>
					</View>
			
				</TouchableOpacity>
				<TouchableOpacity
					onPress = {()=> {
						Alert.alert(
							'Logout',
							'Are you sure? You want to logout?',
						[
							{
								text: 'Cancel',
								onPress: () => {
									return null;
								},
							},
							{
								text: 'Confirm',
								onPress: () => {
									auth()
										.signOut()
										.then(() => props.navigation.replace('Auth'))
										.catch((error) => {
											console.log(error);
											if (error.code === 'auth/no-current-user')
												props.navigation.replace('Auth');
											else alert(error);
										});
								},
							},
						],
						{ cancelable: false },
						);
					}}
					style = {{ paddingVertical: 15 }}>	
					<View style = {{
						flexDirection: 'row',
						alignItems: 'center'
					}}>
						<Text style = {{
							fontSize: 15,
							marginLeft: 5,
							color: 'white'
						}}>
						Sign Out
						</Text>
					</View>
				</TouchableOpacity>
				</View>
			
		</View>
	)
}
const styles = StyleSheet.create({
	profileHeaderPicCircle: {
		width: 60,
		height: 60,
		borderRadius: 60 / 2,
		color: 'white',
		backgroundColor: '#ffffff',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center'
	}
})

