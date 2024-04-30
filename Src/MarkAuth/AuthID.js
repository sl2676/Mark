import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	ActivityIndicator,
	Text,
	View,
	StyleSheet
} from 'react-native';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';

export const AuthID = ({ navigation }) => {
	
	//State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
	
	
	useEffect(() => {
		setTimeout(() => {
			setAnimating(false);
			// Check if currentUser is set or not
			// If not then send for Authentication
      		// else send to Home Screen
			navigation.replace(
			auth().currentUser ? "Init" : "Auth"
			);
		}, 1850);
  	}, []);
	//5000

	return (

 <SafeAreaView
      style={{ flex: 1, backgroundColor: '#2e7556'}}>
      <View style={styles.container}>
	<View style = {{ flex: 1, backgroundColor: '#2e7556' }}>
 	<LottieView
			source = { require('./assets/globe-load.json')}
			style = {{ aspectRatio: 1, width: 300, height: 300 }}
			autoPlay
			loop
		/>
	</View>
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
      </View>

      <Text
        style={{
          fontSize: 18,
          textAlign: "center",
          color: "white",
        }}
      >
        Establishing Connection
      </Text>

    </SafeAreaView>
	)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
