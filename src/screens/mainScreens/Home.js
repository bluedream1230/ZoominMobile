import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { Text } from 'react-native-paper'
import { Video } from 'expo-av'
import { theme } from '../../core/theme'
import Background from '../../components/Background'
import Button from '../../components/Button'
import { store } from '../../store'

export default function Home({ navigation }) {
  const video = React.useRef(null)
  const state = store.getState()
  const [status, setStatus] = React.useState({})
  const allEvents = state.campaign.events
  const today = new Date()
  console.log(allEvents)
  const futureEvent = allEvents
    .filter((item) => new Date(item.start_time).getTime() >= today.getTime())
    .sort((p1, p2) =>
      p1.start_time < p2.start_time ? 1 : p1.price > p2.price ? -1 : 0
    )
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
  return (
    <Background>
      <Image
        source={require('../../assets/welcome2.png')}
        style={styles.image}
      />
      <Text style={styles.username}>{decoded.name}</Text>
      <Text style={styles.ad}>Game Starts In {duration} minutes</Text>
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: video_url,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(s) => setStatus(() => s)}
        />
      </View>
      <Button mode="contained" style={{ marginTop: 16 }}>
        Join Now
      </Button>
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
