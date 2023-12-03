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

const artistsCache: Record<string, Artist> = {};

export const fetchArtistProfile = async (
  artistName: string,
): Promise<Artist> => {
  try {
    if (artistsCache[artistName]) {
      return artistsCache[artistName];
    }

    const artistData = artistsData.artists.find(
      artist => artist.name === artistName,
    );
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

export const fetchArtistProfilePage = async (artistName: string): Promise<Artist> => {
  try {
    if (artistsCache[artistName]) {
      return artistsCache[artistName];
    }

    const artistData = artistsData.artists.find(artist => artist.name === artistName);
    if (!artistData) {
      throw new Error(`Artist ${artistName} not found`);
    }

    // Fetch profile photo URL
    const profilePhotoUrl = artistData.profilePhoto
      ? await storage().ref(artistData.profilePhoto).getDownloadURL()
      : null;

    // Fetch URLs for all exhibitions and pieces
    const exhibitionsWithDownloadUrls = await Promise.all(
      artistData.exhibitions.map(async exhibition => ({
        ...exhibition,
        pieces: await Promise.all(
          exhibition.pieces.map(async piece => ({
            ...piece,
            imageName: await storage().ref(piece.imageName).getDownloadURL(),
          })),
        ),
      })),
    );

    const updatedArtistData = {
      ...artistData,
      profilePhoto: profilePhotoUrl,  // Make sure this is the fetched URL
      exhibitions: exhibitionsWithDownloadUrls,
    };
    artistsCache[artistName] = updatedArtistData;

    return updatedArtistData;
  } catch (error) {
    console.error(`Error in fetchArtistProfilePage: ${error}`);
    throw error;
  }
};

