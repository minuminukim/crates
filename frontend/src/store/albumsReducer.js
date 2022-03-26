import { csrfFetch } from './csrf';
import { REVIEWS_LOADED, REVIEW_ADDED } from './reviewsReducer';
import { BACKLOG_LOADED, removeFromBacklog } from './backlogsReducer';

export const ALBUMS_LOADED = 'albums/albumsLoaded';
export const ALBUM_ADDED = 'albums/albumAdded';
export const ALBUM_REMOVED = 'albums/albumRemoved';

const initialState = {
  items: {},
};

const albumsLoaded = (albums, userID) => ({
  type: ALBUMS_LOADED,
  albums,
  userID,
});

const albumAdded = (album, userID) => ({
  type: ALBUM_ADDED,
  album,
  userID,
});

export const albumRemoved = (albumID, userID) => ({
  type: ALBUM_REMOVED,
  albumID,
  userID,
});

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

export const fetchSingleAlbum = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/albums/${id}`);
  const { album } = await response.json();
  dispatch(albumAdded(album));
  return album;
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

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALBUMS_LOADED: {
      const items = action.backlog ? action.backlog.albums : action.albums;
      const albums = items.reduce((acc, album) => {
        album.reviews = album?.reviews || [];
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

    // When an album entry was created in db as a result of
    // new user generated content
    case ALBUM_ADDED: {
      const reviews = action.album?.reviews || [];
      action.album.reviews = reviews;

      return {
        ...state,
        items: {
          ...state.items,
          [action.album.id]: action.album,
        },
      };
    }

    case REVIEWS_LOADED: {
      const albums = action.reviews
        .map(({ id, album }) => ({ id, album }))
        .reduce((acc, { id, album }) => {
          album.reviews = album?.reviews || [id];
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
      const isNewEntry = !state.hasOwnProperty([album.id]);
      const reviews = isNewEntry
        ? [action.review.id]
        : state[album.id]?.reviews?.concat(action.review.id);

      return {
        ...state,
        items: {
          ...state.items,
          [album.id]: isNewEntry
            ? {
                ...album,
                reviews,
              }
            : {
                ...state[album.id],
                reviews,
              },
        },
      };
    }
    default:
      return state;
  }
};

export default albumsReducer;
