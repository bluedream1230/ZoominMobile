import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text, Avatar, Button } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { theme } from '../core/theme'

export default function StyleCard({ children, style, style1 }) {
  return (
    <View style={[styles.main, style]}>
      <View style={[styles.sec, style1]}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 5,
    marginVertical: 10,
    marginRight: 10,
    borderColor: '#3A3A3A',
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: '#221343',
  },
  sec: {
    borderColor: '#04B4DD',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 15,
  },
})
