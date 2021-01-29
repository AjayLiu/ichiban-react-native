import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

const Header = (props) => {
  return(
    <>
      <View style={styles.header}>
        {
          props.title && 
          <Text style={styles.text}>
            {props.title}
          </Text> 
        }
        {
          <Image style={styles.img} source={require('../public/imgs/logo.png')}>
          </Image>
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header:{
    alignItems:'center',
    height: 60,
    padding: 5,
    backgroundColor: "#23262f",
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center'
  },
  img: {
    width: 50,
    height: 50,
  }
})

export default Header;