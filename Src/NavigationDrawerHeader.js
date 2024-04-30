import React from 'react';
import {
	View,
	Image,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

export const NavigationDrawerHeader = (props) => {
	const toggleDrawer = () => {
		props.navigationProps.toggleDrawer();
	};
	return (
		<View style = { styles.navContainer }>
			<TouchableOpacity onPress = { toggleDrawer }>
				<Image source = {{
					uri:
					'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
				}}
				style = { styles.imageContainer }/>
			</TouchableOpacity>
		</View>
	)
};


const styles = StyleSheet.create({
	navContainer: {
		flexDirection: 'row',
	},
	imageContainer: {
		width: 25,
		height: 25,
		marginLeft: 5
	}
})
