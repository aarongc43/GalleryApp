import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const LoadingScreen = ({navigation}) => {
  const [transitioned, setTransitioned] = useState(false);

  useEffect(() => {
    if (!transitioned) {
      setTimeout(() => {
        navigation.navigate('HomeScreen');
        setTransitioned(true); // Set the state to indicate that the transition has occurred
      }, 2000); // 2 seconds delay
    }
  }, [navigation, transitioned]);

  return !transitioned ? (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          backgroundColor: 'white',
          height: 800,
          padding: 20,
        }}>
        <Image
          style={styles.Logo}
          source={require('../assets/fonts/melliflu.png')}
        />
        <Text style={styles.txt_title}>MELLIFLOO</Text>
      </View>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  Logo: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 200,
  },
  txt_title: {
    width: 350,
    height: 150,
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'ACaslonPro-BoldItalic',
  },
});

export default LoadingScreen;
