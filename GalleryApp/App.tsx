import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import analytics from '@react-native-firebase/analytics';
import storage from '@react-native-firebase/storage';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    analytics().logEvent('page_view', {
        screen_name: 'home_screen',
        screen_class: 'HomeScreen',
      })
      .then(() => console.log('Page view event logged'))
      .catch(error => console.error('Error logging the page view event', error));
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.textNY,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // define refernce to storage
    const storageRef = storage().ref('Arthur Vallin/arthur vallin.png');

    // fetch url and update state
    storageRef.getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Error fetching image URL: ', error);
      });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
        <Image
          source={{uri:imageUrl}}
          style={{width: 200, height: 200}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textRegular: {
    fontSize: 24,
    fontFamily: 'ACaslonPro-Regular',
  },
  textBoldItalic: {
    fontSize: 24,
    fontFamily: 'ACaslonPro-Regular',
  },
  textBold: {
    fontSize: 24,
    fontFamily: 'ACaslonPro-Regular',
  },
  textItalic: {
    fontSize: 24,
    fontFamily: 'ACaslonPro-Regular',
  },
  textNY: {
    fontSize: 24,
    fontFamily: 'NY Irvin',
  },
});

export default App;
