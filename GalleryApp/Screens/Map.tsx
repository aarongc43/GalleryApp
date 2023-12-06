import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import { fetchArtistProfilePage } from './ArtistProfile';

import storage from '@react-native-firebase/storage';

const museumLayoutImage = require('../assets/fonts/map_layout1.jpg');
const pinImage = require('../assets/fonts/pin.png')

function Map({ navigation }) {
  const [artistModalData, setArtistModalData] = useState(null);

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
    titleText: {
      // Your title text style here
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
    Map_txt: {
      marginTop: -10,
      marginBottom: -10,
      fontFamily: 'ACaslonPro-Bold',
      fontSize: 40,
      color: 'black',
    },
    menuText: {
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
      borderBottomColor: '#D9D9D9',
      borderBottomWidth: 1,
    },
    imageStyle: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    pinStyle: {
      position: 'absolute',
      width: 15,
      height: 15,
    },
    modalView: {
      position: 'absolute',
      bottom: 0, // Positions the modal at the bottom
      left: 0,
      right: 0,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    profileImage: {
      width: 150,  // Adjust width as needed
      height: 150, // Adjust height as needed
      borderRadius: 75, // Makes the image circular
      marginBottom: 20,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 16,
    },
    button: {
      backgroundColor: '#2196F3',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    // Additional styles
  });

  const pins = [
    { x: 60, y: 275, artistName: 'Arthur Vallin' },
    { x: 151, y: 182, exhibitionId: 'exhibition1', artistName: 'Haley Josephs' },
    { x: 235, y: 182, exhibitionId: 'exhibition1', artistName: 'Tafy LaPlanche' },
    { x: 160, y: 241, exhibitionId: 'exhibition1', artistName: 'Yucca Stuff' },
    { x: 212, y: 241, exhibitionId: 'exhibition1', artistName: 'Yang Seung Jin' },
    { x: 299, y: 208, exhibitionId: 'exhibition1', artistName: 'Arthur Vallin' },
    // Add more pins as needed
  ];

  const handlePinPress = async (pin) => {
    try {
      const artistData = await fetchArtistProfilePage(pin.artistName); // or fetchArtistProfile
      if (artistData && artistData.profilePhoto) {
        // Fetch the actual download URL for the profile photo
        const profilePhotoUrl = await storage().ref(artistData.profilePhoto).getDownloadURL();
        setArtistModalData({ ...artistData, profilePhoto: profilePhotoUrl });
      } else {
        console.error('Artist profile photo not found for:', pin.artistName);
      }
    } catch (error) {
      console.error('Error fetching artist data:', error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.Mellifloo_txt}>Mellifloo</Text>
            <Text style={styles.titleText}>Map</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
              <Text style={styles.menuText}>Menu</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine}></View>
            <Image source={museumLayoutImage} style={styles.imageStyle} />
            {pins.map((pin, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.pinStyle, { top: pin.y, left: pin.x }]}
                onPress={() => handlePinPress(pin)}
              >
                <Image source={pinImage} style={{ width: '100%', height: '100%' }} />
                {/* Add styles or icons for pins here */}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={artistModalData !== null}
        onRequestClose={() => {
          setArtistModalData(null);
        }}
      >
        <View style={styles.modalView}>
          {artistModalData && (
            <>
              <Image
                source={{ uri: artistModalData.profilePhoto }}
                style={styles.profileImage}
                onError={(e) => console.log('Loading image failed', e.nativeEvent.error)}
              />
              <Text style={styles.modalText}>{artistModalData.name}</Text>
              <Text style={styles.modalText}>{artistModalData.bio}</Text>
              <Text style={styles.modalText}>{artistModalData.location}</Text>
              {/* Display other artist data as needed */}
            </>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setArtistModalData(null)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView >
  );
}

export default Map;