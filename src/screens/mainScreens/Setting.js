import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import { theme } from '../../core/theme'

export default function Setting() {
  console.log('Setting')
  return (
    <Background>
      <Image
        source={require('../../assets/welcome2.png')}
        style={styles.image}
      />
      <Text style={styles.username}>Setting</Text>
    </Background>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 40,
    margin: 5,
  },
  username: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 40,
    color: theme.colors.white,
  },
})
