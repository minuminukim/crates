import { csrfFetch } from './csrf';

export const ALBUMS_LOADED = 'albums/ALBUMS_LOADED';
export const ALBUM_ADDED = 'albums/ALBUM_ADDED';
export const ALBUM_REMOVED = 'albums/ALBUM_REMOVED';

const initialState = {
  items: {},
};

const loadAlbums = (albums, userID) => ({
  type: ALBUMS_LOADED,
  albums,
  userID,
});

const addAlbum = (album) => ({
  type: ALBUM_ADDED,
  album,
});

export const removeAlbum = (albumID, userID, spotifyID) => ({
  type: ALBUM_REMOVED,
  albumID,
  userID,
  spotifyID,
});

export const fetchAlbums = () => async (dispatch) => {
  const response = await csrfFetch(`/api/albums`);
  const { albums } = await response.json();
  dispatch(loadAlbums(albums));

  return albums;
};

export const getUserAlbums = (userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/albums`);
  const { albums } = await response.json();
  dispatch(loadAlbums(albums, userID));
  return albums;
};

export const addUserAlbum = (userID, newAlbum) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/albums`, {
    method: 'POST',
    body: JSON.stringify(newAlbum),
  });

  const { album } = await response.json();
  dispatch(addAlbum(album));
  return album;
};

export const removeUserAlbum =
  (userID, albumID, spotifyID) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${userID}/albums/${albumID}`, {
      method: 'DELETE',
    });
    dispatch(removeAlbum(albumID, userID));
    return response;
  };

export const fetchSingleAlbum = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/albums/${id}`);
  const { album } = await response.json();
  dispatch(addAlbum(album));
  return album;
};

export const searchAlbums = (query) => async (dispatch) => {
  const response = await csrfFetch(`/api/search`, {
    method: 'POST',
    body: JSON.stringify({ query }),
  });

  const { albums } = await response.json();
  dispatch(loadAlbums(albums));
  return albums;
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALBUMS_LOADED:
      const albums = action.albums.reduce((acc, album) => {
        acc[album.spotifyID] = album;
        return acc;
      }, {});

      return {
        ...state,
        items: {
          ...state.items,
          ...albums,
        },
      };

    case ALBUM_ADDED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.album.spotifyID]: action.album,
        },
      };

    default:
      return state;
  }
};

export default albumsReducer;
