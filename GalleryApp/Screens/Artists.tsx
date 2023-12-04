import React, {useState, useEffect} from 'react';
import storage from '@react-native-firebase/storage';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import styles from '../styles/Artists';
import {fetchArtistProfile, fetchAllArtists} from './ArtistProfile';

function ArtistScreen({route, navigation}) {
  const [artist, setArtist] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const artistName = route.params?.artistName;

  useEffect(() => {
    if (artistName) {
      fetchSingleArtist(artistName);
    } else {
      fetchArtistsList();
    }
  }, [artistName]);

  const fetchSingleArtist = async name => {
    try {
      setLoading(true);
      const artistData = await fetchArtistProfile(name);

      // Fetch the profile photo URL and exhibitions with URLs
      const profilePhotoUrl = artistData.profilePhoto
        ? await storage().ref(artistData.profilePhoto).getDownloadURL()
        : null;

      let bioContent = artistData.bio;
      if (artistData.bio && artistData.bio.includes('.txt')) {
        bioContent = await fetchTextFile(await storage().ref(artistData.bio).getDownloadURL());
      }

      const exhibitionsWithUrls = await Promise.all(
        artistData.exhibitions.map(async exhibition => ({
          ...exhibition,
          pieces: await Promise.all(
            exhibition.pieces.map(async piece => {
              const imageUrl = await storage().ref(piece.imageName).getDownloadURL();
              let imageDescription = '';
              if (piece['imageName description']) {
                imageDescription = await fetchTextFile(await storage().ref(piece['imageName description']).getDownloadURL());
              }
              return {
                ...piece,
                imageName: imageUrl,
                description: imageDescription,
              };
            }),
          ),
        })),
      );
      setArtist({
        ...artistData,
        profilePhoto: profilePhotoUrl,
        exhibitions: exhibitionsWithUrls,
      });
    } catch (err) {
      console.error(err);
      setError('Failed to load artist data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistsList = async () => {
    try {
      setLoading(true);
      const allArtists = await fetchAllArtists();
      setArtists(allArtists);
    } catch (err) {
      console.error(err);
      setError('Failed to load artists list.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTextFile = async url => {
    try {
      const response = await fetch(url);
      return await response.text();
    } catch (err) {
      console.error('Error fetching text file:', err);
      return '';
    }
  };

  const renderArtistListItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ArtistScreen', { artistName: item.name })}>
        <View style={styles.artistItemContainer}>
          <Image source={{ uri: item.profilePhoto }} style={styles.artistItemImage} />
          <Text style={styles.artistItemName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.textContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.Menu_txt}>Menu</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine}></View>
      <Text style={styles.Artists_text}>Artists</Text>
      <View style={styles.horizontalLine}></View>
    </View>
  );

  const renderArtistDetails = () => (
    <>
      <Image source={{ uri: artist.profilePhoto }} style={styles.profilePhoto} />
      <Text style={styles.artistName}>{artist.name}</Text>
      <Text style={styles.artistBio}>{artist.bio}</Text>
    </>
  );

  const renderExhibition = ({ item }) => {
    if (typeof item === 'string') {
      return renderArtistDetails();
    } else if (item.name && item.profilePhoto) {
      return renderArtistListItem({item});
    }

    return (
      <View style={styles.exhibitionContainer}>
        <Text style={styles.exhibitionName}>{item.exhibitionName}</Text>
        {item.pieces.map((piece, index) => (
          <View key={`piece-${index}`}>
            <Image source={{ uri: piece.imageName }} style={styles.artworkImage} />
            <Text style={styles.artDescription}>{piece.description}</Text>
          </View>
        ))}
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loaderContainer} />;
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  // Prepare data for the FlatList
  const flatListData = artist ? ['artistDetails', ...artist.exhibitions] : artists;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={flatListData}
        renderItem={renderExhibition}
        keyExtractor={(item, index) => (typeof item === 'string' ? item : `exhibition-${index}`)}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
}

export default ArtistScreen;
