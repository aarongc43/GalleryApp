import storage from '@react-native-firebase/storage';
import artistsData from './artists.json';

const artistNamesArray = [
  'Arthur Vallin',
  'Haley Josephs',
  'Yang Seung Jin',
  'Tafy LaPlanche',
  'Yucca Stuff',
];

interface ArtistPiece {
  imageName: string;
}

interface Exhibition {
  exhibitionName: string;
  pieces: ArtistPiece[];
}

interface Artist {
  name: string;
  bio: string;
  location: string;
  profilePhoto: string;
  exhibitions: Exhibition[];
}

const artistsCache: Record<string, Artist> = {};

const getArtistDataByName = (artistName: string): Artist | undefined => {
  return artistsData.artists.find(artist => artist.name === artistName);
};

const fetchProfilePhotoUrl = async (photoPath: string | null): Promise<string | null> => {
  if (!photoPath) return null;
  return storage().ref(photoPath).getDownloadURL();
};

const fetchImageUrls = async (imageNames: string[]): Promise<string[]> => {
  return Promise.all(imageNames.map(async imageName => storage().ref(imageName).getDownloadURL()));
};

export const fetchArtistProfile = async (artistName: string): Promise<Artist> => {
  try {
    if (artistsCache[artistName]) {
      return artistsCache[artistName];
    }

    const artistData = getArtistDataByName(artistName);
    if (!artistData) {
      throw new Error(`Artist ${artistName} not found`);
    }

    artistsCache[artistName] = artistData;

    return artistData;
  } catch (error) {
    console.error(`Error fetching artist profile: ${error}`);
    throw error;
  }
};

export const fetchArtistProfilePage = async (
  artistName: string,
): Promise<Artist> => {
  try {
    if (artistsCache[artistName]) {
      return artistsCache[artistName];
    }

    const artistData = getArtistDataByName(artistName);
    if (!artistData) {
      throw new Error(`Artist ${artistName} not found`);
    }

    const profilePhotoUrl = await fetchProfilePhotoUrl(artistData.profilePhoto);
    const exhibitionsWithDownloadUrls = await Promise.all(
      artistData.exhibitions.map(async exhibition => ({
        ...exhibition,
        pieces: await fetchImageUrls(
          exhibition.pieces.map(piece => piece.imageName)),
      })),
    );

    const updatedArtistData = {
      ...artistData,
      profilePhoto: profilePhotoUrl,
      exhibitions: exhibitionsWithDownloadUrls,
    };

    artistsCache[artistName] = updatedArtistData;

    return updatedArtistData;
  } catch (error) {
    console.error(`Error in fetchArtistProfilePage: ${error}`);
    throw error;
  }
};

export const fetchAllArtists = async (): Promise<Artist[]> => {
  try {
    const allArtists = await Promise.all(
      artistNamesArray.map(async (artistName) => {
        return await fetchArtistProfile(artistName);
      }),
    );

    return allArtists;
  } catch (err) {
    console.error(`Error fetching all artists: ${err}`);
    throw err;
  }
};
