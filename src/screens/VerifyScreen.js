import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'

import verifystyle, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from '../helpers/verifystyle'
import Background from '../components/Background'

const { Value, Text: AnimatedText } = Animated

const CELL_COUNT = 6

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0))
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1))
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start()
}

const VerifyScreen = ({ route, navigation }) => {
  const [value, setValue] = useState('')
  const { verifynumber, email } = route.params
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol)
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    }

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused })
    }, 0)

    return (
      <AnimatedText
        key={index}
        style={[verifystyle.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    )
  }

  useEffect(() => {
    if (Number(value) === verifynumber) {
      navigation.navigate('CreateNewPassword', { useremail: email })
    }
  }, [value])

  return (
    <Background>
      <Image
        source={require('../assets/verifynumber.png')}
        style={styles.image}
      />
      <Text style={styles.description}>
        Please enter the 6-digit number you received via email.
      </Text>

      <SafeAreaView style={verifystyle.root}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={verifystyle.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
      </SafeAreaView>
    </Background>
  )
}

export default VerifyScreen

const styles = StyleSheet.create({
  description: {
    height: 70,
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    lineHeight: 24,
    color: '#FFF',
  },
  image: {
    width: '100%',
    height: 40,
    margin: 5,
  },
})
