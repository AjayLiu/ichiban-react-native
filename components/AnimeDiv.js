import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Pressable,
  TouchableOpacity,
  Image
} from 'react-native';

export default function AnimeDiv({ obj, clickCallback, gameover }) {
  var numeral = require('numeral');
  var fanCount = numeral(obj.members).format("0.000a");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => clickCallback()} >
        {/* <Text>{obj.image_url}</Text> */}
        <Image style={styles.img} source={{uri: obj.image_url}}></Image>
        <Text style={styles.text}>{obj.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    // flex: 1,
    height: "40%",
    // borderWidth: 4,
    // borderColor: "green",
    // borderRadius: 6,
  },
  text:{
    color:"white",
    textAlign:'center',
    margin:10
  },
  img: {
    // height: 100,
    height: "80%"
  },
});
