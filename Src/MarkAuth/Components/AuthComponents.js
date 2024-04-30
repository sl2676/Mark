import {
	View,
	Text,
	StyleSheet,
	Button,
	TouchableOpacity
} from 'react-native';

import { AuthCompStyles } from './Styles';

export const AppAuthButton = props => {
	return (
		<TouchableOpacity onPress = { props.onPress }>
			<View style = {{ ...AuthCompStyles.button, ...props.style }}>
				<Text style = {{ ...AuthCompStyles.buttonText, ...props.textStyle }}>
					{ props.children }
				</Text>
			</View>
		</TouchableOpacity>
	)
};

export const AppAuthRegisterButton = props => {
	return (
		<TouchableOpacity onPress = { props.onPress }>
			<View style = {{ ...AuthCompStyles.buttonReg, ...props.style }}>
				<Text style = {{ ...AuthCompStyles.buttonRegText, ...props.textStyle }}>
					{ props.children }
				</Text>
			</View>
		</TouchableOpacity>
	)
}

