import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image
} from "react-native";

const images = [
    {id:1, img:require("./post1.jpeg"), title:"Beautiful Coral Reef", color:"#33ccff"},
    {id:2, img:require("./post2.jpeg"), title:"Beautiful Sea Wave", color:"brown"},
  
    {id:3, img:require("./post3.jpeg"), title:"Ice Galcier Mystery", color:"#33ccff"},
    {id:4, img:require("./post1.jpeg"), title:"Wonderful Jelly fish Group",color:"#33ccff"},
  
    {id:5, img:require("./post2.jpeg"), title:"Fresh Sea Water", color:"#33ccff"},
    {id:6, img:require("./post3.jpeg"), title:"Sea the Universe", color:"brown"},

]

export const PostScreen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;

    let { width: windowWidth, height:windowHeight } = useWindowDimensions();
    windowHeight=windowHeight-300;

    return (
      <SafeAreaView style={styles.container}>

            <View style={styles.textAreaContainer}>

                {images.map((image, imageIndex)=>{

                    const inputRange=[
                        windowWidth*(imageIndex-1),
                        windowWidth*(imageIndex),
                        windowWidth*(imageIndex+1),
                    ];
                return(
                <Animated.Text style={[styles.textView, {transform:[
                    {translateY:scrollX.interpolate({
                        inputRange,
                        outputRange:[-500, -50, 0],
                    })}
                ]},{
                    opacity:scrollX.interpolate({
                        inputRange,
                        outputRange:[0, 1, 0]
                    })
                }, {
                    color:image.color
                }]}>
                    {image.title}
                </Animated.Text>
                );
                })}

            </View>
            <View style={[styles.scrollContainer, {height:windowHeight} ]}>
          <ScrollView
            horizontal={true}
            style={styles.scrollViewStyle}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false}
                )}
            scrollEventThrottle={16}
          >
            {images.map((image, imageIndex) => {
              return (
                <Animated.View
                  style={{ width: windowWidth,}}
                  key={imageIndex}
                >
                  <Image  source={image.img} style={styles.card} />
                    
                </Animated.View>
              );
            })}
          </ScrollView>

        </View>
        <View style={styles.indicatorContainer}>

            {
                images.map((image, imageIndex)=>{
                    const width=scrollX.interpolate({
                        inputRange:[
                            windowWidth*(imageIndex-1),
                            windowWidth*(imageIndex),
                            windowWidth*(imageIndex+1),
                        ],
                        outputRange:[8, 16, 8],
                        extrapolate:"clamp",
                    })

                    return(
                        <Animated.View style={[styles.normalDots, {width}, {backgroundColor:image.color}]}/>

                       
                    );
                })
            }

        </View>




      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      height: 600,
      alignItems: "center",
      justifyContent: "center"
    },
    scrollContainer: {
        shadowColor:"#6A6C6E",
        shadowOffset:{
            width:10,
            height:-10,
        },
        shadowOpacity:1,
    },
    card: {
      height: 750,
      marginVertical: 10,
      width:510,
      overflow: "hidden",
      alignSelf:"center",
      
    },
    indicatorContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    normalDots:{
        width:8,
        height:8,
        borderRadius:4,
      
        marginHorizontal:4,
    },
    textAreaContainer:{
        width:"100%",
        marginBottom:10,
    },
    textView:{
        
        fontSize:22,
        fontFamily:"Avenir",
        fontWeight:"600",
        textAlign:"center",
        width:"100%"
    }


  });
