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
    return error;
  }
};

const fetchSingleAlbum = async (id, token) => {
  if (!token) {
    token = await getToken();
  }

  const url = `https://api.spotify.com/v1/albums/${id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const album = response.data;
    const mappedTracks = album.tracks.items.map((item) => ({
      name: item.name,
      trackNumber: item.track_number,
      durationMS: item.duration_ms,
    }));

    const data = {
      spotifyID: album.id,
      title: album.name,
      artist: album.artists[0].name,
      artistImageURL: album.artists[0]?.images || [],
      releaseYear: +album.release_date.split('-')[0],
      artworkURL: album.images[0].url,
      totalTracks: album.total_tracks,
      genres: album.genres,
      tracks: mappedTracks,
      label: album.label,
    };

    return data;
  } catch (error) {
    return next(error);
  }
};

const wrapSearchInRetry = (searchFunction) => {
  return async (...args) => {
    try {
      const response = await searchFunction(args);
      return response;
    } catch (error) {
      if (error.response.status === 401) {
        try {
          token = await getToken();
          const response = await searchFunction(args);
          return response;
        } catch (anotherError) {
          return anotherError;
        }
      } else {
        return error;
      }
    }
  };
};

const searchAlbumsWithRetry = wrapSearchInRetry(searchAlbumsByTitle);
const fetchSingleAlbumWithRetry = wrapSearchInRetry(fetchSingleAlbum);

module.exports = {
  searchAlbumsByTitle,
  searchAlbumsWithRetry,
  fetchSingleAlbumWithRetry,
};
