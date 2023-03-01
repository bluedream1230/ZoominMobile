import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text, Avatar } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Header({ label, icon, ...props }) {
  return (
    <View style={styles.header}>
      <Image
        size={25}
        source={icon}
        style={styles.avatar}
        resizeMode="contain"
      />
      <Text style={styles.text}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 0,
    backgroundColor: '#FFFFFF00',
    width: 25,
    height: 25,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 10,
  },
  text: {
    paddingLeft: 20,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: '20px',
  },
})
