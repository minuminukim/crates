import { csrfFetch } from './csrf';

const LISTS_LOADED = 'lists/LISTS_LOADED';
const LIST_ADDED = 'lists/LIST_ADDED';
const LIST_UPDATED = 'lists/LIST_UPDATED';
const LIST_REMOVED = 'lists/LIST_REMOVED';

const loadLists = (lists) => ({
  type: LISTS_LOADED,
  lists,
});

const addList = (list) => ({
  type: LIST_ADDED,
  list,
});

const updateList = (list) => ({
  type: LIST_UPDATED,
  list,
});

const removeList = (listID) => ({
  type: LIST_REMOVED,
  listID,
});

export const fetchLists = () => async (dispatch) => {
  const response = await csrfFetch(`/api/lists`);
  const { lists } = await response.json();
  dispatch(loadLists(lists));
  return lists;
};

export const fetchSingleList = (listID) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${listID}`);
  const { list } = await response.json();
  dispatch(addList(list));
  return list;
};

export const fetchUserLists = (userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/lists`);
  const { lists } = await response.json();
  dispatch(loadLists(lists));
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
  dispatch(addList(list));

  return list;
};

export const editList = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  const { list } = await response.json();
  dispatch(updateList(list));

  return list;
};

export const appendList = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${data.listID}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  const { list } = await response.json();
  dispatch(updateList(list));
  return list;
};

export const deleteList = (listID) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${listID}`, {
    method: 'DELETE',
  });

  dispatch(deleteList(listID));
  return response;
};

const initialState = { items: {} };

// TODO: change payload on express end to send album IDs rather than
// the album objects
const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTS_LOADED:
      const lists = action.lists.reduce((acc, list) => {
        acc[list.id] = list;
        return acc;
      }, {});

      return {
        ...state,
        items: {
          ...state.items,
          ...lists,
        },
      };

    case LIST_ADDED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.list.id]: action.list,
        },
      };

    case LIST_UPDATED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.list.id]: {
            ...state.items[action.list.id],
            ...action.list,
            albums: {
              ...state.items[action.list.id].albums,
              ...action.list.albums,
            },
          },
        },
      };

    case LIST_REMOVED:
      const newState = {
        ...state,
        items: {
          ...state.items,
        },
      };
      delete newState[action.listID];
      return newState;

    default:
      return state;
  }
};

export default listsReducer;
