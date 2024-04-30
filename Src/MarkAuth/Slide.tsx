import Color from "color"
import React, { useState } from "react"
import { View, Button, Text, Pressable, StyleSheet, Dimensions, Image } from "react-native"
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon, { Icons } from '../Icons';
import { AnimateLoadingButton } from 'react-native-animate-loading-button';
import { ThemedButton } from 'react-native-really-awesome-button'
import SpringButton from './SpringButton';

const { width, height } = Dimensions.get("screen")

const SIZE = width * 0.7
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

interface SlideProps {
	slide: {
		color: string;
		title: string;
		description: string;
		picture: ReturnType<typeof require>;
		titleColor: string;
		textColor: string;
		showLogin: boolean;
	}
}
/*
export const ExButton = () => {
	const [show, setShow] = useState(false);
	return (
	{ show ? ( <TouchableOpacity
			onPress = { () => console.log('YUPEWORK')}>
				<Text>EXBUTTON</Text>
		</TouchableOpacity> ) : 
		 <ExButtonInvis/>
		}
	)
}

export const ExButtonInvis = () => {
	return <View/>
}
*/
const Slide = ({ slide: { isHidden, showLogin, color, titleColor, title, textColor, description }, } :
		slideProps, props ) => {
	const lighterColor = Color(color).lighten(0.2).toString()
	const navigation = useNavigation();
	
		
	return (
		<>
			<Svg style={StyleSheet.absoluteFill}>
				<Defs>
					<RadialGradient id="gradient" cx="50%" cy="50%">
						<Stop offset="0%" stopColor={lighterColor} />
						<Stop offset="100%" stopColor={color} />
					</RadialGradient>
				</Defs>				
				<Rect
					x={0}
					y={0}
					width={width}
					height={height}
					fill="url(#gradient)"
				/>
			</Svg>
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text 
						style={[styles.title, { color: titleColor }]}>
							{title}
					</Text>
					<Text style={[styles.description, { color: textColor }]}>{description}</Text>
				</View>
				{
				isHidden ?
						( 
						<View style = {{ marginVertical: 10}}>
						<View style = {{ marginVertical: 20 }}>
						<ThemedButton
							name = 'bruce'
							type = 'secondary'>
							<Text style = {{ fontWeight: 'bold' }}>LOGIN</Text>
						</ThemedButton>	
						</View>					
						<ThemedButton
							name = 'bruce'
							type = 'secondary'>
							<Text style = {{ fontWeight: 'bold' }}>REGISTER</Text>
						</ThemedButton>
						</View>
						) : ( 
						<View style = {{ zIndex: 3, marginVertical: 10  }}>
						<View style = {{ marginVertical: 20 }}>
							<Pressable
								style = {[ styles.buttonContainer ]}
								onPress = { () => navigation.navigate('LoginScreen')}/>
						</View>
						<View>
						<Pressable
							style = {[ styles.buttonContainer, ]}
							onPress = { () => navigation.navigate('NameScreen')}/>
						</View>
					</View>)
				}
				{
					(
						<View>
						
						</View>
					)
				}							
			</View>
		</>
	)
}

export default Slide

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		// padding: 75,
		// paddingTop: 150,
		alignItems: "center",
		justifyContent: "center",
	},
	textContainer: {
		width: width * 0.7,
	},
	image: {
		width: SIZE,
		height: SIZE,
	},
	title: {
		fontSize: 55,
//		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 16,
		fontFamily: 'ArgentumSans-Black',
	},
	description: {
		fontSize: 18,
		letterSpacing: 0.5,
		lineHeight: 25,
		fontWeight: "bold",
		textAlign: "center",
		fontFamily: 'FredokaOne-Regular'
	},
	buttonContainer: {
		borderRadius: 16,
		width: 200,
		height: 60,
		alignItems: 'center',
		padding: 20,
	},
	buttonText: {
		fontWeight: 'bold'
	},
	navContainer: {
		flexDirection: 'row',
		marginVertical: 20,
		marginLeft: 320
	},
	imageContainer: {
		width: 25,
		height: 25,
	},
	
})
