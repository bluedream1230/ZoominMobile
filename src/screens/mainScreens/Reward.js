import React, { useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native'
import { Text, Avatar, Modal } from 'react-native-paper'
// import Modal from 'react-native-modal'
import jwt_decode from 'jwt-decode'
import Background from '../../components/Background'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { theme } from '../../core/theme'
import StoreCard from '../../components/StoreCard'
import StyleCard from '../../components/StyledCard'
import { store } from '../../store'
import { getRedemptions } from '../../services/apis/server'
import { updateUserInfo } from '../../services/apis/user'

export default function Reward({ navigation }) {
  const state = store.getState()
  const user_info = state.auth.userInfo
  const shippingAddress = user_info.shipping
  console.log('shippingAddress', shippingAddress)
  const [status, setStatus] = useState({ value: 'store' })
  const [des, setDes] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmModalvisible, setConfirmModalVisible] = useState(false)
  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }
  const hideModal = () => {
    setModalVisible(false)
    setConfirmModalVisible(false)
  }

  const allRewards = state.campaign.rewards
  console.log('rewardsdssss', allRewards)

  const onRedeem = (val) => {
    setDes(val)
    toggleModal()
  }

  const onConfirm = async () => {
    setConfirmModalVisible(true)
    // TODO show redemptions
    // Update coin value
    const redemptions = await getRedemptions(user_info.id)
    const restcoin = Number(user_info.coins) - Number(des.coinvalue)
    console.log(restcoin)
    const data = await updateUserInfo({
      coins: Number(restcoin),
    })
    toggleModal()
  }

  const onRedemptions = () => {
    setConfirmModalVisible(false)
  }

  return (
    <>
      <Background type="main">
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image
              size={25}
              source={require('../../assets/Drawer.png')}
              style={styles.Davatar}
              resizeMode="contain"
            />
          </Pressable>
          <Header label="Redeem" icon={require('../../assets/reward.png')} />
        </View>
        <View style={styles.contain}>
          <Button
            labelStyle={{ color: theme.colors.white }}
            mode={status.value === 'store' ? 'contained' : 'outlined'}
            style={
              status.value === 'store' ? styles.selectedButton : styles.button
            }
            onPress={() => {
              setStatus({ value: 'store' })
            }}
          >
            Store
          </Button>
          <Button
            labelStyle={{ color: theme.colors.white }}
            mode={status.value === 'reward' ? 'contained' : 'outlined'}
            style={
              status.value === 'reward' ? styles.selectedButton : styles.button
            }
            onPress={() => setStatus({ value: 'reward' })}
          >
            Reward
          </Button>
        </View>
        {status.value === 'store' ? (
          <ScrollView>
            <View style={styles.preview}>
              {allRewards &&
                allRewards
                  .filter((item) => item.type === 'Coupon')
                  .map((item, index) => {
                    return (
                      <StoreCard
                        key={index}
                        label={item.category}
                        val={item.coinvalue}
                        url={item.image_url}
                        onClickRedeem={() => onRedeem(item)}
                      />
                    )
                  })}
            </View>
          </ScrollView>
        ) : status.value === 'reward' ? (
          <ScrollView>
            <View style={styles.preview1}>
              {allRewards &&
                allRewards
                  .filter((item) => item.type === 'Reward')
                  .map((item, index) => {
                    console.log('item', item)
                    return (
                      <StyleCard
                        key={index}
                        style={styles.rewardcard}
                        style1={styles.secstyle}
                      >
                        <Text style={styles.text1}>
                          {item.description.length < 40
                            ? `${item.description}`
                            : `${item.description.substring(0, 37)}...`}
                        </Text>
                        <Text style={styles.text2}>{item.name}</Text>
                        <Image
                          source={{ uri: item.image_url }}
                          style={{
                            width: '100%',
                            height: 50,
                            backgroundColor: 'transparent',
                          }}
                        />
                      </StyleCard>
                    )
                  })}
            </View>
          </ScrollView>
        ) : null}
      </Background>
      <Modal visible={modalVisible} onDismiss={hideModal}>
        <View style={styles.mainbackground}>
          <View style={styles.sec}>
            <Image
              source={require('../../assets/checkout.png')}
              style={styles.image}
            />
            {des ? (
              <View
                style={{
                  borderRadius: 16,
                  borderColor: '#FFFFFF4D',
                  borderWidth: 1,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{ uri: des.image_url }}
                  style={styles.modalimg}
                />
                <Text style={styles.category}>{des.category}</Text>
                <Image
                  size={30}
                  source={require('../../assets/line.png')}
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    width: 1,
                    height: 30,
                  }}
                />
                <View style={styles.coinval}>
                  <Avatar.Image
                    size={24}
                    source={require('../../assets/coin.png')}
                    style={styles.avatar}
                  />
                  <Text style={styles.val}>{des.coinvalue}</Text>
                </View>
              </View>
            ) : null}
            {shippingAddress ? (
              <>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: '400',
                      fontSize: 12,
                      lineHeight: 23,
                      color: '#FFFFFF',
                    }}
                  >
                    Your Balance
                  </Text>
                  <View style={styles.coinval}>
                    <Avatar.Image
                      size={15}
                      source={require('../../assets/coin.png')}
                      style={{
                        margin: 3,
                        backgroundColor: theme.colors.transparent,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'Inter',
                        lineHeight: 15,
                        fontSize: 12,
                        color: '#FFFFFF',
                        fontWeight: '400',
                      }}
                    >
                      {user_info.coins}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: '500',
                    fontSize: 24,
                    lineHeight: 28,
                    textAlign: 'center',
                    color: theme.colors.white,
                    marginVertical: 20,
                  }}
                >
                  Please Confirm if You Would Like to Redeem It?
                </Text>
                <View style={styles.contain}>
                  <Button
                    labelStyle={{ color: theme.colors.white }}
                    style={{ borderColor: theme.colors.white, width: '47%' }}
                    mode="outlined"
                    onPress={hideModal}
                  >
                    Cancel
                  </Button>
                  {des && Number(user_info.coins) > Number(des.coinvalue) ? (
                    <Button
                      labelStyle={{ color: theme.colors.buttonColor }}
                      mode="contained"
                      style={{
                        backgroundColor: theme.colors.white,
                        width: '47%',
                      }}
                      onPress={onConfirm}
                    >
                      Confirm
                    </Button>
                  ) : (
                    <Button
                      labelStyle={{ color: theme.colors.buttonColor }}
                      mode="contained"
                      disabled
                      style={{
                        backgroundColor: theme.colors.grey,
                        width: '47%',
                      }}
                      onPress={onConfirm}
                    >
                      Confirm
                    </Button>
                  )}
                </View>
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: '500',
                    fontSize: 24,
                    lineHeight: 28,
                    textAlign: 'center',
                    color: theme.colors.white,
                    marginVertical: 20,
                  }}
                >
                  Please Add the Shipping Address From the Setting.
                </Text>
                <View style={styles.contain}>
                  <Button
                    labelStyle={{ color: theme.colors.white }}
                    style={{ borderColor: theme.colors.white, width: '47%' }}
                    mode="outlined"
                    onPress={hideModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    labelStyle={{ color: theme.colors.buttonColor }}
                    mode="contained"
                    style={{
                      backgroundColor: theme.colors.white,
                      width: '47%',
                    }}
                    onPress={() => {
                      hideModal()
                      navigation.navigate('Profile')
                    }}
                  >
                    Profile
                  </Button>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      <Modal visible={confirmModalvisible} onDismiss={hideModal}>
        <View style={styles.mainbackground}>
          <View style={styles.sec}>
            <View style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                source={require('../../assets/confirm.png')}
                style={{ width: 80, height: 80 }}
              />
            </View>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontWeight: '500',
                fontSize: 24,
                lineHeight: 28,
                textAlign: 'center',
                color: theme.colors.white,
                marginTop: 30,
              }}
            >
              Your Order is Confirmed
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 16,
                textAlign: 'center',
                color: theme.colors.white,
                marginVertical: 15,
              }}
            >
              You will receiving a confirmation email with order detail
            </Text>
            <Button
              labelStyle={{ color: theme.colors.buttonColor }}
              mode="contained"
              style={{
                backgroundColor: theme.colors.white,
              }}
              onPress={onRedemptions}
            >
              View Redemptions
            </Button>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '47%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 16,
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.white,
    borderWidth: 2,
  },
  selectedButton: {
    width: '47%',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 16,
    backgroundColor: theme.colors.buttonColor,
    color: theme.colors.white,
    borderWidth: 2,
  },
  contain: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    paddingLeft: 10,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  preview: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  preview1: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  rewardcard: {
    width: '47%',
    padding: 5,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  stylecard: {
    width: '100%',
    padding: 5,
    marginVertical: 10,
  },
  secstyle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  text1: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
    minHeight: 60,
  },
  text2: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 27,
    lineHeight: 40,
    color: '#FFFFFF',
    minHeight: 40,
  },
  text3: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  Davatar: {
    borderRadius: 0,
    backgroundColor: '#FFFFFF00',
    width: 20,
    height: 16,
    marginRight: 15,
  },
  mainbackground: {
    margin: 20,
    backgroundColor: theme.colors.buttonColor,
    borderRadius: 16,
    minHeight: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3A3A3A',
    borderWidth: 2,
    padding: 5,
  },
  sec: {
    borderColor: theme.colors.white,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 25,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 40,
    margin: 5,
  },
  modalimg: {
    width: 65,
    height: 65,
    backgroundColor: '#221343',
    borderRadius: 16,
  },
  coinval: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  val: {
    fontFamily: 'Inter',
    lineHeight: 24,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  avatar: {
    backgroundColor: '#FFFFFF00',
    margin: 3,
  },
  category: {
    fontFamily: 'Inter',
    lineHeight: 24,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    // marginLeft: 15,
    // marginRight: 35,
  },
})
