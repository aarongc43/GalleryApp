import React, { useRef, useEffect, useState } from 'react';
import MenuScreen from './MenuScreen';
import Exhibitions from './Exhibitions';
import fetchArtistFlatlistProfile from './ArtistProfile';
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
import { createStackNavigator } from '@react-navigation/stack';

interface ArtistFlatlistItem {
  exhibitionImage: string;
  artistName: string;
  artistExhibitName: string;
  exhibitionLocation: string;
}

const styles = StyleSheet.create({
  itemContainer: {
    // Define styles for each item container
  },
  imageStyle: {
    // Define styles for images
  },
  artistName: {
    // Define styles for artist name
  },
  location: {
    // Define styles for location
  },
  container: {
    flex: 1,
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
    fontFamily: 'ACaslonPro-BoldItalic',
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
    marginTop: 185,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    flexDirection: 'row',
  },
  indicator: {
    marginTop: -450,
    marginRight: 5,
    width: 58,
    height: 2,
    borderRadius: 2,
    backgroundColor: '#D9D9D9',
    margin: 8,
  },
  activeIndicator: {
    height: 8,
    backgroundColor: '#7E7E7E', // Change the color for the active indicator
  },
});

function HomeScreen({ navigation }) {
  const [artistProfiles, setArtistProfiles] = useState<ArtistFlatlistItem[]>([]);
  const artistNames = ['Haley Jospehs', 'Yucca Stuff', 'Arthur Vallin'];
  const { width } = Dimensions.get('window');
  const scrollViewRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
            return await fetchArtistFlatlistProfile(name);
          } catch (error) {
            console.error('Error fetching artist profile:', error);
            return null;
          }
        })
      );
      setArtistProfiles(profiles.filter((profile): profile is ArtistFlatlistItem => profile !== null));
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (scrollViewRef.current) {
        if (activeIndex === imageList.length - 1) {
          scrollViewRef.current.scrollToOffset({
            offset: 0,
            animated: true,
          });
          setActiveIndex(0);
        } else {
          const nextIndex = activeIndex + 1;
          scrollViewRef.current.scrollToOffset({
            offset: nextIndex * width,
            animated: true,
          });
          setActiveIndex(nextIndex);
        }
      }
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [activeIndex, artistProfiles.length, width

    const renderItem = ({ item }: { item: ArtistFlatlistItem }) => (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.exhibitionImage }} style={styles.imageStyle} />
        <Text style={styles.artistName}>{item.artistName}</Text>
        <Text style={styles.location}>{item.exhibitionLocation}</Text>
      </View>
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
              {imageList.map((_, index) => (
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
