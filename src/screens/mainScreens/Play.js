import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg'
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
          labelStyle={{ color: theme.colors.white, fontSize: 16 }}
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
          <StyleCard style={styles.preview}>
            <Header
              label="ex Roosevelt Field Mall"
              icon={require('../../assets/playground/flag.png')}
            />
            <Header
              label="630 Old Country Rd. Garden City. Ny 11530"
              icon={require('../../assets/playground/position.png')}
            />
            <Header
              label="Store Discount Upto 35%"
              icon={require('../../assets/playground/gift.png')}
            />
          </StyleCard>
          <StyleCard style={styles.preview}>
            <Header
              label="Vesuvio Playground"
              icon={require('../../assets/playground/flag.png')}
            />
            <Header
              label="101 Thompson St. New York. NY 1001"
              icon={require('../../assets/playground/position.png')}
            />
            <Header
              label="Store Discount Upto 30%"
              icon={require('../../assets/playground/gift.png')}
            />
          </StyleCard>
        </View>
      ) : status.value === 'playnow' ? (
        <View style={styles.playlink}>
          <StyleCard style={styles.playlink}>
            <View>
              <QRCode
                value="http://awesome.link.qr"
                logoBackgroundColor="transparent"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Header
                label="Sponsor : Chipotle"
                icon={require('../../assets/playground/sponsor.png')}
              />
              <Header
                label="Game : Basketball Shootout"
                icon={require('../../assets/playground/game.png')}
              />
              <Header
                label="Rewards : 50 coins"
                icon={require('../../assets/playground/reward.png')}
              />
              <Header
                label="Game Duration : 10 Minutes"
                icon={require('../../assets/playground/duration.png')}
              />
            </View>
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
  playlink: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  // event: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   width: '100%',
  // },
  // rewardcard: {
  //   width: '50%',
  // },
  // text1: {
  //   fontFamily: 'Inter',
  //   fontSize: 14,
  //   color: '#FFFFFF',
  //   fontWeight: '400',
  // },
  // text2: {
  //   fontFamily: 'Roboto',
  //   fontWeight: '500',
  //   fontSize: 27,
  //   lineHeight: 40,
  //   color: '#FFFFFF',
  // },
  // text3: {
  //   fontFamily: 'Inter',
  //   fontWeight: '300',
  //   fontSize: 12,
  //   lineHeight: 18,
  //   color: '#FFFFFF',
  // },
})
