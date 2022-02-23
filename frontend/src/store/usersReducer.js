import { csrfFetch } from './csrf';
import { ALBUMS_LOADED, ALBUM_ADDED, ALBUM_REMOVED } from './albumsReducer';

const USERS_LOADED = 'users/USERS_LOADED';
const USER_ADDED = 'users/USER_ADDED';
const USER_REMOVED = 'users/USER_REMOVED';

const loadUsers = (users) => ({
  type: USERS_LOADED,
  users,
});

export const addUser = (user) => ({
  type: USER_ADDED,
  user,
});

export const fetchUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users`);
  const { users } = await response.json();
  dispatch(loadUsers(users));
  return users;
};

export const fetchSingleUser = (userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}`);
  const { user } = await response.json();
  dispatch(addUser(user));
  return user;
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_LOADED:
      const users = action.users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      return {
        ...state,
        ...users,
      };

    case USER_ADDED:
      return {
        ...state,
        [action.user.id]: action.user,
      };

    case ALBUMS_LOADED:
      return {
        ...state,
        [action.userID]: {
          ...state[action.userID],
          albums: action.albums.map((album) => album.id),
        },
      };

    case ALBUM_ADDED:
      return {
        ...state,
        [action.userID]: {
          ...state[action.userID],
          albums: [...state[action.userID].albums, action.albumID],
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
