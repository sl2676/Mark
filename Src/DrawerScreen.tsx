import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'


export default function DrawerScreen({ route, navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={ 'white' } />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#60c5a8',
  }
})
