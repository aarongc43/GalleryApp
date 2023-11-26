import storage from '@react-native-firebase/storage';

/*
  A component for the home page flat list that will display
  1. an art piece 'exibitionImage'
  2. artist name 'artistName'
  3. location hard set location
  4. exhibition name 'exibitionName'
*/

interface Artist {
  name: string;
  'exhibition name': string;
  location: string;
  pieces: {
    imageName: string;
  }[];
}

// Path to JSON file so that we can reference it quickly
const ARTISTS_JSON_PATH = 'gs://art-gallery-app-f773a.appspot.com/artist.json';

// function to be used for calling the artists flatlist profile
export const fetchArtistFlatlistProfile = async (artistName: string) => {
  // fetch JSON object for artistst
  const artistsJsonUrl = await storage()
    .ref(ARTISTS_JSON_PATH)
    .getDownloadURL();

  // fetch JSON contents from the URL
  const response = await fetch(artistsJsonUrl);
  const artistsData = await response.json();

  // function to find artists name for the data it needs to return.
  // TODO: needs to be its own function because it is going to be used several
  // times
  const artistData = artistsData.artists.find((artist: Artist) => {
    return artist.name === artistName;
  });
  if (!artistData) {
    throw new Error(`Artists ${artistName} not found`);
  }

  // getting the image from the artist for the flatlist
  // gets the first image of the json array
  const exhibitionImage = await storage()
    .ref(`${artistData.pieces[0].imageName}`)
    .getDownloadURL();

  return {
    exhibitionImage,
    artistExhibitName: artistData['exhibition name'],
    exhibitionLocation: artistData.location,
  };
};
