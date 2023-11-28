import storage from '@react-native-firebase/storage';
import artistsData from './artists.json';

interface ArtistPiece {
  imageName: string;
}

interface Exhibition {
  exhibitionName: string;
  pieces: ArtistPiece[];
}

interface Artist {
  name: string;
  bio: string; // Added bio property
  location: string;
  profilePhoto: string; // Added profile photo property
  exhibitions: Exhibition[];
}

interface ArtistsData {
  artists: Artist[];
}

const artistsCache: Record<string, Artist> = {};

export const fetchArtistProfile = async (artistName: string): Promise<Artist> => {
  try {
    if (artistsCache[artistName]) {
      return artistsCache[artistName];
    }

    const artistData = artistsData.artists.find(artist => artist.name === artistName);
    if (!artistData) {
      throw new Error(`Artist ${artistName} not found`);
    }

    artistsCache[artistName] = artistData;

    return artistData;
  } catch (error) {
    console.error(`Error fetching artist profile: ${error}`);
    throw error; // Re-throw the error for upstream handling
  }
};
