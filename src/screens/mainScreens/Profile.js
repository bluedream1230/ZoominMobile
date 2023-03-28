import React, { useRef, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Avatar, Text, TextInput as Input } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import UserAvatar from 'react-native-user-avatar'
// import DatePicker from 'react-native-neat-date-picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

// Web supported mask
import { TextInputMask } from 'react-native-masked-text'
// Android supported mask expo @react-native-masked-view

import * as DocumentPicker from 'expo-document-picker'
// import DocumentPicker from 'react-native-document-picker'

import Background from '../../components/Background'
import Header from '../../components/Header'
import { theme } from '../../core/theme'
import StyledInput from '../../components/StyledInput'
import Button from '../../components/Button'
import { nameValidator } from '../../helpers/nameValidator'
import { emailValidator } from '../../helpers/emailValidator'
import { store } from '../../store'
import { updateUserInfo } from '../../services/apis/user'

export default function Profile({ navigation }) {
  const dispatch = useDispatch()
  const state = store.getState()
  const decoded = jwt_decode(state.auth.token)
  console.log(decoded)
  const [shippingAddress, setShippingAddress] = useState({
    value: '',
    error: '',
  })
  const [phoneNumber, setPhoneNumber] = useState({
    value: decoded.phone,
    error: '',
  })
  const [email, setEmail] = useState({
    value: decoded.email,
    error: '',
  })
  const [avatar, setAvatar] = useState()
  const [isVisible, setIsVisible] = useState(false)
  const [date, setDate] = useState()

  const openDatePickerSingle = () => {
    setIsVisible(true)
  }
  const onCancelSingle = () => {
    setIsVisible(false)
  }

  const onConfirmSingle = (output) => {
    setIsVisible(false)
    console.log(output)
    setDate(output.toISOString().split('T')[0])
    console.log(output)
  }

  const onSaveProfilePressed = () => {
    const shippingError = nameValidator(shippingAddress.value)
    const emailError = emailValidator(email.value)
    const phoneError = nameValidator(phoneNumber.value)
    if (emailError || shippingError || phoneError) {
      setShippingAddress({ ...shippingAddress, error: shippingError })
      setEmail({ ...email, error: emailError })
      setPhoneNumber({ ...phoneNumber, error: phoneError })
    }
    onSave()
  }

  const onSave = async () => {
    try {
      const data = await updateUserInfo(
        {
          email: email.value,
          birth: date,
          shipping: shippingAddress.value,
          phone: phoneNumber.value,
        },
        avatar
      )
      console.log('Data', data)
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'LoginScreen' }],
      // })
    } catch (e) {
      console.log({ e })
    }
  }

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' })
    setAvatar(result.file)
    console.log('result', result)
  }

  return (
    <Background type="main">
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Image
            size={25}
            source={require('../../assets/Drawer.png')}
            style={styles.Davatar}
            resizeMode="contain"
          />
        </Pressable>
        <Header label="Profile" icon={require('../../assets/profile.png')} />
      </View>
      <View style={styles.container}>
        {/* <Button onPress={pickDocument}>Select file</Button> */}
        <Pressable onPress={pickDocument}>
          <View style={{ width: 160, margin: 15 }}>
            <UserAvatar
              size={160}
              name={decoded.name + ' ' + decoded.lastname}
              src={decoded.logo}
              bgColor={theme.colors.grey}
            />
          </View>
        </Pressable>
        <Text
          style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 20,
            lineHeight: 24,
            textAlign: 'center',
            color: theme.colors.white,
          }}
        >
          {decoded.name} {decoded.lastname}
        </Text>
        <View style={{ margin: 10, display: 'flex', flexDirection: 'row' }}>
          <View style={styles.coinval}>
            <Avatar.Image
              size={24}
              source={require('../../assets/coin.png')}
              style={styles.avatar}
            />
            <Text style={styles.val}>20</Text>
          </View>
          <Image
            size={24}
            source={require('../../assets/line.png')}
            style={{ marginLeft: 20, marginRight: 20, width: 1 }}
          />
          <Header
            label="Edit Profile"
            icon={require('../../assets/edit.png')}
          />
        </View>
        <Pressable onPress={openDatePickerSingle} style={{ width: '100%' }}>
          <Input
            style={{
              backgroundColor: '#FFFFFF00',
              width: '100%',
            }}
            outlineColor={theme.colors.transparent}
            underlineColor="#FFFFFF33"
            mode="flat"
            theme={{ roundness: 20, colors: { text: '#FFF' } }}
            label={<Text style={{ color: '#FFF' }}>Date of Birth : </Text>}
            value={date}
            right={
              <Input.Icon
                icon={require('../../assets/calendar.png')}
                color="#FFF"
                onPress={openDatePickerSingle}
              />
            }
          />
        </Pressable>
        {isVisible && (
          <DateTimePickerModal
            isVisible={isVisible}
            mode="date"
            onConfirm={onConfirmSingle}
            onCancel={onCancelSingle}
          />
        )}
        <StyledInput
          label="Email Address : "
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          icon={require('../../assets/sms-tracking.png')}
        />
        <StyledInput
          label="Shipping Address : "
          returnKeyType="next"
          value={shippingAddress.value}
          onChangeText={(text) =>
            setShippingAddress({ value: text, error: '' })
          }
          error={!!shippingAddress.error}
          errorText={shippingAddress.error}
          icon={require('../../assets/user-edit.png')}
        />
        <StyledInput
          label="Phone number : "
          returnKeyType="next"
          value={phoneNumber.value}
          onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
          error={!!phoneNumber.error}
          errorText={phoneNumber.error}
          icon={require('../../assets/user-edit.png')}
          render={(props) => (
            <TextInputMask
              {...props}
              type={'custom'}
              options={{ mask: '999 999 9999' }}
            />
          )}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Button
            mode="contained"
            onPress={onSaveProfilePressed}
            style={{ marginTop: 24, width: '45%' }}
          >
            Save
          </Button>
          <Button
            mode="outlined"
            labelStyle={{ color: theme.colors.white }}
            style={{
              marginTop: 24,
              borderRadius: 16,
              backgroundColor: theme.colors.transparent,
              borderColor: theme.colors.white,
              borderWidth: 2,
              width: '45%',
            }}
          >
            Cancel
          </Button>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  Davatar: {
    borderRadius: 0,
    backgroundColor: '#FFFFFF00',
    width: 20,
    height: 16,
    marginRight: 15,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  coinval: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  val: {
    fontFamily: 'Inter',
    lineHeight: 24,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  avatar: {
    backgroundColor: '#FFFFFF00',
    margin: 3,
  },
})
