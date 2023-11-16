export const fetchArtistFlatlistProfile = async (artistName: string) => {
  const artistsJsonUrl = await storage()
    .ref(ARTISTS_JSON_PATH)
    .getDownloadURL();

  const response = await fetch(artistsJsonUrl);
  const artistsData = await response.json();

  const artistData = artistsData.artists.find(artist => artist.name === artistName);
  if (!artistData) {
    throw new Error(`Artist ${artistName} not found`);
  }

  const exhibitionImage = await storage()
    .ref(`${artistData.pieces[0].piece1}`)
    .getDownloadURL();

  return {
    exhibitionImage,
    artistExhibitName: artistData['exhibition name'],
    exhibitionLocation: artistData.location,
  };
}

