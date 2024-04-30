import React from "react"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { Vector } from "react-native-redash"
import { Dimensions } from "react-native"
import Icon, { Icons } from '../Icons';
import { Side } from "./Wave"

const { width } = Dimensions.get("screen")
const RADIUS = 25

interface ButtonProps {
	position: Vector<Animated.SharedValue<number>>
	side: Side
	activeSide: Animated.SharedValue<Side>
}

function Button({ position, side, activeSide }: ButtonProps): JSX.Element {
	const isLeft = side === Side.LEFT
	const style = useAnimatedStyle(() => ({
		position: "absolute",
		left: isLeft ? position.x.value - RADIUS * 2 : width - position.x.value,
		top: position.y.value - RADIUS,
		//borderWidth: 1,
		//borderColor: "white",
		borderRadius: RADIUS,
		width: RADIUS * 2,
		height: RADIUS * 2,
		justifyContent: "center",
		alignItems: "center",
		opacity: withTiming(activeSide.value === Side.NONE ? 1 : 0),
	}))
	return (
		<Animated.View style={style}>
			<Icon 
				name = 'chevron-left' 
				color = {'black'} 
				type = { Icons.Feather } 
				size = {25}/>
		</Animated.View>
	)
}

export default Button
