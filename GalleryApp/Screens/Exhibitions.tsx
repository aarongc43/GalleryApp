import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';

import {fetchArtistProfilePage} from './ArtistProfile';
import styles from '../styles/ExhibitionScreenStyles';

const Exhibitions = ({navigation}) => {
  const [selectedText, setSelectedText] = useState('current');
  const [articles, setArticles] = useState([]);
  const artistArticles = ['Tafy LaPlanche', 'Arthur Vallin', 'Yang Seung Jin', 'Yucca Stuff', 'Haley Josephs'];

  const texts = [
    {label: 'Current', key: 'current'},
    {label: 'Upcoming', key: 'upcoming'},
    {label: 'Archive', key: 'archive'},
  ];

  const handleTextPress = (key) => {
    setSelectedText(key);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await Promise.all(
        artistArticles.map(async artistName => {
          try {
            const artistProfile = await fetchArtistProfilePage(artistName);

            if (!artistProfile.exhibitions || artistProfile.exhibitions.length === 0) {
              console.warn(`No exhibitions found for artist: ${artistName}`);
              return null;
            }

            const chosenExhibition = artistProfile.exhibitions[0]; // Access first exhibition

            // Check if exhibition has pieces before accessing image
            if (!chosenExhibition.pieces || chosenExhibition.pieces.length === 0) {
              console.warn(`No pieces found for exhibition: ${chosenExhibition.exhibitionName}`);
              return null;
            }

            const chosenPiece = chosenExhibition.pieces[0]; // Access first piece of art
            const imageUrl = await storage().ref(chosenPiece.imageName).getDownloadURL();

            return {
              articleImage: imageUrl,
              articleName: artistProfile.name,
              articleExhibitionName: chosenExhibition.exhibitionName,
            };
          } catch (error) {
            console.error('Error fetching article:', error);
            return null;
          }
        }),
      );
      setArticles(fetchedArticles.filter(article => article !== null));
    };

    fetchArticles();
  }, []);

  const renderHeader = () => (
    <View style={styles.textContainer}>
      <Text style={styles.Mellifloo_txt}>Mellifloo</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.Menu_txt}>Menu</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine}></View>
      <Text style={styles.Exhibitions_txt}>EXHIBITIONS</Text>
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
  );

  const renderArticleItem = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('Artists', { artistName: item.articleName })}>
      <View style={styles.articleContainer}>
        {item.articleImage ? (
          <Image source={{uri: item.articleImage}} style={styles.articleImage} />
        ) : (
            // Placeholder image or view
            <Text>No image available</Text>
          )}
        <View style={styles.textInfoContainer}>
          <Text style={styles.artistName}>{item.articleName}</Text>
          <Text style={styles.articleExhibitionName}>{item.articleExhibitionName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderArticleItem}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

export default Exhibitions;
