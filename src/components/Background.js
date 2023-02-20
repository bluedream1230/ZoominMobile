import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children, type = null }) {
  return (
    <ImageBackground
      source={require('../assets/main_background.png')}
      resizeMode="stretch"
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={type ? styles.mainContainer : styles.container}
        behavior="padding"
      >
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    // alignItems: 'center',
  },
})
