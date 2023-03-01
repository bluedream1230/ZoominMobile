import React, { useState } from 'react'
import { Image, StyleSheet, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Text } from 'react-native-paper'
import QRCode from 'react-native-qrcode-svg'
import jwt_decode from 'jwt-decode'
// import base64 from 'react-native-base64'
// import { Buffer } from 'buffer'
import Background from '../../components/Background'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { theme } from '../../core/theme'
import StyleCard from '../../components/StyledCard'
import { store } from '../../store'

export default function Event() {
  const state = store.getState()
  const [status, setStatus] = useState({ value: 'myevent' })
  const allEvents = state.campaign.events
  const allAttend = state.campaign.attends
  const token = useSelector(() => state.auth)
  const decoded = jwt_decode(token.token)
  const today = new Date()

  return (
    <Background type="main">
      <Header label="Events" icon={require('../../assets/event.png')} />
      <ScrollView>
        <View style={styles.contain}>
          <Button
            labelStyle={{ color: theme.colors.white }}
            mode={status.value === 'myevent' ? 'contained' : 'outlined'}
            style={
              status.value === 'myevent' ? styles.selectedButton : styles.button
            }
            onPress={() => {
              setStatus({ value: 'myevent' })
            }}
          >
            My Events
          </Button>
          <Button
            labelStyle={{ color: theme.colors.white, fontSize: 13 }}
            mode={status.value === 'future' ? 'contained' : 'outlined'}
            style={
              status.value === 'future' ? styles.selectedButton : styles.button
            }
            onPress={() => setStatus({ value: 'future' })}
          >
            Future Events
          </Button>
        </View>

        {status.value === 'myevent' ? (
          <View style={styles.event}>
            {allAttend &&
              allAttend
                .filter((item) => item.fan.id === decoded.id)
                .map((item, index) => {
                  const sum = item.event.rewards
                    .map((reward) => {
                      return Number(reward.coinvalue)
                    })
                    .reduce((total, reward) => total + reward, 0)
                  const startDate = new Date(item.event.start_time)
                  const endDate = new Date(item.event.end_time)
                  return (
                    <StyleCard
                      style={styles.event}
                      key={index}
                      style1={styles.sec}
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
                      <View style={styles.textcontent}>
                        <Text style={styles.label}>Event Name : </Text>
                        <Text style={styles.text1}>{item.event.name}</Text>
                      </View>
                      <Text style={styles.label}>Event Schedule:</Text>
                      <View style={styles.textcontent}>
                        <Text style={styles.label}>From : </Text>
                        <Text style={styles.text1}>
                          {`${startDate.getDate()}` +
                            '/' +
                            `${startDate.getMonth() + 1}` +
                            '/' +
                            `${startDate.getFullYear()}`}
                        </Text>
                      </View>
                      <View style={styles.textcontent}>
                        <Text style={styles.label}>To : </Text>
                        <Text style={styles.text1}>
                          {`${endDate.getDate()}` +
                            '/' +
                            `${endDate.getMonth() + 1}` +
                            '/' +
                            `${endDate.getFullYear()}`}
                        </Text>
                      </View>
                      <View style={styles.textcontent}>
                        <Text style={styles.label}>Location : </Text>
                        <Text style={styles.text1}>{item.event.location}</Text>
                      </View>
                      <View style={styles.textcontent}>
                        <Text style={styles.label}>Rewards : </Text>
                        <Text style={styles.text1}>{sum}</Text>
                      </View>
                    </StyleCard>
                  )
                })}
          </View>
        ) : status.value === 'future' ? (
          <View style={styles.event}>
            {allEvents &&
              allEvents
                .filter(
                  (item) =>
                    new Date(item.start_time).getTime() >= today.getTime()
                )
                .map((item, index) => {
                  const startDate = new Date(item.start_time)
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
                      <View style={styles.textcontent}>
                        <Text style={styles.label}>Event name : </Text>
                        <Text style={styles.text1}>{item.name}</Text>
                      </View>
                      <View style={styles.textcontent}>
                        <Text style={styles.label}>Date : </Text>
                        <Text style={styles.text1}>
                          {`${startDate.getDate()}` +
                            '/' +
                            `${startDate.getMonth() + 1}` +
                            '/' +
                            `${startDate.getFullYear()}`}
                        </Text>
                      </View>
                      <View style={styles.textcontent}>
                        <Text style={styles.label}>Location : </Text>
                        <Text style={styles.text1}>{item.location}</Text>
                      </View>
                    </StyleCard>
                  )
                })}
          </View>
        ) : null}
      </ScrollView>
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
  event: {
    display: 'flex',
    alignItems: 'center',
    width: '98%',
  },
  sec: {
    width: '100%',
    alignItems: 'center',
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
})
