import { csrfFetch } from './csrf';
import { mapObjectIDs } from '../utils';

export const BACKLOG_LOADED = 'backlogs/backlogLoaded';
export const BACKLOG_UPDATED = 'backlogs/backlogUpdated';
const BACKLOG_ITEM_REMOVED = 'backlogs/backlogItemRemoved';

const backlogLoaded = (backlog, userID) => ({
  type: BACKLOG_LOADED,
  backlog,
  userID,
});

const backlogUpdated = (userID, album) => ({
  type: BACKLOG_UPDATED,
  userID,
  album,
});

const backlogItemRemoved = (userID, albumID) => ({
  type: BACKLOG_ITEM_REMOVED,
  userID,
  albumID,
});

export const fetchBacklogByUserID = (userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/backlog`);
  const { backlog } = await response.json();
  dispatch(backlogLoaded(backlog, userID));
  return backlog;
};

export const appendBacklog = (album, userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/backlog`, {
    method: 'PUT',
    body: JSON.stringify(album),
  });
  const data = await response.json();
  dispatch(backlogUpdated(userID, data.album));
  return data;
};

export const removeFromBacklog = (albumID, userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/backlog/${albumID}`, {
    method: 'DELETE',
  });
  dispatch(backlogItemRemoved(userID, albumID));
  return response;
};

const initialState = {
  items: {},
  userIDs: [],
};

const backlogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BACKLOG_LOADED: {
      const { id, userID, albums } = action.backlog;
      const albumIDs = mapObjectIDs(albums);
      const backlog = {
        id,
        userID,
        albums: albumIDs,
      };

      return {
        items: {
          ...state.items,
          [action.userID]: backlog,
        },
        userIDs: [...state.userIDs, action.userID],
      };
    }

    case BACKLOG_UPDATED: {
      const albumID = action.album.id;
      const previousBacklog = state.items[action.userID];

      return {
        ...state,
        items: {
          ...state.items,
          [action.userID]: {
            ...previousBacklog,
            albums: [...previousBacklog.albums, albumID],
          },
        },
      };
    }

    case BACKLOG_ITEM_REMOVED: {
      const previousIDs = state.items[action.userID]?.albums;
      const nextIDs = previousIDs.filter((id) => id !== action.albumID);

      return {
        ...state,
        items: {
          ...state.items,
          [action.userID]: {
            ...state.items[action.userID],
            albums: nextIDs,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default backlogsReducer;
