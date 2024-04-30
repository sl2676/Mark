import React, { useEffect, useRef, useState } from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'

type Props = React.ComponentProps<typeof TextInput> & {
  label: string
  errorText?: string | null
}

export const TextField: React.FC<Props> = (props) => {
  const {
    label,
    errorText,
    value,
    style,
    onBlur,
    onFocus,
    ...restOfProps
  } = props
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef<TextInput>(null)
  const focusAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start()
  }, [focusAnim, isFocused, value])

  let color = isFocused ? '#080F9C' : '#B9C4CA'
  if (errorText) {
    color = '#B00020'
  }

  return (
    <View style={style}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: 'white',
          },
        ]}
        ref={inputRef}
        {...restOfProps}
        value={value}
        onBlur={(event) => {
          setIsFocused(false)
          onBlur?.(event)
        }}
        onFocus={(event) => {
          setIsFocused(true)
          onFocus?.(event)
        }}
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, -12],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: 'white',
              },
            ]}
          >
            {label}
            {errorText ? '*' : ''}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
	padding: 20,
    borderWidth: 1,
    borderRadius: 8,
	justifyContent: 'center',
	alignItems: 'center',
    fontFamily: 'Avenir-Medium',
    fontSize: 24,
	color: 'white'
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 4,
    backgroundColor: '#0f0d0d',
	justifyContent: 'center',
	alignItems: 'center',
  },
  label: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 16,
 	color: 'white'
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
})


