import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Background from '../../components/Background'
import { theme } from '../../core/theme'
import Header from '../../components/Header'

export default function Policy({ navigation }) {
  return (
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
        <Header
          label="Privacy Policy"
          icon={require('../../assets/setting.png')}
        />
      </View>
      <View style={styles.contain}>
        <Image
          source={require('../../assets/privacypolicy.png')}
          style={styles.image}
        />
        <Text style={styles.text}>
          Suscipit nullam porta suspendisse ut proin. A dolor hac leo fusce. Id
          tempor convallis sed tellus in adipiscing est. Porta risus tincidunt
          eget quam ac fames. Et lectus diam in faucibus id faucibus. Integer
          egestas nisl lobortis donec massa neque. In arcu ut orci consectetur
          vel diam molestie. Nec massa quis mollis nisi. Hendrerit cras leo nec
          at enim facilisi. Blandit imperdiet nibh elementum lectus. Tortor ut
          in dis magnis. Pharetra sed est elit est amet scelerisque. Porttitor
          posuere quisque pellentesque habitant felis porttitor accumsan. Nam
          eget nullam nam eu. Urna erat viverra quisque at. Nulla metus.
        </Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  contain: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 10,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  Davatar: {
    borderRadius: 0,
    backgroundColor: '#FFFFFF00',
    width: 20,
    height: 16,
    marginRight: 15,
  },
})
