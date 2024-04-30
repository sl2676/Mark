import {
	View,
	TouchableOpacity,
	StyleSheet,
	Text
} from 'react-native';

export const AppInitButton = props => {
	return (
		<TouchableOpacity onPress = { props.onPress }>
			<View style = {{ ...styles.button, ...props.style }}>
				<Text style = {{ ...styles.buttonText, ...props.textStyle }}>
					{ props.children }
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export const AppInitLogOut = props => {
	return (
		<TouchableOpacity onPress = { props.onPress }>
			<View style = {{ ...styles.logOutButton, ...props.style }}>
				<Text style = {{ ...styles.buttonText, ...props.textStyle }}>
					{ props.children }
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export const AppInitPitchButton = props => {
	return (
		<TouchableOpacity onPress = { props.children }>
			<View style = {{ ...styles.pitchButton, ...props.style }}>
				<Text style = {{ ...styles.pitchText, ...props.style }}>
					{ props.children }
				</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'white',
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 18,
		opacity: 0.7
	},
	buttonText: {
		color: 'black',
		fontSize: 18
	},
	pitchButton: {
		backgroundColor: 'black',
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 18
	},
	logOutText: {
		color: 'white',
		fontSize: 18	
	}
})
