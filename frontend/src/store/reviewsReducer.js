import { csrfFetch } from './csrf';
import { USER_LOADED } from './usersReducer';
import { SESSION_STARTED } from './session';

export const REVIEWS_LOADED = 'reviews/reviewsLoaded';
export const REVIEW_ADDED = 'reviews/reviewAdded';
const REVIEW_UPDATED = 'reviews/reviewUpdated';
export const REVIEW_REMOVED = 'reviews/reviewDeleted';

const reviewsLoaded = (reviews) => ({
  type: REVIEWS_LOADED,
  reviews,
});

const reviewAdded = (review) => ({
  type: REVIEW_ADDED,
  review,
});

const reviewUpdated = (review) => ({
  type: REVIEW_UPDATED,
  review,
});

const reviewRemoved = (reviewID) => ({
  type: REVIEW_REMOVED,
  reviewID,
});

export const fetchReviews = () => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews`);
  const { reviews } = await response.json();
  dispatch(reviewsLoaded(reviews));
  return reviews;
};

export const fetchSingleReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`);
  const { review } = await response.json();
  dispatch(reviewAdded(review));
  return review;
};

export const fetchReviewsByUserID = (userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/reviews`);
  const { reviews } = await response.json();
  dispatch(reviewsLoaded(reviews));
  return reviews;
};

export const postReview = (params) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  const { review } = await response.json();
  dispatch(reviewAdded(review));
  return review;
};

export const editReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    body: JSON.stringify(review),
  });

  const { updated } = await response.json();
  dispatch(reviewUpdated(updated));
  return updated;
};

export const deleteReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });
  dispatch(reviewRemoved(id));
  return response;
};
const initialState = {
  items: {},
  reviewIDs: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEWS_LOADED:
    case USER_LOADED:
    case SESSION_STARTED: {
      const reviews = action.user ? action.user.reviews : action.reviews;
      const nextState = reviews.reduce(
        (acc, review) => {
          if (!acc.items[review.id]) {
            acc.items[review.id] = review;
            acc.reviewIDs.push(review.id);
          }
          // acc.items[review.id] = review;
          return acc;
        },
        { items: {}, reviewIDs: [] }
      );
      const unique = [...new Set([...state.reviewIDs, ...nextState.reviewIDs])];

      return {
        ...state,
        items: {
          ...state.items,
          ...nextState.items,
        },
        reviewIDs: unique,
      };
    }

    case REVIEW_ADDED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.review.id]: action.review,
        },
        reviewIDs: [...state.reviewIDs, action.review.id],
      };

    case REVIEW_UPDATED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.review.id]: {
            ...state.items[action.review.id],
            ...action.review,
          },
        },
      };

    case REVIEW_REMOVED:
      const nextState = { ...state };
      delete nextState.items[action.reviewID];
      return {
        ...nextState,
        reviewIDs: [...state.reviewIDs].filter((id) => id !== action.reviewID),
      };

    default:
      return state;
  }
};

export default reviewsReducer;
