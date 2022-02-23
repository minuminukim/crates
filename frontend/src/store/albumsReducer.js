import { csrfFetch } from './csrf';

export const ALBUMS_LOADED = 'albums/ALBUMS_LOADED';
export const ALBUM_ADDED = 'albums/ALBUM_ADDED';
export const ALBUM_REMOVED = 'albums/ALBUM_REMOVED';
const REQUEST_REJECTED = 'albums/REQUEST_REJECTED';

const initialState = {
  items: {},
  errors: null,
  isLoading: true,
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

export const removeAlbum = (albumID, userID) => ({
  type: ALBUM_REMOVED,
  albumID,
  userID,
});

const handleAlbumsErrors = (error) => ({
  type: REQUEST_REJECTED,
  error,
});

export const fetchAlbums = () => (dispatch) => {
  csrfFetch(`/api/albums`)
    .then((res) => res.json())
    .then(({ albums }) => dispatch(loadAlbums(albums)))
    .catch((err) => dispatch(handleAlbumsErrors(err)));
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

export const removeUserAlbum = (userID, albumID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/albums/${albumID}`, {
    method: 'DELETE',
  });
  dispatch(removeAlbum(albumID, userID));
  return response;
};

export const fetchSingleAlbum = (id) => (dispatch) => {
  csrfFetch(`/api/albums/${id}`)
    .then((res) => res.json())
    .then(({ album }) => dispatch(addAlbum(album)))
    .catch((err) => dispatch(handleAlbumsErrors(err)));
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
        isLoading: false,
      };

    case ALBUM_ADDED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.album.spotifyID]: action.album,
        },
        isLoading: false,
      };

    case REQUEST_REJECTED:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.error,
        },
        isLoading: false,
      };

    default:
      return state;
  }
};

export default albumsReducer;
