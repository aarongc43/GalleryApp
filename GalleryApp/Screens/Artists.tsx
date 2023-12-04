import React, {useState, useEffect} from 'react';
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

import MenuScreen from './MenuScreen';
import Exhibitions from './Exhibitions';
import HomeMenuScreen from './HomeScreen';
import styles from '../styles/Artists';
import {fetchArtistProfile} from './ArtistProfile';

type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

function ArtistScreen({route}) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
  };

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
                imageName: await storage()
                  .ref(piece.imageName)
                  .getDownloadURL(),
              })),
            ),
          })),
        );

        setArtist({
          ...artistData, profilePhoto: profilePhotoUrl, exhibitions: exhibitionsWithUrls});
      } catch (err) {
        console.error(err);
        setError('Failed to load artist data.');
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [route.params.artistName]);

  const renderExhibition = ({item}) => (
    <View style={styles.exhibitionContainer}>
      <Text style={styles.exhibitionName}>{item.exhibitionName}</Text>
      {item.pieces.map((piece, index) => (
        <Image 
          key={`piece-${index}`} 
          source={{ uri: piece.imageName }} 
          style={styles.artworkImage}
        />
      ))}
    </View>
  );

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
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.Menu_txt}>Menu</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.Artists_text}>Artists</Text>
        <View style={styles.horizontalLine}></View>
      </View>
      <ScrollView contnetContainerStyle={styles.scrollViewContainer}>
        <Image source={{uri: artist.profilePhoto}} style={styles.profilePhoto} />
        <Text style={styles.artistName}>{artist.name}</Text>
        <Text style={styles.artistBio}>{artist.bio}</Text>

        {artist?.exhibitions?.length > 0 && (
        <Text style={styles.exhibitionNameText}>
            {artist.exhibitions[0].exhibitionName}
          </Text>
        )}
        <FlatList
          data={artist ? artist.exhibitions : []}
          renderItem={renderExhibition}
          keyExtractor={(item, index) => `exhibition-${index}`}
          ListHeaderComponent={() => (
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.menuButton}>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ArtistScreen;
