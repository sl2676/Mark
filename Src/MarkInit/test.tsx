firestore().collection('relation').doc(userID).get()
				.then((snap) => {
				if (snap.exists) {
					firestore().collection('relation').doc(userID).update({
						ownRequest
					})
					firestore().collection('relation').doc(userFriendID).get()
					.then((friendSnap) => {
						if (friendSnap.exists) {
							firestore().collection('relation').doc(userFriendID).update({
								friendRequest
							})
							console.log('update and set if exist')
						} else {
							firestore().collection('relation').doc(userFriendID).set({
								friendRequest
							})
						}
					})
				} else {
					firestore().collection('relation').doc(userID).set({
						ownRequest
					})
					firestore().collection('relation').doc(userFriendID).get().then((friendSnap) => {
						if (friendSnap.exists) {
							firestore().collection('relation').doc(userFriendID).update({
								friendRequest
							})
						} else {
							firestore().collection('relation').doc(userFriendID).set({
								friendRequest
							})
						}
					})
				}	
			})

                <DropDownPicker
 63                     style = {{ width: 250, paddingLeft: 10 }}
 64                     containerStyle = {{ flex: 1 }}
 65                     open={open}
 66                     value={value}
 67                     items={items}
 68                     setOpen={setOpen}
 69                     setValue={setValue}
 70                     setItems={setItems}
 71                     theme = "DARK"
 72                 />
 73             </View>
 74             {value === 'friends' ? (
 75                 <View style = {{ flex: 1 }}>
 76                     <FriendScreen/>
 77                 </View>
 78                 ) : value === 'friendRequest' ? (
 79                 <View style = {{ flex: 1 }}>
 80                     <RequestScreen
 81                         onPress = {onPress}/>
 82                 </View>
 83                 ) : value === 'outgoing' ? (
 84                     <View style = {{ flex: 1 }}>
 85                         <OutgoingScreen/>
 86                     </View>
 87                 ) : null }
 88         </View>

