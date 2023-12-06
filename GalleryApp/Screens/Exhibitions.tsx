import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';

import {fetchArtistProfile} from './ArtistProfile';
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
            const artistProfile = await fetchArtistProfile(artistName);
            const randomExhibitionIndex = Math.floor(Math.random() * artistProfile.exhibitions.length);
            const exhibition = artistProfile.exhibitions[randomExhibitionIndex];
            const randomPieceIndex = Math.floor(Math.random() * exhibition.pieces.length);
            const piece = exhibition.pieces[randomPieceIndex];
            const imageUrl = await storage().ref(piece.imageName).getDownloadURL();

            return {
              articleImage: imageUrl,
              articleName: artistProfile.name,
              articleExhibitionName: exhibition['exhibitionName'],
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
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.Mellifloo_txt}>Mellifloo</Text>
      </TouchableOpacity>
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
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Artists', { artistName: item.articleName })}>
          <View style={styles.articleContainer}>
            {item.articleImage ? (
              <Image source={{ uri: item.articleImage }} style={styles.imageStyle} />
            ) : (
                // Consider adding a placeholder image or a view here
                <Text>No image available</Text>
              )}
            <View style={styles.textInfoContainer}>
              <Text style={styles.artistName}>{item.articleName}</Text>
              <Text style={styles.exhibitionName}>{item.articleExhibitionName}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
