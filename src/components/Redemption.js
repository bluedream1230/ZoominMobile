import React, { useState } from 'react'
// import { Image } from 'expo-image'
import { StyleSheet, View, Image } from 'react-native'
import { Text, Avatar, Button, Card } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { theme } from '../core/theme'

export default function Redemption({ item }) {
  console.log(item.createdAt.split('T')[0])
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 25,
        borderBottomColor: '#E6EBF2',
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Image
          source={{ uri: item.image_url }}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <View>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.date}>{item.createdAt.split('T')[0]}</Text>
        </View>
      </View>
      <View style={styles.coinval}>
        <Avatar.Image
          size={24}
          source={require('../assets/coin.png')}
          style={styles.avatar}
        />
        <Text style={styles.val}>{item.coinvalue}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  coinval: {
    display: 'flex',
    flexDirection: 'row',
  },
  val: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  date: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.white,
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.white,
  },
  avatar: {
    backgroundColor: '#FFFFFF00',
    marginRight: 3,
  },
})
