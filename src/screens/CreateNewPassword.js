import React, { useState } from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'
import Background from '../components/Background'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { passwordValidator } from '../helpers/passwordValidator'

export default function CreateNewPassword({ navigation }) {
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmpass, setConfirmpass] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const passwordError = passwordValidator(password.value)
    const confirmpasswordError = passwordValidator(confirmpass.value)
    if (passwordError || confirmpasswordError) {
      setPassword({ ...password, error: passwordError })
      setConfirmpass({ ...confirmpass, error: confirmpasswordError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <Image
        source={require('../assets/createnewpass.png')}
        style={styles.image}
      />
      <Text style={styles.description}>
        Your new password must be different from previous used passwords.
      </Text>
      <TextInput
        label="Password*"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        icon={require('../assets/lock.png')}
      />
      <TextInput
        label="Confirm Password*"
        returnKeyType="done"
        value={confirmpass.value}
        onChangeText={(text) => setConfirmpass({ value: text, error: '' })}
        error={!!confirmpass.error}
        errorText={confirmpass.error}
        secureTextEntry
        icon={require('../assets/lock.png')}
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Reset Password
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  description: {
    height: 70,
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    lineHeight: 24,
    color: '#FFF',
  },

  image: {
    width: '100%',
    height: 40,
    margin: 5,
  },
})
