import {StyleSheet} from 'react-native';

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

export default StyleSheet.create({
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
