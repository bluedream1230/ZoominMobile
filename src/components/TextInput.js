import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'

export default function TextInput({
  errorText,
  description,
  label,
  icon = null,
  ...props
}) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.white}
        outlineColor={theme.colors.white}
        // activeOutlineColor={theme.colors.white}
        underlineColor="transparent"
        mode="outlined"
        theme={{ roundness: 20, colors: { text: '#FFF' } }}
        label={<Text style={{ color: '#FFF' }}>{label}</Text>}
        right={icon ? <Input.Icon icon={icon} color="#FFF" /> : <></>}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#FFFFFF00',
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})
