import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { PersistGate } from 'redux-persist/integration/react';
import { HomeScreen } from './Src/MarkAuth/Entry';
//import { LoginScreen } from './Src/MarkAuth/Login';
import { RegisterScreen } from './Src/MarkAuth/Register';
import { Init } from './Src/UserStack';
import { AuthID } from './Src/MarkAuth/AuthID';
import { PhoneScreen } from './Src/MarkAuth/RegisterPages/PhoneScreen';
import { NameScreen } from './Src/MarkAuth/RegisterPages/NameScreen';
import { DisplayNameScreen } from './Src/MarkAuth/RegisterPages/DisplayNameScreen';
import { PasswordScreen } from './Src/MarkAuth/RegisterPages/PasswordScreen';
import { AgeScreen } from './Src/MarkAuth/RegisterPages/PasswordScreen';
import { TestScreen } from './Src/MarkAuth/RegisterPages/TestScreen';
import { FriendScreen } from './Src/MarkInit/FriendScreen';
import { LoginScreen } from './Src/MarkAuth/LoginScreen';
import { Provider } from 'react-redux';
import { Store, Persistor } from './Src/Flux/store';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Auth = () => {
	return (
		<Stack.Navigator 
			initialRouteName = 'LoginHomeScreen'>
			<Stack.Screen
				name = 'LoginHomeScreen'
				component = { HomeScreen }
				options = {{ headerShown: false }}/>	
			<Stack.Screen
				name = 'LoginScreen'
				component = { LoginScreen }
				options = {{ headerShown: false }}/>			
			<Stack.Screen
				name = 'RegisterScreen'
				component = { RegisterScreen}
				options = {{ headerShown: false }}/>
			<Stack.Screen
				name = 'NameScreen'
				component = { NameScreen }
				options = {{ headerShown: false }}/>
			<Stack.Screen
				name = 'PhoneScreen'
				component = { PhoneScreen }
				options = {{ headerShown: false }}/>
			<Stack.Screen
				name = 'DisplayNameScreen'
				component = { DisplayNameScreen }
				options = {{ headerShown: false }}/>
			<Stack.Screen
				name = 'PasswordScreen'
				component = { PasswordScreen }
				options = {{ headerShown: false }}/>
			<Stack.Screen
				name = 'TestScreen'
				component = { TestScreen }
				options = {{ headerShown: false }}/>
		</Stack.Navigator>
	)

}


const Mark = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>	
				<Stack.Screen
					name = 'AutID'
					component = { AuthID }
					options = {{
						headerShown: false}}/>
				<Stack.Screen
					name = 'Auth'
					component = { Auth }
					options = {{ headerShown: false }}/>
				<Stack.Screen
					name = 'Init'
					component = { Init }
					options = {{ headerShown: false }}/>
				<Stack.Screen
					name = 'FriendScreen'
					component = { FriendScreen }
					/>				
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const App = () => {
	return (
		<Provider store = { Store }>
			<PersistGate loading = {null} persistor = {Persistor}>
			<Mark/>
			</PersistGate>
		</Provider>
	)
}

export default App
