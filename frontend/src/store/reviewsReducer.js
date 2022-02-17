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

const handleReviewsError = (error) => ({
  type: REQUEST_REJECTED,
  error,
});

const addReview = (review) => ({
  type: REVIEW_ADDED,
  review,
});

const updateReview = (review) => ({
  type: REVIEW_UPDATED,
  review,
});

const removeReview = (id) => ({
  type: REVIEW_REMOVED,
  id,
});

export const getReviews = () => (dispatch) => {
  csrfFetch(`/api/reviews`)
    .then((response) => response.json())
    .then(({ reviews }) => dispatch(loadReviews(reviews)))
    .catch((error) => dispatch(handleReviewsError(error)));
};

export const getSingleReview = (id) => (dispatch) => {
  csrfFetch(`/api/reviews/${id}`)
    .then((response) => response.json())
    .then(({ review }) => dispatch(addReview(review)))
    .catch((error) => dispatch(handleReviewsError(error)));
};

export const postReview = (params) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
    const { review } = await response.json();
    dispatch(addReview(review));
    return review;
  } catch (error) {
    // console.log('typeof', typeof error);
    // console.log('error@@@@@@@@@@', error.json());
    dispatch(handleReviewsError(await error.json()));
  }
};

export const editReview = (review) => (dispatch) => {
  const options = {
    method: 'PUT',
    body: JSON.stringify(review),
  };

  csrfFetch(`/api/reviews/${review.id}`, options)
    .then((response) => response.json())
    .then(({ review }) => dispatch(updateReview(review)))
    .catch((error) => dispatch(handleReviewsError(error)));
};

export const deleteReview = (id) => (dispatch) => {
  csrfFetch(`/api/reviews/${id}`, { method: 'DELETE' })
    .then(() => dispatch(removeReview(id)))
    .catch((error) => dispatch(handleReviewsError(error)));
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
      console.log('hello', action.error);
      return {
        ...state,
        isLoading: false,
        errors: action.error.errors,
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
        items: { ...state.items },
      };
      delete newState.items[action.id];
      return newState;

    default:
      return state;
  }
};

export default reviewsReducer;
