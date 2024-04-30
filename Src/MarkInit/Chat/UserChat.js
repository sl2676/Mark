import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
	TouchableOpacity,
	Text,
	FlatList,
	Button,
	View,
	useColorScheme
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native-virtualized-view';
import UserConvScreen from './UserConv';

import firestore from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();

export const UserChatScreen = ({ user, navigation }) => {
   const [users, setUsers] = useState(null)
 //   const [messages, setMessages] = useState([]);
// console.log(user.uid)
//
   const user_id = user.uid;  
   const getUsers = async()=> {
	try {   const querySanp = 
				await firestore()
					.collection('users')
					.where('uid','!=',user_id)
					.get()
					.then(querySnapshot => {
						querySnapshot.forEach(documentSnapshot => {
							console.log('User ID: ', documentSnapshot.id, documentSnapshot.data())
						})
					})
		} catch(e) {
			console.log('UserChat error -')
			console.error(e);
	} 
}

 useEffect(()=>{
   getUsers()
 },[])

 
 
   return (
     <SafeAreaView >
       <StatusBar />
        <ScrollView>
         <View style={styles.Contain}>
             <FlatList
                 data={users}
                 keyExtractor={(item)=>item.uid}
                 renderItem={({item}) => (

                     <View style={styles.card} >
                         <View style={styles.textArea}>
                         <Text style={styles.nameText} >{item.name}</Text>
                         <Text style={styles.msgTime}>{item.messageTime}</Text>
                         <Text style={styles.msgContent} >{item.email}</Text>
                        </View>
                     </View>
                    
                 )}
                 />
         </View>
       </ScrollView>
     </SafeAreaView>
	)}

 const styles = StyleSheet.create({
     Contain: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
     },
   Container: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   card: {
     width: '100%',
     height: 'auto',
     marginHorizontal: 4,
     marginVertical: 6,
     flexDirection: 'row',
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
     width: 300,
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
