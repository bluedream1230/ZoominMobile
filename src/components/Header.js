import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Avatar } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header({ label, icon, ...props }) {
  return (
    <View style={styles.header}>
      <Avatar.Image size={23} source={icon} style={styles.avatar} />
      <Text style={styles.text}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#FFFFFF00',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 10,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '500',
  },
})
