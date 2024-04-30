import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const FriendScreen = ({ navigation }) => {
	return (
		<Stack.Navigator
			initialRouteName = 'UserScreen'>
			<Stack.Screen name = 'UserScreen'
				component = { UserScreen }
				options = {{
					headerStyle: {
						height: 0.1
					},
					headerShown: false
				}}/>
		</Stack.Navigator>
	)
}

const UserScreen  = ({ navigation }) => {

	
	return (
		<View style = {{flex: 1, backgroundColor: 'blue'}}/>
	)
}
