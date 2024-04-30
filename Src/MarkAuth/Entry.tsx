import React, { useState, createContext } from "react"
import { Text } from 'react-native';
import Slider from "./Slider"
import Slide from "./Slide"

const slides = [
	{
		color: "#5b49fe",
		title: "Mark",
		titleColor: 'black',
		textColor: 'black',
		description:
			"Find friends, new and old",
		isHidden: false
	},
	{
		color: "#331cfe",
		title: "Explore",
		textColor: 'white',
		titleColor: 'white',
		description:
			"Login or register",
		isHidden: true
	},

]

export const assets = slides.map(({ picture }) => picture)

export function HomeScreen({ navigation }): JSX.Element {
	const [index, setIndex] = useState(1)
	const prev = slides[index - 1]
	const next = slides[index + 1]
	return (
		<Slider
			key={index}
			index={index}
			setIndex={setIndex}
			prev={prev && <Slide slide={prev} />}
			next={next && <Slide slide={next} />}>
			<Slide 
				slide={slides[index]!}
				navigation = {navigation}>
			
			</Slide>
		</Slider>
	)
}


