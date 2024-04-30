import { StyleSheet } from 'react-native';
import { deviceHeight, deviceWidth } from '../../Utils/Dimensions';
const EntryStyles = StyleSheet.create({
	slideContainer: {
		flex: 1
	},
	slide: {
		padding: 35,
		height: 100,
		flex: 1,
		left: -50
	}, 
	slide_vs: {
		backgroundColor: '#3F37C9',
		width: deviceWidth + 50
	},
	textStyle: {
		fontSize: 18,
		color: 'white'
	},
	loginText: {
		fontWeight: 'bold',
		color: 'black',
		fontSize: 24,
		position: 'absolute',
		top: 200
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		left: 35,
		top: 240
	},
	loginButtonContainer: {
		flex: 4,
		alignItems: 'center'
	},
	signUpButtonContainer: {
		flex: 22,
		alignItems: 'center'
	}
});

const LoginStyles = StyleSheet.create({
	mainBody: {
    	flex: 1,
    	justifyContent: "center",
    	backgroundColor: "#2e7556",
		alignContent: "center",
    },
	sectionStyle: {
    	flexDirection: "row",
    	height: 40,
    	marginTop: 20,
    	marginLeft: 35,
    	marginRight: 35,
		margin: 10,
    },
	buttonStyle: {
    	backgroundColor: "#7DE24E",
    	borderWidth: 0,
    	color: "#FFFFFF",
    	borderColor: "#7DE24E",
    	height: 40,
    	alignItems: "center",
    	borderRadius: 30,
    	marginLeft: 35,
    	marginRight: 35,
    	marginTop: 20,
		marginBottom: 25,
    },
	buttonTextStyle: {
    	color: "#FFFFFF",
    	paddingVertical: 10,
		fontSize: 16,
    },
	inputStyle: {
    	flex: 1,
    	color: "white",
    	paddingLeft: 15,
    	paddingRight: 15,
    	borderWidth: 1,
    	borderRadius: 30,
		borderColor: "#dadae8",
    },
	registerTextStyle: {
    	color: "#FFFFFF",
    	textAlign: "center",
    	fontWeight: "bold",
    	fontSize: 14,
    	alignSelf: "center",
    	padding: 10,
    },
	errorTextStyle: {
		color: "red",
    	textAlign: "center",
    	fontSize: 14,
	},
});

const RegisterStyles = StyleSheet.create({
	sectionStyle: {
		flexDirection: "row",
    	height: 40,
    	marginTop: 20,
    	marginLeft: 35,
    	marginRight: 35,
    	margin: 10,
    },
	buttonStyle: {
    	backgroundColor: "#7DE24E",
    	borderWidth: 0,
    	color: "#FFFFFF",
    	borderColor: "#7DE24E",
    	height: 40,
    	alignItems: "center",
    	borderRadius: 30,
    	marginLeft: 35,
    	marginRight: 35,
    	marginTop: 20,
    	marginBottom: 20,
	},
    buttonTextStyle: {
    	color: "#FFFFFF",
    	paddingVertical: 10,
    	fontSize: 16,
    },
    inputStyle: {
    	flex: 1,
    	color: "black",
    	paddingLeft: 15,
    	paddingRight: 15,
    	borderWidth: 1,
    	borderRadius: 30,
    	borderColor: "#dadae8",
    },
    errorTextStyle: {
    	color: "red",
    	textAlign: "center",
    	fontSize: 14,
    },
	loginTextStyle: {
         color: "black",
         textAlign: "center",
         fontWeight: "bold",
         fontSize: 14,
         alignSelf: "center",
         padding: 10,
    },	
});

const AuthCompStyles = StyleSheet.create({
	button: {
		backgroundColor: 'white',
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 18
	},
	buttonText: {
		color: 'black',
		fontSize: 18
	},
	buttonReg: {
		backgroundColor: 'white',
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 18,
		borderWidth: 2,
		borderColor: 'black',
		width: 250
	},
	buttonRegText: {
		color: 'black',
		fontSize: 18
	}
});

export { EntryStyles, AuthCompStyles, LoginStyles, RegisterStyles }
