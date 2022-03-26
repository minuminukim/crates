import { csrfFetch } from './csrf.js';
import { addUser } from './usersReducer.js';

export const SESSION_STARTED = 'session/sessionStarted';
const SESSION_ENDED = 'session/sessionEnded';

const sessionStarted = (user) => ({
  type: SESSION_STARTED,
  user,
});

const sessionEnded = () => ({
  type: SESSION_ENDED,
});

export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({ credential, password }),
    });
    const data = await response.json();
    dispatch(sessionStarted(data.user));

    return response;
  };

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(sessionStarted(data.user));

  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password, confirmPassword } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    }),
  });
  const data = await response.json();
  dispatch(sessionStarted(data.user));

  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(sessionEnded());
  return response;
};

export const loginDemo = () => async (dispatch) => {
  const response = await csrfFetch('/api/session/demo', {
    method: 'POST',
  });
  const data = await response.json();
  dispatch(sessionStarted(data.user));

  return data;
};

/* ------ SELECTORS ------ */
export const getSessionUser = (state) => state.session.user;

const initialState = { user: null };

function reducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_STARTED:
      const { id, username } = action.user;

      return {
        ...state,
        user: {
          id,
          username,
        },
      };

    case SESSION_ENDED:
      const next = { ...state };
      delete next.user;
      return {
        user: null,
      };

    default:
      return state;
  }
}

export default reducer;
