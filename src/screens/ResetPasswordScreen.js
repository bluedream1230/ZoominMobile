import React, { useState } from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'
import Background from '../components/Background'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { useremailValidator } from '../helpers/useremailValidator'
import { resetPassword } from '../services/apis/user'

export default function ResetPasswordScreen({ route, navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const { useremail } = route.params

  const sendEmailRequest = () => {
    const emailError = emailValidator(email.value)
    const useremailError = useremailValidator(email.value, useremail)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    if (useremailError) {
      setEmail({ ...email, error: useremailError })
      return
    }
    onReset()
  }

  const onReset = async () => {
    try {
      const data = await resetPassword({
        email: email.value,
      })
      navigation.navigate('VerifyScreen', {
        verifynumber: data.verifynumber,
        email: email.value,
      })
    } catch (e) {
      console.log({ e })
    }
  }

  return (
    <Background>
      <Image
        source={require('../assets/recoverPassword.png')}
        style={styles.image}
      />
      <Text style={styles.description}>
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password.
      </Text>
      <TextInput
        label="Your Email*"
        returnKeyType="done"
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
      <Button
        mode="contained"
        onPress={sendEmailRequest}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
      <View style={styles.row}>
        <Text style={styles.text}>Back to </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
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
