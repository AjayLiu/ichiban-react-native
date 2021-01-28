import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const Header = ({title}) => {
  return(
    <View style={styles.header}>
      <Text style={styles.text}>
        {title}
      </Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue'
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center'
  }
})

export default Header;