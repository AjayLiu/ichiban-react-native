import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Header from './components/Header'
import Game from './components/Game'

export default App = () => {
  return(
    <View style={styles.container}>
      <Header />
      <Game/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#252934",
    color:"white",

  }
})