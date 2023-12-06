import {StyleSheet} from 'react-native';

const baseTextStyle = {
  fontFamily: 'ACaslonPro-Bold',
  color: 'black',
};

const sharedStyles = StyleSheet.create({
  horizontalLine: {
    marginBottom: 10,
    width: '100%', // Adjusted for full width
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  imageStyle: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  Menu_txt: {
    ...baseTextStyle,
    marginTop: -15,
    marginLeft: 300,
    fontSize: 20,
    textAlign: 'right',
    color: '#7E7E7E',
  },
  Artists_txt: {
    ...baseTextStyle,
    fontSize: 40,
    marginTop: -10,
    marginBottom: -10,
  },
  selectedText: {
    ...baseTextStyle,
    fontSize: 18,
  },
  unselectedText: {
    ...baseTextStyle,
    fontSize: 18,
    color: 'gray',
  },
  horizontalLine: sharedStyles.horizontalLine,
  imageStyle: sharedStyles.imageStyle,
  articleContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  articleImage: sharedStyles.imageStyle,
  articleTextContainer: {
    marginTop: 10,
  },
  articleArtistName: {
    ...baseTextStyle,
    fontSize: 18,
  },
  articleExhibitionName: {
    ...baseTextStyle,
    fontSize: 16,
    fontFamily: 'ACaslonPro-Italic',
  },
  articleLocation: {
    ...baseTextStyle,
    fontSize: 16,
    fontFamily: 'ACaslonPro-Regular',
  },
});

