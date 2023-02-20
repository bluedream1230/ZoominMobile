import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { theme } from '../../core/theme'
import StyleCard from '../../components/StyledCard'

export default function Play() {
  const [status, setStatus] = useState({ value: 'playground' })
  return (
    <Background type="main">
      <Header label="Play Time" icon={require('../../assets/play.png')} />
      <View style={styles.contain}>
        <Button
          labelStyle={{ color: theme.colors.white }}
          mode={status.value === 'playground' ? 'contained' : 'outlined'}
          style={
            status.value === 'playground'
              ? styles.selectedButton
              : styles.button
          }
          onPress={() => {
            setStatus({ value: 'playground' })
          }}
        >
          Playgrounds
        </Button>
        <Button
          labelStyle={{ color: theme.colors.white }}
          mode={status.value === 'playnow' ? 'contained' : 'outlined'}
          style={
            status.value === 'playnow' ? styles.selectedButton : styles.button
          }
          onPress={() => setStatus({ value: 'playnow' })}
        >
          Play Now
        </Button>
      </View>

      {status.value === 'playground' ? (
        <View style={styles.preview}>
          <StyleCard>
            <Text style={styles.text1}>
              Happy ST.Patrick's Day Enjoy Free Drink On US!
            </Text>
            <Text style={styles.text2}>20% OFF</Text>
            <Text style={styles.text3}>On Extra Beverages*</Text>
          </StyleCard>
        </View>
      ) : status.value === 'playnow' ? (
        <View style={styles.rewardcard}>
          <StyleCard>
            <Text style={styles.text1}>
              Happy ST.Patrick's Day Enjoy Free Drink On US!
            </Text>
            <Text style={styles.text2}>20% OFF</Text>
            <Text style={styles.text3}>On Extra Beverages*</Text>
          </StyleCard>
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
  rewardcard: {
    width: '50%',
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
