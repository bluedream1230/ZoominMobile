import React, { useEffect, useState } from 'react'
import { Image, View, Button, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { Setting, Reward, Event, Play, Profile } from './mainScreens'

const Drawer = createDrawerNavigator()

function MyDrawer() {
  return (
    // <BlurView style={{ flex: 1 }} blurType="light" blurAmount={7}>
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#221343e6',
        borderColor: '#3A3A3A',
        borderWidth: 1,
        borderStyle: 'solid',
        width: 220,
      }}
      initialRouteName="Play"
    >
      <Drawer.Screen
        name="Play"
        component={Play}
        options={{
          drawerIcon: () => (
            <Image
              style={{ width: 24, height: 24 }}
              source={require('../assets/play.png')}
            />
          ),
          drawerLabel: () => (
            <Text
              style={{
                color: 'white',
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Playtime
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Event"
        component={Event}
        options={{
          drawerIcon: () => (
            <Image
              style={{ width: 24, height: 24 }}
              source={require('../assets/event.png')}
            />
          ),
          drawerLabel: () => (
            <Text
              style={{
                color: 'white',
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Events
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Reward"
        component={Reward}
        options={{
          drawerIcon: () => (
            <Image
              style={{ width: 24, height: 24 }}
              source={require('../assets/reward.png')}
            />
          ),
          drawerLabel: () => (
            <Text
              style={{
                color: 'white',
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Redeem
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          drawerIcon: () => (
            <Image
              style={{ width: 24, height: 24 }}
              source={require('../assets/setting.png')}
            />
          ),
          drawerLabel: () => (
            <Text
              style={{
                color: 'white',
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Setting
            </Text>
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: () => (
            <Image
              style={{ width: 22, height: 26 }}
              source={require('../assets/profile.png')}
            />
          ),
          drawerLabel: () => (
            <Text
              style={{
                color: 'white',
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: 20,
                lineHeight: 40,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Drawer.Navigator>
    // </BlurView>
  )
}

export default function Dashboard() {
  return <MyDrawer />
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  drawerItemLabel: {
    fontSize: 16,
    marginLeft: -16,
    fontWeight: 'bold',
  },
})
