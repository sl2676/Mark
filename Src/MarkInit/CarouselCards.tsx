import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated,  } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { I_WIDTH, I_HEIGHT, SLIDER_WIDTH,} from './CarouselCardItem'
import data from './data'
import Icon, { Icons } from '../Icons';
import {
	FlingGestureHandler,
	Directions,
	State,
} from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');
const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
	const inputRange = [-1, 0, 1];
	const translateY = scrollXAnimated.interpolate({
		inputRange,
		outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT]
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
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
			);
			})}
		</Animated.View>
	</View>
	)
}

const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const setActiveIndex = React.useCallback((activeIndex) => {
	scrollXIndex.setValue(activeIndex);
	setIndex(activeIndex);
  });

 
  React.useEffect(() => {
	if (index === data.length - VISIBLE_ITEMS - 1) {
		const newData = [...data, ...data];
		setData(newData);
	}
  });
  React.useEffect(() => {
	Animated.spring(scrollXAnimated, {
		toValue: scrollXIndex,
		useNativeDriver: true,
	}).start();
  });
  return (

    <View style = {{ left: 20, bottom: 10 }}>
	<OverflowItems data = {data} scrollXAnimated = {scrollXAnimated}/>
      <Carousel
		
        layout="stack"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
		sliderHeight = {SLIDER_WIDTH}
		itemHeight = { 500 }
        itemWidth={500}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
    </View>
	
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0f0d0d',
	height: 700
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
	color: 'white'
  },
  location: {
    fontSize: 16,
	color: 'white'
  },
  date: {
    fontSize: 12,
	color: 'white'
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
	right: 20
  },
});

export default CarouselCards
