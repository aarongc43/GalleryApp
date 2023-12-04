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

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#a9a9a9',
    height: 800,
    padding: 20,
    flex: 1,
  },
  textContainer: {
    width: '100%',
    justifyContent: 'flex-start',
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
  scrollViewContainer: {
    alignItems: 'center',
    padding: 20,
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
  rowContainer: {
    marginTop: -10,
    marginLeft: -8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    width: width * 0.8, // Adjust width as needed
    height: width * 0.8, // Adjust height as needed
    borderRadius: (width * 0.8) / 2, // Circular image
    alignSelf: 'center', // Center align in the view
    marginVetical: 10, // Margin bottom
  },
  exhibitionContainer: {
    paddingBottom: 20,
  },
  artworkImage: {
    width: width * 0.9, // 90% of screen width
    height: width * 0.9, // Adjust height according to your aspect ratio
    alignSelf: 'center',
    marginVertical: 10,
    resizeMode: 'cover',
  },
  artistName: {
    ...textBold,
    fontSize: 28,
    marginVertical: 4,
  },
  artistBio: {
    ...textRegular,
    fontSize: 18,
    textAlign: 'justify',
    marginVertical: 4,
  },
});
