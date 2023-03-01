import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { Text } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg'
import Background from '../../components/Background'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { theme } from '../../core/theme'
import StyleCard from '../../components/StyledCard'
import { store } from '../../store'

export default function Play() {
  const state = store.getState()
  const [status, setStatus] = useState({ value: 'playground' })
  const allEvents = state.campaign.events
  const today = new Date()
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
        <ScrollView>
          <View style={styles.preview}>
            {allEvents &&
              allEvents
                .filter((item) => item.type === 'Playground')
                .map((item, index) => {
                  return (
                    <StyleCard style={styles.preview} key={index}>
                      <Header
                        label={item.name}
                        icon={require('../../assets/playground/flag.png')}
                      />
                      <Header
                        label={item.location}
                        icon={require('../../assets/playground/position.png')}
                      />
                      {item.rewards &&
                        item.rewards.map((reward, i) => {
                          return (
                            <Header
                              key={i}
                              label={reward.name}
                              icon={require('../../assets/playground/gift.png')}
                            />
                          )
                        })}
                    </StyleCard>
                  )
                })}
          </View>
        </ScrollView>
      ) : status.value === 'playnow' ? (
        <ScrollView>
          <View style={styles.playlink}>
            {allEvents &&
              allEvents
                .filter(
                  (item) =>
                    new Date(item.end_time).getTime() >= today.getTime() &&
                    today.getTime() >= new Date(item.start_time).getTime()
                )
                .map((item, index) => {
                  const sum = item.rewards
                    .map((reward) => {
                      return Number(reward.coinvalue)
                    })
                    .reduce((total, reward) => total + reward, 0)
                  const startDate = new Date(item.start_time)
                  const endDate = new Date(item.end_time)
                  const duration = Math.floor(
                    (endDate.getTime() - startDate.getTime()) / (1000 * 60)
                  )
                  return (
                    <StyleCard
                      style={styles.event}
                      style1={styles.sec}
                      key={index}
                    >
                      <View style={styles.qrcode_wrapper}>
                        <View style={[styles.qrcode_top, styles.qrcode_left]} />
                        <View
                          style={[styles.qrcode_top, styles.qrcode_right]}
                        />
                        <View
                          style={[styles.qrcode_bottom, styles.qrcode_left]}
                        />
                        <View
                          style={[styles.qrcode_bottom, styles.qrcode_right]}
                        />
                        <View
                          style={{
                            backgroundColor: theme.colors.white,
                            padding: 10,
                          }}
                        >
                          <QRCode
                            value={item.url}
                            logoBackgroundColor="transparent"
                            size={60}
                          />
                        </View>
                      </View>
                      <View style={{ marginTop: 10, alignItems: 'center' }}>
                        <View style={styles.textcontent}>
                          <Image
                            size={25}
                            source={require('../../assets/playground/sponsor.png')}
                            style={styles.avatar}
                            resizeMode="contain"
                          />
                          <Text style={styles.label}>Sponsor : </Text>
                          <Text style={styles.text1}>{item.sponsorname}</Text>
                        </View>
                        <View style={styles.textcontent}>
                          <Image
                            size={25}
                            source={require('../../assets/playground/game.png')}
                            style={styles.avatar}
                            resizeMode="contain"
                          />
                          <Text style={styles.label}>Game : </Text>
                          <Text style={styles.text1}>{item.game.name}</Text>
                        </View>
                        <View style={styles.textcontent}>
                          <Image
                            size={25}
                            source={require('../../assets/playground/reward.png')}
                            style={styles.avatar}
                            resizeMode="contain"
                          />
                          <Text style={styles.label}>Reward : </Text>
                          <Text style={styles.text1}>{sum}</Text>
                        </View>
                        <View style={styles.textcontent}>
                          <Image
                            size={25}
                            source={require('../../assets/playground/duration.png')}
                            style={styles.avatar}
                            resizeMode="contain"
                          />
                          <Text style={styles.label}>Game Duration : </Text>
                          <Text style={styles.text1}>{duration}</Text>
                        </View>
                      </View>
                    </StyleCard>
                  )
                })}
          </View>
        </ScrollView>
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
  playlink: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  event: {
    display: 'flex',
    alignItems: 'center',
    width: '98%',
  },
  sec: {
    width: '100%',
    alignItems: 'center',
  },
  qrcode_wrapper: {
    position: 'relative',
    padding: 10,
  },
  qrcode_bottom: {
    position: 'absolute',
    width: 15,
    height: 15,
    bottom: 0,
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.white,
  },
  qrcode_top: {
    position: 'absolute',
    width: 15,
    height: 15,
    top: 0,
    borderTopWidth: 3,
    borderTopColor: theme.colors.white,
  },
  qrcode_left: {
    left: 0,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.white,
  },
  qrcode_right: {
    right: 0,
    borderRightWidth: 3,
    borderRightColor: theme.colors.white,
  },
  avatar: {
    borderRadius: 0,
    backgroundColor: '#FFFFFF00',
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text1: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 23,
    color: theme.colors.white,
  },
  label: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 23,
    color: theme.colors.white,
    marginBottom: 10,
  },
  textcontent: {
    display: 'flex',
    flexDirection: 'row',
  },
})
