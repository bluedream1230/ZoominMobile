import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Game, Setting } from './mainScreens'

const Tab = createBottomTabNavigator()

export default function Dashboard({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Game" component={Game} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  )
}
