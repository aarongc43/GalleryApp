import React, { useState, useEffect } from 'react';
import storage from '@react-native-firebase/storage';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/Artists';
import { fetchArtistProfile } from './ArtistProfile';

function ArtistScreen({route}) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setLoading(true);
        const artistData = await fetchArtistProfile(route.params.artistName);

        // Fetch the profile photo URL
        const profilePhotoUrl = artistData.profilePhoto
          ? await storage().ref(artistData.profilePhoto).getDownloadURL()
          : null;

        // Fetch URLs for all exhibition images
        const exhibitionsWithUrls = await Promise.all(
          artistData.exhibitions.map(async exhibition => ({
            ...exhibition,
            pieces: await Promise.all(
              exhibition.pieces.map(async piece => ({
                ...piece,
                imageName: await storage().ref(piece.imageName).getDownloadURL(),
              })),
            ),
          })),
        );

        setArtist({...artistData, profilePhoto: profilePhotoUrl, exhibitions: exhibitionsWithUrls});
      } catch (err) {
        console.error(err);
        setError('Failed to load artist data.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [route.params.artistName]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!artist) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No artist data available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.Menu_txt}>Menu</Text>
          </TouchableOpacity>
          <Text style={styles.Mellifloo_txt}>Mellifloo</Text>
          <View style={styles.horizontalLine}></View>
          
          <Text style={styles.artistTitle}>ARTIST</Text>
          <Image source={{uri: artist.profilePhoto}} style={styles.profilePhoto} />
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.artistBio}>{artist.bio}</Text>

          <FlatList
            data={artist.exhibitions}
            keyExtractor={(item, index) => `exhibition-${index}`}
            renderItem={({item}) => (
              <View>
                <Text style={styles.exhibitionName}>{item.exhibitionName}</Text>
                <FlatList
                  data={item.pieces}
                  horizontal
                  keyExtractor={(piece, index) => `piece-${index}`}
                  renderItem={({item: piece}) => (
                    <Image
                      source={{uri: piece.imageName}}
                      style={styles.artworkImage}
                    />
                  )}
                />
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ArtistScreen;
