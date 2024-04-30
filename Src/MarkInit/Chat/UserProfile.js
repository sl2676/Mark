import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
	useColorScheme
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//import { useSelector } from 'react-redux'

export const UserProfileScreen = ({ user }) => {

//	const user = useSelector(({}) => auth.user);
	
	const [ users, setUsers ] = React.useState([]);	
//	console.log(user.uid)
//	console.log('userstuff ^')
	
	const getUsers = async(user) => {
		const user_id = user.uid;
		try {
/*		const querySanp = await firestore().collection('users').where('uid','==', user.uid).get()
		const allUsers = querySanp.docs.map(docSnap=>docSnap.data())
		setUsers(allUsers)

		firestore.collection('users').where('uid', '==', user.uid).get()
		.then(documentSnapshot => {
			console.log('User exists: ', documentSnapshot.exists)
				if (documentSnapshot.exists) {
			console.log('User data: ', documentSnapshot.data())
		}
		})
*/
			
		console.log('User profile code')
		const querySanp = 
			await firestore()
				.collection('users')
				.where('uid', '==', user_id)
				.get()
				.then(documentSnapshot => {
					console.log('User info: ', documentSnapshot.id)
				})
		

		} catch(e) {
			console.log(e)
		}
	}	

	useEffect(() => {
		getUsers(user);
	}, [])
	
	return (
		<SafeAreaView>
			<ScrollView>
				<View style = { styles.card }>
					<View style={styles.textArea}>
						<Text style={styles.nameText} >{user.name}</Text>
						<Text style={styles.msgContent} >{user.email}</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  card: {
    width: '100%',
    height: 'auto',
    marginHorizontal: 4,
    marginVertical: 6,
    paddingTop: 100,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImageST: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }, 
  textArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    paddingLeft: 10,
    width: 200,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '900',
    fontFamily: 'Verdana'
  },
  msgTime: {
    textAlign: 'right',
    fontSize: 11,
    marginTop: -20,
  },
  msgContent: {
    paddingTop: 5,
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
