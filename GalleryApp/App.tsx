import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import LoadingScreen from './Screens/LoadingScreen';
// import Map from './Screens/Map'

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoadingScreen"
        screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{
            headerShown: false,
            gestureEnabled: false, // Disable swipe-back gesture
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/*
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
    fontFamily: 'ACaslonPro-BoldItalic',
  },
  textBold: {
    fontSize: 24,
    fontFamily: 'ACaslonPro-Bold',
  },
  textItalic: {
    fontSize: 24,
    fontFamily: 'ACaslonPro-Italic',
  },
  textNY: {
    fontSize: 24,
    fontFamily: 'NY Irvin',
  },
});
*/

export default App;
