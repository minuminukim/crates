import { csrfFetch } from './csrf';

const REVIEWS_LOADED = 'reviews/REVIEWS_LOADED';
const REQUEST_REJECTED = 'reviews/REQUEST_REJECTED';
const REVIEW_ADDED = 'reviews/REVIEW_ADDED';
const REVIEW_UPDATED = 'reviews/REVIEW_UPDATED';
const REVIEW_REMOVED = 'reviews/REVIEW_DELETED';

const initialState = {
  items: {},
  isLoading: true,
  errors: null,
};

const loadReviews = (reviews) => ({
  type: REVIEWS_LOADED,
  reviews,
});

const addReview = (review) => ({
  type: REVIEW_ADDED,
  review,
});

const updateReview = (review) => ({
  type: REVIEW_UPDATED,
  review,
});

const removeReview = (reviewID) => ({
  type: REVIEW_REMOVED,
  reviewID,
});

export const getReviews = () => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews`);
  const { reviews } = await response.json();
  dispatch(loadReviews(reviews));
  return reviews;
};

export const getSingleReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`);
  const { review } = await response.json();
  dispatch(addReview(review));
  return review;
};

export const getReviewsByUserID = (userID) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userID}/reviews`);
  const { reviews } = await response.json();
  dispatch(loadReviews(reviews));
  return reviews;
};

export const postReview = (params) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  const { review } = await response.json();
  dispatch(addReview(review));
  return review;
};

export const editReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    body: JSON.stringify(review),
  });

  const { updated } = await response.json();
  dispatch(updateReview(updated));
  return updated;
};

export const deleteReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });
  dispatch(removeReview(id));
  return response;
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEWS_LOADED:
      const items = action.reviews.reduce((acc, review) => {
        acc[review.id] = review;
        return acc;
      }, {});
      return {
        ...state,
        items,
        isLoading: false,
      };

    case REQUEST_REJECTED:
      return {
        ...state,
        isLoading: false,
        errors: action.error,
      };

    case REVIEW_ADDED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.review.id]: action.review,
        },
        isLoading: false,
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
        isLoading: false,
      };

    case REVIEW_REMOVED:
      const newState = {
        ...state,
        items: {
          ...state.items
        },
      };
      delete newState.items[action.reviewID];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
