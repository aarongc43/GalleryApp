import {Dimensions, StyleSheet} from 'react-native';

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

const baseTextStyle = {
  fontFamily: 'ACaslonPro-Bold',
  color: 'black',
};

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#a9a9a9',
    height: '100%',
    paddingTop: 2,
    padding: 20,
    flex: 1,
  },
  textContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: 14,
  },
  menuButton: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  Artists_text: {
    ...textNY,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 40,
    color: 'black',
    textAlign: 'center',
  },
  artistItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  scrollViewContainer: {
    alignItems: 'center',
    padding: 20,
  },
  Mellifloo_txt: {
    ...baseTextStyle,
    marginTop: -15,
    marginBottom: -20,
    marginLeft: 15,
    fontSize: 20,
    textAlign: 'center',
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
  horizontalLine: {
    marginBottom: 10,
    width: 350,
    borderBottomColor: '#D9D9D9', // Color of the line
    borderBottomWidth: 1, // Thickness of the line
  },
  Artists_txt: {
    marginTop: -10,
    marginBottom: -10,
    fontFamily: 'ACaslonPro-Bold',
    fontSize: 40,
    color: 'black',
  },
  artistItemImage: {
    width: 60, // Adjust as needed
    height: 60, // Adjust as needed
    borderRadius: 30,
    marginRight: 10,
  },
  artistItemName: {
    ...textBold,
    fontSize: 20,
  },
  rowContainer: {
    marginTop: 20,
    marginLeft: -8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  rowText: {
    marginBottom: 2,
    margin: 10,
  },
  selectedText: {
    fontFamily: 'ACaslonPro-Bold',
    fontSize: 18,
    color: 'black',
  },
  unselectedText: {
    fontFamily: 'ACaslonPro-Bold',
    fontSize: 18,
    color: 'gray',
  },
  profilePhoto: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#333',
  },
  exhibitionContainer: {
    paddingBottom: 20,
  },
  artDescription: {
    ...textRegular,
    fontSize: 12,
  },
  artworkImage: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#333',
  },
  artistName: {
    ...textBold,
    fontSize: 28,
  },
  artistBio: {
    ...textRegular,
    fontSize: 18,
    textAlign: 'justify',
  },
});
