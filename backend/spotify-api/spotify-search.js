const axios = require('axios');
const { SearchError } = require('./spotify-errors');
const { setAccessTokenCookie, getToken } = require('./spotify-auth');

let token;

const searchArtistByName = async (accessToken, artistName) => {
  const url = `https://api.spotify.com/v1/search?q=artist:${artistName}&type=artist`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('response, ', response);
    return response.data;
  } catch (error) {
    console.log('error', error);
    return error;
    // return new SearchError(
    //   `No results found for ${artistName}.`,
    //   400,
    //   'Search Error',
    //   { search: `${this.message}` }
    // );
  }
};

const searchAlbumsByTitle = async (title) => {
  if (!token) {
    token = await getToken();
  }

  const url = `https://api.spotify.com/v1/search?q=album:${title}&type=album&limit=6`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { items } = response.data.albums;
    if (items && items.length === 0) {
      return new SearchError(
        `No results found for ${title}.`,
        400,
        'Search Error',
        { search: `No results found for ${title}` }
      );
    }

    const mapped = items.map((item) => ({
      spotifyID: item.id,
      title: item.name,
      artworkURL: item.images[0].url,
      releaseYear: +item.release_date.split('-')[0],
      artist: item.artists[0].name,
    }));

    return mapped;
  } catch (error) {
    console.log('@@@@@@@@@@@ error in search', error);
  }
};

const wrapSearchInRetry = (searchFunction) => {
  return async (...args) => {
    try {
      const response = await searchFunction(args);
      return response;
    } catch (error) {
      if (error.response.status === 401) {
        console.log('401 ertror in wrapper', error);
        try {
          console.log('before', token);
          token = await getToken();
          console.log('after', token);
          const response = await searchFunction(args);
          return response;
        } catch (anotherError) {
          return anotherError;
        }
      } else {
        console.log('error in wrapSearch', error);
        return error;
      }
    }
  };
};

const searchAlbumsWithRetry = wrapSearchInRetry(searchAlbumsByTitle);


module.exports = {
  searchArtistByName,
  searchAlbumsByTitle,
  searchAlbumsWithRetry,
};
