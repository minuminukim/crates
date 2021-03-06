import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import albumsReducer from './albumsReducer';
import reviewsReducer from './reviewsReducer';
import usersReducer from './usersReducer';
import listsReducer from './listsReducer';
import backlogsReducer from './backlogsReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
  session,
  albums: albumsReducer,
  reviews: reviewsReducer,
  users: usersReducer,
  lists: listsReducer,
  backlogs: backlogsReducer,
  comments: commentsReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
