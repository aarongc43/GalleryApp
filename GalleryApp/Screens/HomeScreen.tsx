import React, {useRef, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {NativeSyntheticEvent, NativeScrollEvent} from 'react-native';

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
import Map from './Map';
import {fetchArtistProfile} from './ArtistProfile';
import styles from '../styles/HomeScreenStyles';

type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

function HomeScreen({navigation}: HomeScreenProps) {
  const [artistProfiles, setArtistProfiles] = useState([]);
  const artistNames = ['Haley Josephs', 'Yucca Stuff', 'Arthur Vallin'];
  const artistArticles = ['Haley Josephs', 'Tafy LaPlanche', 'Yang Seung Jin'];
  const {width} = Dimensions.get('window');
  const scrollViewRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  const [articles, setArticles] = useState([]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      const profiles = await Promise.all(
        artistNames.map(async name => {
          try {
            const profile = await fetchArtistProfile(name);
            const exhibition = profile.exhibitions[0];
            const exhibitionImage = exhibition?.pieces[0]?.imageName;
            const imageUrl = exhibitionImage
              ? await storage().ref(exhibitionImage).getDownloadURL() : null;
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
        }),
      );
      setArtistProfiles(profiles.filter((profile) => profile !== null));
    };

    fetchProfiles();
  }, []);

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
              articleExhibitionName: exhibition['exhibition name'],
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
    <TouchableOpacity onPress={() => navigation.navigate('Artists', { artistName: item.artistName })}>
      <View style={[styles.itemContainer, {width}]}>
        <Image source={{uri: item.exhibitionImage}} style={styles.imageStyle} />
        <View style={styles.textInfoContainer}>
          <Text style={styles.artistName}>{item.artistName}</Text>
          <Text style={styles.exhibitionName}>{item.artistExhibitName}</Text>
          <Text style={styles.location}>{item.exhibitionLocation}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
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
          {articles.length > 0 && (
            <View style={{flex: 1}}>
              {articles.map((article, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate('Artists', {artistName: article.articleName})}>
                  <View key={index} style={styles.articleContainer}>
                    <Image source={{ uri: article.articleImage }} style={styles.articleImage} />
                    <View style={styles.articleTextContainer}>
                      <Text style={styles.articleArtistName}>{article.articleName}</Text>
                      <Text style={styles.articleExhibitionName}>{article.articleExhibitionName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
      <Stack.Screen name="Map" component={Map} />

    </Stack.Navigator>
  );
}
