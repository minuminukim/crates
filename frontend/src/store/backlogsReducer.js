import { csrfFetch } from './csrf';
import { ALBUMS_LOADED } from './albumsReducer';

const BACKLOG_UPDATED = '/backlogs/BACKLOG_APPENDED';

const updateBacklog = (userID, album) => ({
  type: BACKLOG_UPDATED,
  userID,
  album,
});

export const appendBacklog = (album, userID) => async (dispatch) => {
  console.log('album', album);
  console.log('userID', typeof userID);
  const response = await csrfFetch(`/api/users/${userID}/backlog`, {
    method: 'PUT',
    body: JSON.stringify(album),
  });

  const data = await response.json();
  console.log('data', data);
  dispatch(updateBacklog(userID, album));
  return data;
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
          [action.userID]: [action.album.spotifyID],
        };
      } else {
        return {
          ...state,
          [action.userID]: [...state[action.userID], action.album],
        };
      }
    default:
      return state;
  }
};

export default backlogsReducer;
