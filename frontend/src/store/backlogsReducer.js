import { csrfFetch } from './csrf';
import { ALBUMS_LOADED } from './albumsReducer';

const BACKLOG_LOADED = 'backlogs/BACKLOG_LOADED';

const backlogsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALBUMS_LOADED:
      return {
        ...state,
        [action.userID]: action.albums.map((album) => album.spotifyID),
      };
    default:
      return state;
  }
};

export default backlogsReducer;
