import { View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { BlurView } from '@react-native-community/blur';
import { NavigationDrawerHeader } from '../NavigationDrawerHeader';
import Icon, { Icons } from '../Icons';

const Stack = createStackNavigator();

export const MarketScreen = ({ navigation }) => {
	return (
		<Stack.Navigator
			initialRouteName = 'UserMarket'>
			<Stack.Screen
				name = 'UserMarketScreen'
				component = { UserMarketScreen }
				options = {{
					title: 'Market Screen',
					headerTransparent: true,
					headerLeft: () => (
						<NavigationDrawerHeader navigationProps = { navigation }/>
					),
					headerBackground: () => (
						<BlurView
							tint = 'dark'
							intensity = { 100 }
							style = { StyleSheet.absoluteFill }/>
					),
					headerTitleStyle: {
						fontWeight: 'bold',
						color: 'white'
					}
				}}/>
		</Stack.Navigator>
	)
}

const UserMarketScreen = (props) => {
	return (
		<View style = { styles.marketContainer }>	
		</View>
	)
}

const styles = StyleSheet.create({
	marketContainer: {
		flex: 1,
		backgroundColor: 'purple'
	},
	backContainer: {
		marginVertical: 50,
		marginLeft: 30,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#f0f0f0'
	}
})
