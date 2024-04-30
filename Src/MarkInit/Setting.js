import React from 'react';
import {
	View,
	Text,
	SafeAreaView
} from 'react-native';

export const Setting = () => {
	return (
		<SafeAreaView style = {{ flex: 1}}>
			<View style = {{ flex: 1, padding: 16 }}>
				<View style = {{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center'
				}}>
					<Text style = {{
						fontSize: 20,
						textAlign: 'center',
						marginBottom: 16
					}}>
						User Stuff
						{'\n\n'}
						Suppose to be Settings Screen
					</Text>
			</View>
				<Text style = {{
					fontSize: 18,
					textAlign: 'center',
					color: 'grey'
				}}>
					Check which screen{'\n'}React Native
				</Text>
				<Text
					style = {{
						fontSize: 16,
						textAlign: 'center',
						color: 'grey'
					}}>
						sean.inc lol
				</Text>
			</View>
		</SafeAreaView>
	)
};

export default Setting;
