import { csrfFetch } from './csrf';

export const COMMENTS_LOADED = 'comments/COMMENTS_LOADED';
export const COMMENT_ADDED = 'comments/COMMENT_ADDED';
const COMMENT_UPDATED = 'comments/COMMENT_UPDATED';
export const COMMENT_REMOVED = 'comments/COMMENT_REMOVED';

const commentsLoaded = (comments, reviewID = null) => ({
  type: COMMENTS_LOADED,
  comments,
  reviewID,
});

const commentAdded = (comment) => ({
  type: COMMENT_ADDED,
  comment,
});

const commentUpdated = (comment) => ({
  type: COMMENT_UPDATED,
  comment,
});

const commentRemoved = (commentID, reviewID) => ({
  type: COMMENT_REMOVED,
  commentID,
  reviewID,
});

export const fetchComments =
  (reviewID = null) =>
  async (dispatch) => {
    const url = reviewID
      ? `/api/reviews/${reviewID}/comments`
      : `/api/comments`;
    const response = await csrfFetch(url);
    const { comments } = await response.json();
    dispatch(commentsLoaded(comments, reviewID));

    return comments;
  };

export const postComment = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const { comment } = await response.json();
  dispatch(commentAdded(comment));
  return comment;
};

export const editComment = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  const { comment } = await response.json();
  dispatch(commentUpdated(comment));
  return comment;
};

export const deleteComment = (commentID, reviewID) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${commentID}`, {
    method: 'DELETE',
  });

  dispatch(commentRemoved(commentID, reviewID));
  return response;
};

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENTS_LOADED:
      const comments = action.comments.reduce(
        (acc, comment) => {
          if (!acc[comment.id]) {
            const current = { ...comment };
            delete current.user;
            acc[comment.id] = current;
          }
          return acc;
        },
        { ...state }
      );

      return {
        ...comments,
      };

    case COMMENT_ADDED:
    case COMMENT_UPDATED:
      return {
        ...state,
        [action.comment.id]: action.comment,
      };

    case COMMENT_REMOVED:
      const next = { ...state };
      delete next[action.commentID];
      return next;

    default:
      return state;
  }
};

export default commentsReducer;
