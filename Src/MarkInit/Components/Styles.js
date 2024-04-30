import { StyleSheet } from 'react-native';

GlobleStyles = StyleSheet.create({
	globalContainer: {
		flex: 1,
		backgroundColor: '#26D1A2'
	},
	userContainer: {
		top: 45,
		width: 200
	}
});

UserProfileStyles = StyleSheet.create({
	userProfileContainer: {
		flex: 1,
		backgroundColor: 'pink'
	},
	buttonContainer: {
		top: 40,
		width: 200
	}
});

UserSettingStyles = StyleSheet.create({
	settingContainer: {
		flex: 1,
		backgroundColor: 'red'
	}
})

export { GlobeStyles, UserProfileStyles }
