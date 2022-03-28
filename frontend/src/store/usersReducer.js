import { csrfFetch } from './csrf';
import { ALBUMS_LOADED, ALBUM_ADDED, ALBUM_REMOVED } from './albumsReducer';
import { SESSION_STARTED } from './session';
import { mapObjectIDs } from '../utils';
import { LISTS_LOADED, LIST_ADDED, LIST_REMOVED } from './listsReducer';

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

    // Until we can figure out how to reduce all ALBUMS_LOADED events
    // we only update this slice when a user's albums are fetched
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

    // Event occurs when a user marks an album as 'listened'
    case ALBUM_ADDED:
      return {
        ...state,
        [action.userID]: {
          ...state[action.userID],
          albums: [...state[action.userID].albums, action.album.id],
        },
      };

    // Event occurs when a user removes a 'listen'
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

    case LISTS_LOADED: {
      // When a specific user's lists were fetched
      if (action.userID) {
        // Check if user data already exists in store
        const isNewUserEntry = state.hasOwnProperty([action.userID]);
        const user = isNewUserEntry
          ? { ...state[action.userID] }
          : action.lists[0].User;

        return {
          ...state,
          [action.userID]: {
            ...user,
            lists: mapObjectIDs(action.lists),
          },
        };
      }

      // Map array of lists into pairs: [[listID, list.user]...]
      // and reduce those into the next state object
      return action.lists
        .map(({ id, User }) => [id, User])
        .reduce(
          (acc, [listID, user]) => {
            // If user is already in the accumulator...
            if (acc[user.id]) {
              // ...check if its lists array has already been initialized
              const listIDs =
                'lists' in acc[user.id]
                  ? acc[user.id].lists.concat(listID)
                  : [listID];

              // We only want the unique ones
              acc[user.id].lists = [...new Set(listIDs)];
            } else {
              // Else we set a new key on the accumulator
              acc[user.id] = user;
              acc[user.id].lists = [listID];
            }

            return acc;
          },
          { ...state } // Initialize accumulator with state object
        );
    }

    case LIST_ADDED: {
      const { id: listID, userID } = action.list;

      const user = state.hasOwnProperty([userID])
        ? { ...state[userID] }
        : action.list.User;

      const listIDs =
        'lists' in user ? [...new Set([...user.lists, listID])] : [listID];

      return {
        ...state,
        [userID]: {
          ...user,
          lists: listIDs,
        },
      };
    }

    case LIST_REMOVED: {
      const { userID, listID } = action;

      return {
        ...state,
        [userID]: {
          ...state[userID],
          lists: state[userID].lists.filter((id) => id !== listID),
        },
      };
    }

    default:
      return state;
  }
};

export default usersReducer;
