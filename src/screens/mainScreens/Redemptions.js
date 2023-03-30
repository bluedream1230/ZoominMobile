import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-web'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Background from '../../components/Background'
import { theme } from '../../core/theme'
import Header from '../../components/Header'
import { store } from '../../store'
import Redemption from '../../components/Redemption'

export default function Redemptions({ navigation }) {
  const state = store.getState()
  const redemption = state.campaign.redemptions
  console.log(redemption)
  return (
    <Background type="main">
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Image
            size={25}
            source={require('../../assets/Drawer.png')}
            style={styles.Davatar}
            resizeMode="contain"
          />
        </Pressable>
        <Header
          label="Redemptions"
          icon={require('../../assets/redemption.png')}
        />
      </View>
      <ScrollView>
        <View style={styles.preview}>
          {redemption &&
            redemption.map((item, index) => {
              return <Redemption key={index} item={item} />
            })}
        </View>
      </ScrollView>
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
  Davatar: {
    borderRadius: 0,
    backgroundColor: '#FFFFFF00',
    width: 20,
    height: 16,
    marginRight: 15,
  },
})
