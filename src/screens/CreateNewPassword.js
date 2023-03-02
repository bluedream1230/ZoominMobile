import React, { useState } from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'
import Background from '../components/Background'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { passwordValidator } from '../helpers/passwordValidator'
import { confirmValidator } from '../helpers/confirmValidator'
import { updatePass } from '../services/apis/user'

export default function CreateNewPassword({ route, navigation }) {
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirm, setConfirm] = useState({ value: '', error: '' })
  const { useremail } = route.params
  const sendResetPasswordEmail = () => {
    const passwordError = passwordValidator(password.value)
    const confirmError = confirmValidator(password.value, confirm.value)
    if (passwordError || confirmError) {
      setPassword({ ...password, error: passwordError })
      setConfirm({ ...confirm, error: confirmError })
      return
    }
    onUpdate()
  }

  const onUpdate = async () => {
    try {
      const data = await updatePass({
        email: useremail,
        password: password.value,
      })
      console.log('Data', data)
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      })
    } catch (e) {
      console.log({ e })
    }
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
        value={confirm.value}
        onChangeText={(text) => setConfirm({ value: text, error: '' })}
        error={!!confirm.error}
        errorText={confirm.error}
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
