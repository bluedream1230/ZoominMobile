import React from 'react'
import 'react-native-gesture-handler'
// import { Provider } from 'react-native-paper'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { PersistGate } from 'redux-persist/integration/react'
import { theme } from './src/core/theme'
import {
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  CreateNewPassword,
  Dashboard,
  VerifyScreen,
  Welcome,
} from './src/screens'
import { persistor, store } from './src/store'
import { useFonts } from 'expo-font'

const Stack = createStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require('./src/assets/Inter.woff'),
  })
  return (
    <Provider theme={theme} store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
            <Stack.Screen
              name="CreateNewPassword"
              component={CreateNewPassword}
            />
            <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
            <Stack.Screen name="Welcome" component={Welcome} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
