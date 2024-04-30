import MapboxGL, { Camera, FillExtrusionLayer, UserLocation } from '@rnmapbox/maps';
import React, {useRef, useState, Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

//MapboxGL.setAccessToken('pk.eyJ1Ijoic2VhbjExMDEiLCJhIjoiY2xia2JuZjFyMWRtNTNwbzM0a3J3YXV6ZCJ9.v1IAgNHjgaj6-CaFmb0vpg');
//const styleUrl = 'mapbox://styles/sean1101/clipx7aa8000u01qieiidctr6';

MapboxGL.setAccessToken('pk.eyJ1Ijoic2VhbjExMDEiLCJhIjoiY2xia2JuZjFyMWRtNTNwbzM0a3J3YXV6ZCJ9.v1IAgNHjgaj6-CaFmb0vpg');
const styleUrl = 'mapbox://styles/sean1101/clipx7aa8000u01qieiidctr6/draft';



export const UserScreen = () => {

		
	const [ userLat, setUserLat ] = useState(0);
	const [ userLong, setUserLong ] = useState(0);

	return (	
	<View style = {{ flex: 1 }}>		
			
		<MapboxGL.MapView
			ref = {(c) => this._map = c }			
			style = {{ flex: 1 }}	
			styleURL = { styleUrl }
			logoEnabled = { false }
			rotateEnabled = { true }		
			surfaceView = { false }			
			setTelemetryEnabled = {false}
			attributionEnabled = { false }>
				<Camera
					animationMode = {'flyTo'}
					centerCoordinate = {[userLong, userLat]}
					pitch = { 60 }
					zoomLevel = { 16 }			
				/>
				<UserLocation 
					visible = {true}
					onUpdate = {(userLoc) => {
						console.log(userLoc)
						console.log(userLoc.coords.latitude);
						console.log(userLoc.coords.longitude);
						setUserLat(userLoc.coords.latitude);
						setUserLong(userLoc.coords.longitude);
					}}/>
		</MapboxGL.MapView>	
		</View>
	)
}
