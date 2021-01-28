import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

export default function AnimeDiv({ obj, clickCallback, gameover }) {
  var numeral = require('numeral');
  var fanCount = numeral(obj.members).format("0.000a");

  return (
    <View>
      <View onClick={() => clickCallback()} >
        <Image className={styles.animeImg} source={{uri: obj.image_url}}></Image>
        <Text>{obj.title}</Text>
        {/* {obj.reveal && <Text className={styles.fanCount + ' ' + (gameover ? (obj.higher ? styles.higher : styles.lower) : styles.neutral)}>Fans: {fanCount}</p>} */}
      </View>
    </View>
  )
}
