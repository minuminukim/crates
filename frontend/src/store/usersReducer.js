import { csrfFetch } from './csrf';

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
    default:
      return state;
  }
};

export default usersReducer;
