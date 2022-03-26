import { csrfFetch } from './csrf';
import { ALBUMS_LOADED, ALBUM_ADDED, ALBUM_REMOVED } from './albumsReducer';
import { SESSION_STARTED } from './session';
import { mapObjectIDs, mapSpotifyIDs } from '../utils';

export const USER_LOADED = 'users/USER_LOADED';

const userLoaded = (user) => ({
  type: USER_LOADED,
  user,
});

export const fetchSingleUser = (userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}`);
  const { user } = await response.json();
  dispatch(userLoaded(user));

  return user;
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOADED:
    case SESSION_STARTED: {
      if (!action.user) {
        return state;
      }

      const albums = mapObjectIDs(action.user.albums) || [];
      const reviews = mapObjectIDs(action.user.reviews) || [];

      return {
        ...state,
        [action.user.id]: {
          ...action.user,
          albums,
          reviews,
        },
      };
    }

    case ALBUMS_LOADED: {
      if (!action.userID) {
        return state;
      }

      const previousAlbums = state[action.userID].albums;
      const mapped = mapObjectIDs(action.albums);
      const unique = [...new Set([...previousAlbums, ...mapped])];

      return {
        ...state,
        [action.userID]: {
          ...state[action.userID],
          albums: unique,
        },
      };
    }

    case ALBUM_ADDED:
      return {
        ...state,
        [action.userID]: {
          ...state[action.userID],
          albums: [...state[action.userID].albums, action.album.id],
        },
      };

    case ALBUM_REMOVED:
      const filtered = [...state[action.userID].albums].filter(
        (id) => id !== action.albumID
      );

      return {
        ...state,
        [action.userID]: {
          ...state[action.userID],
          albums: filtered,
        },
      };

    default:
      return state;
  }
};

export default usersReducer;
