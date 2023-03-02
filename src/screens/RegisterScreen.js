import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { signup } from '../services/apis/user'
import { confirmValidator } from '../helpers/confirmValidator'

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch()
  const [name, setName] = useState({ value: '', error: '' })
  const [lastname, setLastname] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirm, setConfirm] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const lastnameError = nameValidator(lastname.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const confirmError = confirmValidator(password.value, confirm.value)
    if (emailError || passwordError || nameError || lastname || confirmError) {
      setName({ ...name, error: nameError })
      setLastname({ ...lastname, error: lastnameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setConfirm({ ...confirm, error: confirmError })
    }
    onSignup()
  }

  const onSignup = async () => {
    try {
      const data = await signup({
        email: email.value,
        name: name.value,
        lastname: lastname.value,
        password: password.value,
        type: 'fan',
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
      <Image source={require('../assets/SignUp.png')} style={styles.image} />
      <TextInput
        label="Name*"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        icon={require('../assets/user-edit.png')}
      />
      <TextInput
        label="Last Name*"
        returnKeyType="next"
        value={lastname.value}
        onChangeText={(text) => setLastname({ value: text, error: '' })}
        error={!!lastname.error}
        errorText={lastname.error}
        icon={require('../assets/user.png')}
      />
      <TextInput
        label="Email*"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        icon={require('../assets/sms-tracking.png')}
      />
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
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text style={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.link,
  },
  image: {
    width: '100%',
    height: 40,
    margin: 5,
  },
})
