import React, { useRef, useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import storage from '@react-native-firebase/storage';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';

import MenuScreen from './MenuScreen';
import Exhibitions from './Exhibitions';
import Artists from './Artists';
import {fetchArtistProfile} from './ArtistProfile';
import styles from '../styles/HomeScreenStyles';

const ArticleItem: React.FC<ArticleItemProps> = ({art, artist, location}) => (
  <View style={styles.articleContainer}>
    <Image source={{uri: art.imageUrl}} style={styles.articleImage} />
    <View style={styles.articleTextContainer}>
      <Text style={styles.articleArtistName}>{artist.name}</Text>
      <Text style={styles.articleExhibitionName}>{art.exhibitionName}</Text>
      <Text style={styles.articleLocation}>{location}</Text>
    </View>
  </View>
);

const Article = ({artistName, artwork, exhibitionName, location}) => {
  return (
    <View style={styles.articleContainer}>
      <Image style={styles.articleImage} source={{ uri: artwork }} />
      <Text style={styles.artistName}>{artistName}</Text>
      <Text style={styles.exhibitionName}>{exhibitionName}</Text>
      <Text style={styles.location}>{location}</Text>
    </View>
  );
};

function HomeScreen({navigation}) {
  const [artistProfiles, setArtistProfiles] = useState([]);
  const artistNames = ['Haley Josephs', 'Yucca Stuff', 'Arthur Vallin'];
  const {width} = Dimensions.get('window');
  const scrollViewRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [articles, setArticles] = useState([]);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      const profiles = await Promise.all(
        artistNames.map(async (name) => {
          try {
            const profile = await fetchArtistProfile(name);
            const exhibition = profile.exhibitions[0];
            const exhibitionImage = exhibition?.pieces[0]?.imageName;
            const imageUrl = exhibitionImage ? await storage().ref(exhibitionImage).getDownloadURL() : null;
            console.log(`Image URL for ${name}: ${imageUrl}`);
            return {
              exhibitionImage: imageUrl,
              artistName: profile.name,
              artistExhibitName: exhibition['exhibition name'],
              exhibitionLocation: profile.location,
            };
          } catch (error) {
            console.error('Error fetching artist profile:', error);
            return null;
          }
        })
      );
      setArtistProfiles(profiles.filter((profile) => profile !== null));
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const articlesData = artistProfiles.map((profile) => {
      // Choose a random piece from the first exhibition for simplicity
      const randomPieceIndex = Math.floor(Math.random() * profile.exhibitions[0].pieces.length);
      const piece = profile.exhibitions[0].pieces[randomPieceIndex];
      return {
        artistName: profile.artistName,
        artwork: piece.imageName,
        exhibitionName: profile.exhibitions[0]['exhibition name'],
        location: profile.exhibitionLocation,
      };
    });
    setArticles(articlesData);
  }, [artistProfiles]);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (scrollViewRef.current) {
        const nextIndex = activeIndex === artistProfiles.length - 1 ? 0 : activeIndex + 1;
        scrollViewRef.current.scrollToOffset({ offset: nextIndex * width, animated: true });
        setActiveIndex(nextIndex);
      }
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(autoScroll);
  }, [activeIndex, artistProfiles.length, width]);

  const renderItem = ({item}) => (
    <View style={[styles.itemContainer, {width}]}>
      <Image source={{uri: item.exhibitionImage}} style={styles.imageStyle} />
      <View style={styles.textInfoContainer}>
        <Text style={styles.artistName}>{item.artistName}</Text>
        <Text style={styles.exhibitionName}>{item.artistExhibitName}</Text>
        <Text style={styles.location}>{item.exhibitionLocation}</Text>
      </View>
    </View>
  );

  const renderArticles = () => {
    return artistProfiles.map(artist => {
      // Randomly select one piece of artwork
      const randomArtIndex = Math.floor(Math.random() * artist.exhibitions[0].pieces.length);
      const artwork = artist.exhibitions[0].pieces[randomArtIndex];

      return (
        <ArticleItem
          key={artist.name}
          artistName={artist.name}
          artwork={artwork.imageName} // Assuming this is a URL to the image
          exhibitionName={artist.exhibitions[0]['exhibition name']}
          location={artist.location}
        />
      );
    });
  };

  const renderArticleItem = ({ item }) => (
    <ArticleItem
      art={item}
      artist={{ name: item.artistName }}
      location={item.location}
    />
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
              <Text style={styles.Menu_txt}>Menu</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.Mellifloo_txt}>MELLIFLOO</Text>
          </View>
          <FlatList
            horizontal
            pagingEnabled
            data={artistProfiles}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            ref={scrollViewRef}
            contentContainerStyle={styles.flatListContainer}
          />
          <View style={styles.indicatorContainer}>
            {artistProfiles.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  index === activeIndex && styles.activeIndicator,
                ]}
                onPress={() => {
                  scrollViewRef.current.scrollToOffset({
                    offset: index * width,
                    animated: true,
                  });
                  setActiveIndex(index);
                }}
              />
            ))}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.txt}>On View</Text>
          </View>
          <FlatList
            data={articles}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderArticleItem}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function HomeMenuScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // You can hide the header if needed
        animationEnabled: false, // Disable animation
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Exhibitions" component={Exhibitions} />
      <Stack.Screen name="Artists" component={Artists} />
    </Stack.Navigator>
  );
}
