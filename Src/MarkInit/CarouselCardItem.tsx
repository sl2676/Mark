import * as React from 'react'
import { TouchableOpacity, Animated, View, Text, StyleSheet, Dimensions, Image } from "react-native"
import Icon, { Icons } from '../Icons';

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const { width } = Dimensions.get('screen');

export const I_WIDTH = width * 0.76;
export const I_HEIGHT = I_WIDTH * 1.7;

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  {item.location}
                </Text>
				<TouchableOpacity
					style = {{ right: 90, position: 'absolute'}}>
				<Icon name = 'globe'
					color = {'green'}
					type = { Icons.Feather }
					size = { 20 }
					/>
				</TouchableOpacity>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const CarouselCardItem = ({ item, index }) => {
  return (
    <View 
		style={styles.container} 
		key={index}
		onLayout={(event) => {
			const layout = event.nativeEvent.layout;
			console.log('x: ' + layout.x)
		}}>
    <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
      />      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
//    backgroundColor: 'white',
    borderRadius: 14,
    width: I_WIDTH,
    paddingBottom: 40,
    elevation: 7,
	left: 30
  },
  image: {
    width: I_WIDTH,
    height: I_HEIGHT,
	borderRadius: 14
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  text: {
	fontSize: 20,
	color: 'white'
  }
})


export default CarouselCardItem

