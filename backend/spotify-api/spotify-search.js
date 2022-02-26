const axios = require('axios');
const { SearchError } = require('./spotify-errors');
const { getToken } = require('./spotify-auth');

let token;
const searchAlbumsByTitle = async (title, token) => {
  if (!token) {
    token = await getToken();
  }

  const url = `https://api.spotify.com/v1/search?q=album:${title}&type=album&limit=20`;

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
        [`No results found for '${title}'`]
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
        console.log('401 error in wrapper', error);
        try {
          token = await getToken();
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
  searchAlbumsByTitle,
  searchAlbumsWithRetry,
};
