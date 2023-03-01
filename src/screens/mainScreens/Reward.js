import React, { useState } from 'react'
import { Dimensions, StyleSheet, View, Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { theme } from '../../core/theme'
import StoreCard from '../../components/StoreCard'
import StyleCard from '../../components/StyledCard'
import { store } from '../../store'

export default function Reward() {
  const state = store.getState()
  const [status, setStatus] = useState({ value: 'store' })
  const allRewards = state.campaign.rewards
  return (
    <Background type="main">
      <Header label="Redeem" icon={require('../../assets/reward.png')} />
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
                  />
                )
              })}
        </View>
      ) : status.value === 'reward' ? (
        <View style={styles.preview1}>
          {allRewards &&
            allRewards
              .filter((item) => item.type === 'Reward')
              .map((item, index) => {
                return (
                  <StyleCard
                    key={index}
                    style={styles.rewardcard}
                    style1={styles.secstyle}
                  >
                    <Text style={styles.text1}>{item.description}</Text>
                    <Text style={styles.text2}>{item.name}</Text>
                    <Image
                      source={{ uri: item.image_url }}
                      style={{
                        width: '100%',
                        height: 14,
                        backgroundColor: 'transparent',
                      }}
                    />
                  </StyleCard>
                )
              })}
        </View>
      ) : null}
    </Background>
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
    justifyContent: 'space-around',
  },
  rewardcard: {
    width: '47%',
    padding: 5,
    marginVertical: 10,
  },
  stylecard: {
    width: '50%',
    padding: 5,
    marginVertical: 10,
  },
  secstyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  text1: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  text2: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 27,
    lineHeight: 40,
    color: '#FFFFFF',
  },
  text3: {
    fontFamily: 'Inter',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 18,
    color: '#FFFFFF',
  },
})
