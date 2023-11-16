import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function Artists({navigation}) {
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
    Mellifloo_txt: {
      marginLeft: 140,
      marginTop: -15,
      marginBottom: -20,
      height: 35,
      width: 90,
      fontFamily: 'ACaslonPro-Bold',
      fontSize: 20,
      textAlign: 'center',
      color: 'black',
    },
    Menu_txt: {
      marginLeft: 300,
      marginTop: -15,
      height: 30,
      width: 52,
      fontFamily: 'ACaslonPro-Bold',
      fontSize: 20,
      textAlign: 'right',
      color: '#7E7E7E',
    },
    horizontalLine: {
      marginBottom: 10,
      width: 350,
      borderBottomColor: '#D9D9D9', // Color of the line
      borderBottomWidth: 1, // Thickness of the line
    },
    Artists_txt: {
      marginTop: -10,
      marginBottom: -10,
      fontFamily: 'ACaslonPro-Bold',
      fontSize: 40,
      color: 'black',
    },
    rowContainer: {
      marginTop: -10,
      marginLeft: -8,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    rowText: {
      marginBottom: 2,
      margin: 10,
    },
    selectedText: {
      fontFamily: 'ACaslonPro-Bold',
      fontSize: 18,
      color: 'black',
    },
    unselectedText: {
      fontFamily: 'ACaslonPro-Bold',
      fontSize: 18,
      color: 'gray',
    },
  });

  const [selectedText, setSelectedText] = useState('current');

  const texts = [
    {label: 'Current', key: 'current'},
    {label: 'Upcoming', key: 'upcoming'},
    {label: 'Archive', key: 'archive'},
  ];

  const handleTextPress = (key) => {
    setSelectedText(key);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.Mellifloo_txt}>Mellifloo</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
              <Text style={styles.Menu_txt}>Menu</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.Artists_txt}>ARTISTS</Text>
            <View style={styles.horizontalLine}></View>
            <View style={styles.rowContainer}>
              {texts.map(textItem => (
                <TouchableOpacity
                  key={textItem.key}
                  onPress={() => handleTextPress(textItem.key)}>
                  <Text
                    style={[
                      styles.rowText,
                      selectedText === textItem.key
                        ? styles.selectedText
                        : styles.unselectedText,
                    ]}>
                    {textItem.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.horizontalLine}></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Artists;
