import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [birth, setBirth] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    // const birthError = nameValidator(birth.value)
    const emailError = emailValidator(email.value)
    const usernameError = nameValidator(username.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError || usernameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setUsername({ ...username, error: usernameError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
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
        label="Date of Birth*"
        returnKeyType="next"
        value={birth.value}
        onChangeText={(text) => setBirth({ value: text, error: '' })}
        error={!!birth.error}
        errorText={birth.error}
        icon={require('../assets/calendar.png')}
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
        label="User Name*"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
        icon={require('../assets/user.png')}
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
