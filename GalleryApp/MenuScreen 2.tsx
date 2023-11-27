import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function MenuScreen({navigation}) {

  const [selectedScreen, setSelectedScreen] = useState('Home');

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#a9a9a9',
      height: 800,
      padding: 20,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    Mellifloo_button: {
      marginLeft: 140,
      marginTop: -15,
      marginBottom: -20,
      height: 25,
      width: 90,
      fontFamily: 'ACaslonPro-Bold',
      fontSize: 20,
      textAlign: 'center',
      color: 'black',
    },
    Close_txt: {
      marginLeft: 300,
      marginTop: -15,
      height: 30,
      width: 52,
      fontFamily: 'ACaslonPro-Bold',
      fontSize: 20,
      textAlign: 'right',
      color: 'black',
    },
    horizontalLine: {
      marginBottom: 10,
      width: 350,
      borderBottomColor: '#D9D9D9',
      borderBottomWidth: 1,
    },
    Menu_list: {
      marginTop: -5,
      marginBottom: -2,
      fontFamily: 'ACaslonPro-Bold',
      fontSize: 20,
      color: '#7E7E7E',
    },
  });

  const handleScreenSelect = (screenName) => {
    setSelectedScreen(screenName);
    navigation.navigate(screenName);
  };

  const handleClosePress = () => {
    navigation.navigate(selectedScreen);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => handleScreenSelect('Home')}>
              <Text style={styles.Mellifloo_button}>Mellifloo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClosePress}>
              <Text style={styles.Close_txt}>Close</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine}></View>
            <TouchableOpacity onPress={() => handleScreenSelect('Exhibitions')}>
              <Text style={styles.Menu_list}>Exhibitions</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine}></View>
            <TouchableOpacity onPress={() => handleScreenSelect('Artists')}>
              <Text style={styles.Menu_list}>Artists</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine}></View>
            <TouchableOpacity
              onPress={() => handleScreenSelect('Gallery Layout')}>
              <Text style={styles.Menu_list}>Gallery Layout</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MenuScreen;
