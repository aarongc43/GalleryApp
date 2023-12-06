import { StyleSheet } from 'react-native';

const baseTextStyle = {
  fontFamily: 'ACaslonPro-Bold',
  color: 'black',
};

const titleTextStyle = {
  
}

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
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
  },
  textContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#a9a9a9',
  },
  Mellifloo_txt: {
    ...baseTextStyle,
    marginTop: -15,
    marginBottom: -20,
    marginLeft: 140,
    fontSize: 20,
    textAlign: 'center',
  },
  Menu_txt: {
    ...baseTextStyle,
    marginTop: -15,
    marginLeft: 300,
    fontSize: 20,
    textAlign: 'right',
    color: '#7E7E7E',
  },
  Exhibitions_txt: {
    ...baseTextStyle,
    fontSize: 40,
    marginTop: -10,
    marginBottom: -10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: -5,
  },
  rowText: {
    ...baseTextStyle,
    fontSize: 18,
  },
  selectedText: {
    ...baseTextStyle,
    fontSize: 18,
    color: '#000',
    textDecorationLine: 'underline',
  },
  unselectedText: {
    ...baseTextStyle,
    fontSize: 18,
    color: 'gray',
  },
  horizontalLine: sharedStyles.horizontalLine,
  articleContainer: {
    width: '100%',
    backgroundColor: '#a9a9a9',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleImage: sharedStyles.imageStyle,
  articleTextContainer: {
    marginLeft: 16,
    justifyContent: 'center',

  },
  artistName: {
    ...baseTextStyle,
    fontSize: 18,
  },
  exhibitionName: {
    ...baseTextStyle,
    fontSize: 16,
    fontFamily: 'ACaslonPro-Italic',
  },
  location: {
    ...baseTextStyle,
    fontSize: 16,
    fontFamily: 'ACaslonPro-Regular',
  },
});

