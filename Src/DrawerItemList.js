import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from './Icons'
import { StyleSheet } from 'react-native';

export const DrawerItem = ({ label, onPress, tabBarTestID, type, name, notification,
  activeItemColor, color, styles }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID={tabBarTestID}
      accessibilityRole="button"
      style={[styles.drawerItem, { backgroundColor: activeItemColor }]}
    >
      <View style={styles.row}>
        <Icon type={type} name={name} {...{ color }} />
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export const DrawerItemList = ({ state, descriptors, navigation, styles }) => {
  return (
    <View style={styles.view}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }
        {/* console.log(options) */ }

        const drawerItem = options.item;
        const color = isFocused ? '#123' : '#999999';
        const activeItemColor = isFocused ? '#60c5a8' : null;

        return (
          <DrawerItem key={index} label={drawerItem.label}
            tabBarTestID={options.tabBarTestID}
            onPress={onPress}
            name={drawerItem.icon}
            type={drawerItem.type}
            
            color={color}
            activeItemColor={activeItemColor}
            styles={styles}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	view: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
		marginHorizontal: 8
	},
	marginTop: {
		marginTop: 16
	},
	marginBottom: {
		marginBottom: 8
	},
	marginVertical: {
		marginVertical: 8
	},
	label: {
		fontSize: 16,
		color: '#123',
		paddingHorizontal: 16
	},
	headerTitle: {
		fontSize: 24,
		color: '#123'
	},
	seperator: {
		width: '100%',
		height: 1,
		backgroundColor: '#999999',
		marginVertical: 8
	},
	drawerItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
		justifyContent: 'space-between',
		borderRadius: 10
	},
	headerTitle: {
		fontSize: 24,
		color: '#123'
	},
	profile: {
		marginVertical: 8,
		marginRight: 16,
		marginLeft: 8,
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#f0f0f0'
	},
	text: {
		fontWeight: 'bold',
		fontSize: 15
	},
	iconContainer: {
		padding: 6.6,
		borderRadius: 10,
		margin: 8,
		backgroundColor: '#60c5a8'
	}
})
