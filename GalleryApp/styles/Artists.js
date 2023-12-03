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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  Mellifloo_txt: {
    marginLeft: 140,
    marginTop: -15,
    marginBottom: -20,
    height: 35,
    width: 90,
    fontFamily: 'ACaslonPro-Bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
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
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    borderRadius: 100, // Circular image
    alignSelf: 'center', // Center align in the view
    marginBottom: 20, // Margin bottom
  },

  // Style for artwork images in the exhibition list
  artworkImage: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    marginRight: 10, // Space between images in horizontal list
  },
});
