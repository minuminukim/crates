import { csrfFetch } from './csrf';

const COMMENTS_LOADED = 'comments/COMMENTS_LOADED';
const COMMENT_ADDED = 'comments/COMMENT_ADDED';
const COMMENT_UPDATED = 'comments/COMMENT_UPDATED';

const loadComments = (comments) => ({
  type: COMMENTS_LOADED,
  comments,
});

const addComment = (comment) => ({
  type: COMMENT_ADDED,
  comment,
});

const updateComment = (comment) => ({
  type: COMMENT_UPDATED,
  comment,
});

export const fetchComments = () => async (dispatch) => {
  const response = await csrfFetch(`/api/comments`);
  const { comments } = await response.json();
  dispatch(loadComments(comments));
  return comments;
};

export const postComment = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const { comment } = await response.json();
  dispatch(addComment(comment));
  return comment;
};

export const editComment = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  const { comment } = await response.json();
  dispatch(updateComment(comment));
  return comment;
};

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENTS_LOADED:
      const comments = action.comments.reduce((acc, comment) => {
        acc[comment.id] = comment;
        return acc;
      }, {});
      return {
        ...state,
        ...comments,
      };

    case COMMENT_ADDED:
    case COMMENT_UPDATED:
      return {
        ...state,
        [action.comment.id]: action.comment,
      };

    default:
      return state;
  }
};

export default commentsReducer;
