import React from 'react';
import {View, Text, Image} from 'react-native';

const ArtPiece = ({title, imageURL, description}) => (
  <View>
    <Image source={{uri: imageURL}} style={{width: 100, height: 100}} />
    <Text>{title}</Title>
    <Text>{description}</Text>
  </View>
)

const ArtistProfile = ({artistName, bio, imageURL, exhibition, artPieces}) => {
  return (
    <View>
      <Text>{artistName}</Text>
      <Image source={{uri: imageURL}} style={{width: 100, height: 100}} />
      <Text>{bio}</Text>
    </View>
  );
};

export default ArtistProfile;
