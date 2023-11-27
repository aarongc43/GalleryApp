import storage from '@react-native-firebase/storage';

/*
  A component for the home page flat list that will display
  1. an art piece 'exibitionImage'
  2. artist name 'artistName'
  3. location hard set location
  4. exhibition name 'exibitionName'
*/

interface ArtistPiece {
  imageName: string;
}

interface Artist {
  name: string;
  'exhibition name': string;
  location: string;
  pieces: ArtistPiece[];
}

interface ArtistFlatlistProfile {
  exhibitionImage: string;
  artistName: string;
  artistExhibitName: string;
  exhibitionLocation: string;
}

interface ArtistsData {
  artists: Artist[];
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
  const artistsData: ArtistsData = await response.json();

  // Find the artist by name
  const artistData = artistsData.artists.find((artist: Artist) => artist.name === artistName);
  if (!artistData) {
    throw new Error(`Artist ${artistName} not found`);
  }

  // Get the first image of the artist for the FlatList
  const exhibitionImage = await storage()
    .ref(artistData.pieces[0].imageName)
    .getDownloadURL();
  // getting the image from the artist for the flatlist

  return {
    exhibitionImage,
    artistName: artistData.name,
    artistExhibitName: artistData['exhibition name'],
    exhibitionLocation: artistData.location,
  };
};
