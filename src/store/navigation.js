import { useState } from 'react'

let _navigator = null

export const setTopLevelNavigator = (navRef) => {
  _navigator = navRef
}

export const getTopLevelNavigator = () => {
  return _navigator
}

let _drawerNavigator = null

export const setDrawerNavigator = (navRef) => {
  _drawerNavigator = navRef
}

export const getDrawerNavigator = () => {
  return _drawerNavigator
}
