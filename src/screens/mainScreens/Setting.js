import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Background from '../../components/Background'
import { theme } from '../../core/theme'
import Header from '../../components/Header'

export default function Setting() {
  return (
    <Background type="main">
      <Header label="Settings" icon={require('../../assets/setting.png')} />
      <View style={styles.contain}>
        <MaterialCommunityIcons
          name="arrow-right"
          size={24}
          color={theme.colors.white}
        />
        <Text style={styles.text}>Zoomin Game</Text>
      </View>
      <View style={styles.contain}>
        <MaterialCommunityIcons
          name="arrow-right"
          size={24}
          color={theme.colors.white}
        />
        <Text style={styles.text}>How To Play</Text>
      </View>
      <View style={styles.contain}>
        <MaterialCommunityIcons
          name="arrow-right"
          size={24}
          color={theme.colors.white}
        />
        <Text style={styles.text}>Game Play</Text>
      </View>
      <View style={styles.contain}>
        <MaterialCommunityIcons
          name="arrow-right"
          size={24}
          color={theme.colors.white}
        />
        <Text style={styles.text}>Turn On Notification</Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  contain: {
    marginTop: 20,
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
