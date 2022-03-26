import { csrfFetch } from './csrf';

export const REVIEWS_LOADED = 'reviews/reviewsLoaded';
export const REVIEW_ADDED = 'reviews/reviewAdded';
const REVIEW_UPDATED = 'reviews/reviewUpdated';
export const REVIEW_REMOVED = 'reviews/reviewDeleted';

const initialState = {
  items: {},
};

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

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEWS_LOADED:
      const items = action.reviews.reduce((acc, review) => {
        // review.spotifyID =
        // delete review.album;
        acc[review.id] = review;
        return acc;
      }, {});
      return {
        ...state,
        items,
      };

    case REVIEW_ADDED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.review.id]: action.review,
        },
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
      const newState = {
        ...state,
        items: {
          ...state.items,
        },
      };
      delete newState.items[action.reviewID];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
