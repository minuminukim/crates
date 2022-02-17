import { csrfFetch } from './csrf';

const ALBUMS_REQUESTED = 'albums/ALBUMS_LOADED';
const ALBUM_ADDED = 'albums/ALBUM_ADDED';


const addAlbum = (album) => ({
  type: ALBUM_ADDED,
  album,
});

const albumsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALBUM_ADDED:
      pass;
    default:
      return state;
  }
};

export default albumsReducer;
