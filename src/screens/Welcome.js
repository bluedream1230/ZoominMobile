import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { Text } from 'react-native-paper'
import { Video } from 'expo-av'
import { theme } from '../core/theme'
import Background from '../components/Background'
import Button from '../components/Button'
import { setTopLevelNavigator, store } from '../store'
import { Linking } from 'expo'
import { GET_REWARDS } from '../store/actions'
import { createAttend, updateAttend } from '../services/apis/server'
import Api from '../services/api'

export default function Welcome({ navigation }) {
  useEffect(() => {
    setTopLevelNavigator(navigation)
  }, [])

  const dispatch = useDispatch()
  const video = React.useRef(null)
  const state = store.getState()
  const [status, setStatus] = React.useState({})
  const [play, setPlay] = React.useState(false)
  const allEvents = state.campaign.events
  const today = new Date()
  const params = new URLSearchParams(window.location.search)
  const eventid = params.get('event_id')
  // const eventid = 24
  // const play_flag = params.get('play_flag')
  const play_flag = true
  console.log('event_id : ', eventid)
  console.log(allEvents)
  const futureEvent = allEvents.filter(
    (item) => Number(item.id) === Number(eventid)
  )
  console.log('futureEvent:', futureEvent)
  const token = useSelector(() => state.auth)
  const decoded = jwt_decode(token.token)
  let duration = 0
  let video_url = ''
  let game_url = ''
  if (futureEvent.length > 0) {
    duration = Math.floor(
      (new Date(futureEvent[0].start_time).getTime() - today.getTime()) /
        (1000 * 60)
    )
    video_url = futureEvent[0].sponsor_video_url
    game_url = futureEvent[0].url
  }
  const onGameJoin = async () => {
    console.log(game_url)
    console.log('futureEvent', futureEvent[0].rewards)
    dispatch({ type: GET_REWARDS, rewards: futureEvent[0].rewards })
    // try {
    //   const attend = await createAttend({
    //     user_id: Number(decoded.id),
    //     event_id: Number(eventid),
    //     score: 0,
    //   })
    // } catch (e) {
    //   try {
    //     const attend = await updateAttend(
    //       {
    //         user_id: Number(decoded.id),
    //         event_id: Number(eventid),
    //         score: 0,
    //       },
    //       eventid,
    //       decoded.id
    //     )
    //   } catch (err) {
    //     console.log(err)
    //   }
    //   console.log(e)
    // }
    // const getPlayerlist = Api.post(
    //   'https://app.zoomingaming.com/api/Index.php/Player/get_players?event_id=' +
    //     eventid
    // )
    // console.log('getPlayerlist', getPlayerlist)
    navigation.navigate('Dashboard')
    // Linking.openURL({ game_url })
  }

  return (
    <Background>
      <Image source={require('../assets/welcome2.png')} style={styles.image} />
      <Text style={styles.username}>{decoded.name}</Text>
      <Text style={styles.ad}>Game Starts In {duration} minutes</Text>
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: video_url,
          }}
          shouldPlay
          useNativeControls
          resizeMode="contain"
          onPlaybackStatusUpdate={(s) =>
            setStatus(() => {
              if (!s.isPlaying && play) {
                if (!play_flag) {
                  // Linking.openURL(
                  //   'https://app.zoomingaming.com/login.html?event_id=' +
                  //     eventid
                  // )
                  setPlay(true)
                }
              } else {
                setTimeout(() => {
                  setPlay(true)
                }, 3000)
              }
            })
          }
        />
      </View>
      {/* <a href={game_url} style={{ textDecoration: 'none', width: '100%' }}> */}
      <Button mode="contained" style={{ marginTop: 16 }} onPress={onGameJoin}>
        Join Now
      </Button>
      {/* </a> */}
      <Text style={styles.footer}>Get warmed up while you wait!</Text>
    </Background>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 40,
    margin: 5,
  },
  username: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 40,
    color: theme.colors.white,
  },
  ad: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 40,
    color: theme.colors.white,
  },
  footer: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 40,
    color: theme.colors.white,
  },
  video: {
    width: 300,
    height: 300,
  },
})
