import { csrfFetch } from './csrf';
import { mapObjectIDs } from '../utils';

const LISTS_LOADED = 'lists/LISTS_LOADED';
const LIST_ADDED = 'lists/LIST_ADDED';
const LIST_UPDATED = 'lists/LIST_UPDATED';
const LIST_REMOVED = 'lists/LIST_REMOVED';

const listsLoaded = (lists) => ({
  type: LISTS_LOADED,
  lists,
});

const listAdded = (list) => ({
  type: LIST_ADDED,
  list,
});

const listUpdated = (list) => ({
  type: LIST_UPDATED,
  list,
});

const listRemoved = (listID) => ({
  type: LIST_REMOVED,
  listID,
});

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
  dispatch(listsLoaded(lists));
  return lists;
};

// let params = {
//   userID,
//   title,
//   description,
//   isRanked,
//   albums: {...}
// }
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

export const deleteList = (listID) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${listID}`, {
    method: 'DELETE',
  });

  dispatch(listRemoved(listID));
  return response;
};

const initialState = { items: {}, listIDs: [] };

// TODO: change payload on express end to send album IDs rather than
// the album objects
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
