import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    color: 'white', // Color for the pressed state
  },
  horizontalLine: {
    marginBottom: 10,
    width: 350,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
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
    height: 200,
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
    backgroundColor: '#7E7E7E',
  },
});
