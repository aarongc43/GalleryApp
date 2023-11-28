import React, { useRef, useEffect, useState } from 'react';
import MenuScreen from './MenuScreen';
import Exhibitions from './Exhibitions';
import Artists from './Artists';
import {fetchArtistProfile} from './ArtistProfile';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import storage from '@react-native-firebase/storage';

interface ArtistFlatlistItem {
  exhibitionImage: string;
  artistName: string;
  artistExhibitName: string;
  exhibitionLocation: string;
}

const textRegular = {
  fontSize: 24,
  fontFamily: 'ACaslonPro-Regular',
};

const textBoldItalic = {
  fontSize: 24,
  fontFamily: 'ACaslonPro-BoldItalic',
};

const textBold = {
  fontSize: 24,
  fontFamily: 'ACaslonPro-Bold',
};

const textItalic = {
  fontSize: 24,
  fontFamily: 'ACaslonPro-Italic',
};

const textNY = {
  fontSize: 24,
  fontFamily: 'NY Irvin',
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20, // Add vertical padding
    paddingHorizontal: 16, // Add horizontal padding for screen edge spacing
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  artistName: {
    ...textBold,
    color: '#333',
    marginTop: 20,
  },
  location: {
    ...textRegular,
    color: '#666',
    marginTop: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#a9a9a9',
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  textInfoContainer: {
    alignItems: 'center', // Center the text horizontally
    marginTop: 12, // Space between image and text
  },
  exhibitionName: {
    color: '#555', // Choose a color that fits your design
    ...textBoldItalic,
    marginTop: 4, // Space between the artist's name and exhibition name
  },
  Menu_txt: {
    marginLeft: 300,
    marginTop: -15,
    height: 30,
    width: 52,
    fontFamily: 'ACaslonPro-Bold',
    fontSize: 20,
    textAlign: 'right',
    color: '#333',
  },
  pressedText: {
    color: 'white', // Change the color for the pressed state
  },
  horizontalLine: {
    marginBottom: 10,
    width: 350,
    borderBottomColor: '#D9D9D9', // Color of the line
    borderBottomWidth: 1, // Thickness of the line
  },
  Mellifloo_txt: {
    ...textNY,
    fontSize: 40,
    color: 'black',
  },
  txt: {
    marginTop: -200,
    marginLeft: -170,
    fontFamily: 'ACaslonPro-Bold',
    fontSize: 25,
    color: 'black',
  },
  imageScrollView: {
    width: 392,
    height: 200, // Set the height as needed
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Position the indicators over the FlatList
    bottom: 20, // Bottom of the screen
    alignSelf: 'center',
  },
  flatListContainer: {
    flexDirection: 'row',
  },
  indicator: {
    width: 80,
    height: 4,
    borderRadius: 6,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 5,
    opacity: 0.8,
  },
  activeIndicator: {
    height: 4,
    width: 80,
    borderRadius: 6,
    backgroundColor: '#7E7E7E',
    opacity: 1,
  },
  articleContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  articleImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  articleTextContainer: {
    marginTop: 10,
  },
  articleArtistName: {
    ...textBold,
    fontSize: 18,
  },
  articleExhibitionName: {
    ...textItalic,
    fontSize: 16,
  },
  articleLocation: {
    ...textRegular,
    fontSize: 16,
  },
});

const getRandomArtPieces = (artistsData) => {
  // This should return a random selection of art pieces from your data
};

function HomeScreen({navigation}) {
  const [artistProfiles, setArtistProfiles] = useState([]);
  const artistNames = ['Haley Josephs', 'Yucca Stuff', 'Arthur Vallin'];
  const {width} = Dimensions.get('window');
  const scrollViewRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
    setActiveIndex(newIndex);
  };

  const ArticleItem = ({ art, artist, location }) => (
    <View style={styles.articleContainer}>
      <Image source={{ uri: art.imageUrl }} style={styles.articleImage} />
      <View style={styles.articleTextContainer}>
        <Text style={styles.articleArtistName}>{artist.name}</Text>
        <Text style={styles.articleExhibitionName}>{art.exhibitionName}</Text>
        <Text style={styles.articleLocation}>{location}</Text>
      </View>
    </View>
  );


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
    // Assuming you have a function to get a random set of art pieces
    const randomArtPieces = getRandomArtPieces(); // Implement this function based on your data structure

    return randomArtPieces.map((art, index) => (
      <ArticleItem
        key={index}
        art={art}
        artist={art.artist}
        location={art.location}
      />
    ));
  };

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
          {renderArticles()}
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
