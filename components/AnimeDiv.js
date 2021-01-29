import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';

export default function AnimeDiv({ obj, clickCallback, gameover }) {
  var numeral = require('numeral');
  var fanCount = numeral(obj.members).format("0.000a");

  return (
    <View>
      <TouchableOpacity onPress={() => clickCallback()} >
        {/* <Text>{obj.image_url}</Text> */}
        <Image style={styles.img} source={{uri: obj.image_url}}></Image>
        <Text>{obj.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  img: {
    width: 66,
    height: 58,
  },
});
