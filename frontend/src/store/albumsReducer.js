import { createSelector } from 'reselect';
import { csrfFetch } from './csrf';

import { REVIEWS_LOADED, REVIEW_ADDED } from './reviewsReducer';
import { SESSION_STARTED } from './session';
import { LISTS_LOADED, LIST_ADDED, LIST_UPDATED } from './listsReducer';
import { USER_LOADED } from './usersReducer';
import {
  BACKLOG_LOADED,
  BACKLOG_UPDATED,
  removeFromBacklog,
} from './backlogsReducer';

/********** ACTION TYPES *************/
export const ALBUMS_LOADED = 'albums/albumsLoaded';
export const ALBUM_ADDED = 'albums/albumAdded';
export const ALBUM_REMOVED = 'albums/albumRemoved';

/********** ACTION CREATORS *************/
const albumsLoaded = (albums, userID) => ({
  type: ALBUMS_LOADED,
  albums,
  userID,
});

export const albumAdded = (album, userID) => ({
  type: ALBUM_ADDED,
  album,
  userID,
});

export const albumRemoved = (albumID, userID) => ({
  type: ALBUM_REMOVED,
  albumID,
  userID,
});

/********** THUNKS *************/
export const fetchAlbums = () => async (dispatch) => {
  const response = await csrfFetch(`/api/albums`);
  const { albums } = await response.json();
  dispatch(albumsLoaded(albums));

  return albums;
};

export const fetchAlbumsByUserID = (userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/albums`);
  const { albums } = await response.json();
  dispatch(albumsLoaded(albums, userID));
  return albums;
};

export const fetchSingleAlbum = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/albums/${id}`);
  const { album } = await response.json();
  dispatch(albumAdded(album));
  return album;
};

export const addUserAlbum =
  (userID, newAlbum) => async (dispatch, getState) => {
    const response = await csrfFetch(`/api/users/${userID}/albums`, {
      method: 'POST',
      body: JSON.stringify(newAlbum),
    });
    const { album } = await response.json();
    dispatch(albumAdded(album, userID));

    // Check if the record exists in the user's backlog and remove from if it is
    const state = getState();
    const backlog = state.backlogs.items[userID];
    const inBacklog = backlog && backlog.albums.some((id) => id === album.id);

    if (inBacklog) {
      await dispatch(removeFromBacklog(album.id, userID));
    }

    return album;
  };

export const removeUserAlbum = (userID, albumID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/albums/${albumID}`, {
    method: 'DELETE',
  });
  dispatch(albumRemoved(albumID, userID));
  return response;
};

export const searchAlbums = (query) => async (dispatch) => {
  const response = await csrfFetch(`/api/search`, {
    method: 'POST',
    body: JSON.stringify({ query }),
  });

  const { albums } = await response.json();
  dispatch(albumsLoaded(albums));
  return albums;
};

/*********** SELECTORS *************/
export const selectUserAlbumsSortedByRelease = createSelector(
  [
    (state) => state.albums.items,
    (state) => state.users,
    (_state, userID) => userID,
  ],
  (albums, users, userID) => {
    const albumIDs = users[userID]?.albums;
    if (!albumIDs) return null;
    else if (albumIDs.length === 0) return albumIDs;
    return [...albumIDs].sort((leftID, rightID) => {
      const left = albums[leftID];
      const right = albums[rightID];
      return right.releaseYear - left.releaseYear;
    });
  }
);

const initialState = {
  items: {},
};

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALBUMS_LOADED: {
      // const items = action.backlog ? action.backlog.albums : action.albums;
      const albums = action.albums.reduce((acc, album) => {
        acc[album.id] = album;
        return acc;
      }, {});

      return {
        ...state,
        items: {
          ...state.items,
          ...albums,
        },
      };
    }

    case SESSION_STARTED:
    case USER_LOADED: {
      if (!action.user || !action.user.albums) {
        return state;
      }

      const albums = action.user.albums.reduce(
        (acc, album) => {
          if (!acc[album.id]) {
            acc[album.id] = album;
          }
          return acc;
        },
        { ...state.items }
      );

      return {
        ...state,
        items: albums,
      };
    }

    case ALBUM_ADDED:
    case BACKLOG_UPDATED: {
      // Check if key already exists and merge the two if so
      const albumID = action.album.id;
      const album = state.items.hasOwnProperty([albumID])
        ? { ...state.items[albumID] }
        : { ...action.album };

      if ('UserAlbum' in album) {
        delete album.UserAlbum;
      }

      return {
        ...state,
        items: {
          ...state.items,
          [albumID]: album,
        },
      };
    }

    case REVIEWS_LOADED: {
      const albums = action.reviews
        .map(({ album }) => album)
        .reduce((acc, album) => {
          acc[album.id] = album;
          return acc;
        }, {});

      return {
        ...state,
        items: {
          ...state.items,
          ...albums,
        },
      };
    }

    case REVIEW_ADDED: {
      const { album } = action.review;
      const nextAlbum = state.items.hasOwnProperty([album.id])
        ? { ...state.items[album.id], ...album }
        : album;

      return {
        ...state,
        items: {
          ...state.items,
          [album.id]: {
            ...nextAlbum,
          },
        },
      };
    }

    case LISTS_LOADED: {
      // Reduce array of lists into state.items object
      // Each list object has an array of albums nested:
      // [{ ..., albums: [...]}, {..., albums: [...]}, ...]
      const nextState = action.lists.reduce(
        (acc, { albums }) => {
          for (const album of albums) {
            if (!acc[album.id]) {
              acc[album.id] = album;
            }
          }
          return acc;
        },
        { ...state.items } // Initialize accumulator with state.items
      );

      return {
        ...state,
        items: nextState,
      };
    }

    case LIST_ADDED:
    case LIST_UPDATED: {
      const { albums } = action.list;
      const nextState = albums.reduce(
        (acc, current) => {
          if (!acc[current.id]) {
            // Make a copy so that listsReducer keeps reference to
            // AlbumList when we delete it here
            const album = { ...current };
            delete album.AlbumList;
            acc[current.id] = album;
          }
          return acc;
        },
        { ...state.items }
      );

      return {
        ...state,
        items: nextState,
      };
    }

    case BACKLOG_LOADED: {
      const { albums } = action.backlog;
      const nextState = albums.reduce(
        (acc, current) => {
          if (!acc[current.id]) {
            const album = { ...current };
            delete album.AlbumBacklog;
            acc[current.id] = album;
          }
          return acc;
        },
        { ...state.items }
      );

      return {
        ...state,
        items: nextState,
      };
    }

    default:
      return state;
  }
};

export default albumsReducer;
