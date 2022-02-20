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

const removeList = (list) => ({
  type: LIST_REMOVED,
  list,
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

const initialState = { items: {} };

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTS_LOADED:
      const items = action.lists.reduce((acc, list) => {
        acc[list.id] = list;
        return acc;
      }, {});
      return {
        ...state,
        items: {
          ...state.items,
          ...items,
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

    default:
      return state;
  }
};

export default listsReducer;
