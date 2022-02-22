import { csrfFetch } from './csrf';

export const ALBUMS_LOADED = '/albums/ALBUMS_LOADED';
export const ALBUM_ADDED = '/albums/ALBUM_ADDED';
const REQUEST_REJECTED = '/albums/REQUEST_REJECTED';

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

export const getUserAlbums = (userID) => (dispatch) => {
  csrfFetch(`/api/users/${userID}/albums`)
    .then((res) => res.json())
    .then(({ albums }) => dispatch(loadAlbums(albums)))
    .catch((err) => dispatch(handleAlbumsErrors(err)));
};

export const fetchSingleAlbum = (id) => (dispatch) => {
  csrfFetch(`/api/albums/${id}`)
    .then((res) => res.json())
    .then(({ album }) => dispatch(addAlbum(album)))
    .catch((err) => dispatch(handleAlbumsErrors(err)));
};

export const fetchUserBacklog = (userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/backlog`);
  const { backlog } = await response.json();
  dispatch(loadAlbums(backlog, userID));
  return backlog;
};

export const searchAlbums = (query) => async (dispatch) => {
  const response = await csrfFetch(`/api/search`, {
    method: 'POST',
    body: JSON.stringify({ query }),
  });

  const { backlog } = await response.json();
  dispatch(loadAlbums(backlog));
  return backlog;
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
