import React from 'react'
// import { Image } from 'expo-image'
import { StyleSheet, View, Image } from 'react-native'
import { Text, Avatar, Button, Card } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { theme } from '../core/theme'

export default function StoreCard({ label, url, val }) {
  return (
    <View style={styles.main}>
      <View style={styles.cardheader}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.coinval}>
          <Avatar.Image
            size={24}
            source={require('../assets/coin.png')}
            style={styles.avatar}
          />
          <Text style={styles.val}>{val}</Text>
        </View>
      </View>
      <View style={styles.mainbackground}>
        <Image source={{ uri: url }} style={styles.storeAvatar} />
      </View>
      <Button style={styles.storebutton} labelStyle={styles.text}>
        Redeem Now
        <Image
          source={require('../assets/arrowright.png')}
          style={{ width: 14, height: 14 }}
        />
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: '50%',
    padding: 5,
    marginVertical: 10,
  },
  avatar: {
    backgroundColor: '#FFFFFF00',
  },
  cardheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  coinval: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    width: 100,
    minHeight: 40,
  },
  val: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  storeAvatar: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.transparent,
  },
  mainbackground: {
    backgroundColor: theme.colors.cardBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
    borderColor: '#3A3A3A',
    borderWidth: 2,
  },
  storebutton: {
    backgroundColor: theme.colors.buttonColor,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    borderColor: '#3A3A3A',
    borderWidth: 2,
  },
  text: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    color: theme.colors.white,
  },
})
