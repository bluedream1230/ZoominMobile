import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Foundation } from '@expo/vector-icons'

import { Home, Setting, Reward, Event, Play } from './mainScreens'
import { theme } from '../core/theme'

const Tab = createBottomTabNavigator()

export default function Dashboard({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="home"
              size={24}
              color={theme.colors.link}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="cellphone-settings"
              size={24}
              color={theme.colors.link}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reward"
        component={Reward}
        options={{
          tabBarLabel: 'Reward',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="star-face"
              size={24}
              color={theme.colors.link}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={Event}
        options={{
          tabBarLabel: 'Event',
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={24}
              color={theme.colors.link}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Play"
        component={Play}
        options={{
          tabBarLabel: 'Play',
          tabBarIcon: () => (
            <Foundation name="dollar" size={24} color={theme.colors.link} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
