import { csrfFetch } from './csrf';
import { ALBUMS_LOADED } from './albumsReducer';

const BACKLOG_UPDATED = 'backlogs/BACKLOG_APPENDED';
const BACKLOG_ITEM_REMOVED = 'backlogs/BACKLOG_ITEM_REMOVED';

const updateBacklog = (userID, albums, album) => ({
  type: BACKLOG_UPDATED,
  userID,
  albums,
  album,
});

const removeItem = (userID, albumID) => ({
  type: BACKLOG_ITEM_REMOVED,
  userID,
  albumID,
});

export const appendBacklog = (album, userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/backlog`, {
    method: 'PUT',
    body: JSON.stringify(album),
  });

  const albums = await response.json();
  console.log('data', albums);
  dispatch(updateBacklog(userID, albums, album));
  return albums;
};

export const removeFromBacklog =
  (albumID, spotifyID, userID) => async (dispatch) => {
    const response = await csrfFetch(
      `/api/users/${userID}/backlog/${albumID}`,
      {
        method: 'DELETE',
      }
    );
    dispatch(removeItem(userID, spotifyID));
    return response;
  };

const backlogsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALBUMS_LOADED:
      return {
        ...state,
        [action.userID]: action.albums.map((album) => album.spotifyID),
      };

    case BACKLOG_UPDATED:
      if (!state[action.userID]) {
        return {
          ...state,
          [action.userID]: action.albums.map((album) => album.spotifyID),
        };
      } else {
        return {
          ...state,
          [action.userID]: [...state[action.userID], action.album.spotifyID],
        };
      }

    case BACKLOG_ITEM_REMOVED:
      return {
        ...state,
        [action.userID]: [...state[action.userID]].filter(
          (id) => id !== action.albumID
        ),
      };

    default:
      return state;
  }
};

export default backlogsReducer;
