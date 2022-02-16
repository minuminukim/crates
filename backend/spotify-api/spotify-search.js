const axios = require('axios');
const { SearchError } = require('./spotify-errors');

const BASE_URL = `https://api.spotify.com/v1/search?`;

const searchArtistByName = async (accessToken, artistName) => {
  const url = `https://api.spotify.com/v1/search?q=${artistName}&type=artist`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return new SearchError(
      `No results found for ${artistName}.`,
      400,
      'Search Error',
      { search: `${this.message}` }
    );
  }
};

const searchAlbumsByArtist = async (accessToken, artistName) => {
  const url = `https://api.spotify.com/v1/search?q=${artistName}&type=album`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { items } = response.data.albums;
    const mapped = items.map((item) => ({
      spotifyID: item.id,
      title: item.name,
      artworkURL: item.images[0].url,
      releaseYear: +item.release_date.split('-')[0],
    }));

    return mapped;
  } catch (error) {
    return new SearchError(
      `No results found for ${artistName}.`,
      400,
      'Search Error',
      { search: `${this.message}` }
    );
  }
};

// need OAUTH for
const getAlbumsByArtistID = async (accessToken, artistID) => {
  const url = `http://api.spotify.com/v1/artists/${artistID}/albums`;

  try {
    const response = await axios.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('error', JSON.stringify(error));
    return new SearchError(
      `No results found for ${artistID}.`,
      400,
      'Search Error',
      { search: `${this.message}` }
    );
  }
};

module.exports = {
  searchArtistByName,
  searchAlbumsByArtist,
  getAlbumsByArtistID,
};
