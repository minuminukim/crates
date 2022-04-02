import { csrfFetch } from './csrf';
import { mapObjectIDs } from '../utils';
import { createSelector } from 'reselect';

/********* ACTION TYPES ***********/
export const LISTS_LOADED = 'lists/LISTS_LOADED';
export const LIST_ADDED = 'lists/LIST_ADDED';
export const LIST_UPDATED = 'lists/LIST_UPDATED';
export const LIST_REMOVED = 'lists/LIST_REMOVED';

/********* ACTION CREATORS ***********/
const listsLoaded = (lists, userID) => ({
  type: LISTS_LOADED,
  lists,
  userID,
});

const listAdded = (list) => ({
  type: LIST_ADDED,
  list,
});

const listUpdated = (list) => ({
  type: LIST_UPDATED,
  list,
});

const listRemoved = (listID, userID) => ({
  type: LIST_REMOVED,
  listID,
  userID,
});

/********* THUNKS ***********/
export const fetchLists = () => async (dispatch) => {
  const response = await csrfFetch(`/api/lists`);
  const { lists } = await response.json();
  dispatch(listsLoaded(lists));
  return lists;
};

export const fetchSingleList = (listID) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${listID}`);
  const { list } = await response.json();
  dispatch(listAdded(list));
  return list;
};

export const fetchUserLists = (userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/lists`);
  const { lists } = await response.json();
  dispatch(listsLoaded(lists, userID));
  return lists;
};

export const createList = (params) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/`, {
    method: 'POST',
    body: JSON.stringify(params),
  });

  const { list } = await response.json();
  dispatch(listAdded(list));

  return list;
};

export const editList = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  const { list } = await response.json();
  dispatch(listUpdated(list));

  return list;
};

export const appendList = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${data.listID}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  const { list } = await response.json();
  dispatch(listUpdated(list));
  return list;
};

export const deleteList = (listID, userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${listID}`, {
    method: 'DELETE',
  });
  dispatch(listRemoved(listID, userID));
  return response;
};

/********* SELECTORS ***********/
export const selectLists = (state) => state.lists.items;

export const selectListByID = (state, listID) => {
  return state.lists.items[listID];
};

export const selectListsByUserID = createSelector(
  [
    (state) => state.lists.items,
    (state) => state.users,
    (_state, userID) => userID,
  ],
  (lists, users, userID) => {
    const listIDs = users[userID]?.lists;
    if (!listIDs) return null;
    return listIDs.map((id) => lists[id]);
  }
);

export const selectListAlbumsByID = createSelector(
  [(state) => state.lists, (_state, listID) => listID, (state) => state.albums],
  (lists, listID, albums) => {
    const list = lists.items[listID];
    if (!list) return;
    const sortedAlbums = list.isRanked
      ? [...list.albums].sort((a, b) => a.listIndex - b.listIndex)
      : list.albums;

    return sortedAlbums.map(({ id }) => albums.items[id]);
  }
);

/********* REDUCER ***********/
const initialState = { items: {}, listIDs: [] };

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTS_LOADED: {
      const lists = action.lists.reduce((acc, list) => {
        // Pull the listIndex from the album's join table entry
        const albums = list.albums.map(({ id, AlbumList }) => {
          return { id, listIndex: AlbumList.listIndex };
        });
        list.albums = albums;
        acc[list.id] = list;
        return acc;
      }, {});

      const listIDs = mapObjectIDs(action.lists);
      const uniqueIDs = [...new Set([...state.listIDs, ...listIDs])];

      return {
        ...state,
        items: {
          ...state.items,
          ...lists,
        },
        listIDs: uniqueIDs,
      };
    }

    case LIST_ADDED: {
      const albums = action.list.albums.map(({ id, AlbumList }) => {
        return { id, listIndex: AlbumList.listIndex };
      });
      action.list.albums = albums;

      return {
        ...state,
        items: {
          ...state.items,
          [action.list.id]: action.list,
        },
        listIDs: [...state.listIDs, action.list.id],
      };
    }

    case LIST_UPDATED: {
      const albums = action.list.albums.map(({ id, AlbumList }) => {
        return { id, listIndex: AlbumList.listIndex };
      });
      action.list.albums = albums;

      return {
        ...state,
        items: {
          ...state.items,
          [action.list.id]: {
            ...state.items[action.list.id],
            ...action.list,
            // albums: {
            //   ...state.items[action.list.id].albums,
            //   ...action.list.albums,
            // },
          },
        },
      };
    }

    case LIST_REMOVED: {
      const nextState = {
        ...state,
        items: {
          ...state.items,
        },
        listIDs: state.listIDs.filter((id) => id !== action.listID),
      };
      delete nextState.items[action.listID];
      return nextState;
    }

    default:
      return state;
  }
};

export default listsReducer;
