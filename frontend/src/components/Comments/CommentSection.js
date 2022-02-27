import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../store/commentsReducer';
import { fetchSingleUser } from '../../store/usersReducer';
import { Comment, CommentForm } from '.';
import { sortByRecent } from '../../utils/sorts';
import './Comment.css';

const CommentSection = () => {
  const { reviewID } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const comments = await dispatch(fetchComments());
        const filtered = Object.values(comments)?.filter(
          (comment) => comment.reviewID === +reviewID
        );
        const usernames = {};

        const response = await Promise.all(
          filtered.map(async (comment) => {
            if (!usernames[comment.userID]) {
              const { username } = await dispatch(
                fetchSingleUser(comment.userID)
              );
              usernames[comment.userID] = username;
            }
            const username = usernames[comment.userID];
            return { ...comment, username };
          })
        );

        setComments(sortByRecent(response));
        setLoading(false);
      } catch (res) {
        console.log('error fetching comments and users', res);
      }
    })();
  }, [dispatch, reviewID]);

  // helper that appends username to a new / edited comment because
  // that value isn't returned from the form
  const withUsername = (comment, sessionUser) => {
    const { username } = sessionUser;
    return { ...comment, username };
  };

  const onDelete = (commentID) =>
    setComments([...comments.filter((item) => item.id !== commentID)]);

  const onPost = (comment) => {
    const updated = [...comments, withUsername(comment, user)];
    setComments(sortByRecent(updated));
  };

  const onEdit = (comment) => {
    const updated = [
      ...comments.filter((item) => item.id !== comment.id),
      withUsername(comment, user),
    ];
    setComments(sortByRecent(updated));
  };

  return (
    !loading && (
      <section className="comments-section">
        <h3 className="section-heading">
          {comments.length} {comments.length === 1 ? 'COMMENT' : 'COMMENTS'}
        </h3>
        <ul className="comments-list">
          {comments?.map((comment) => (
            <Comment
              key={`comment-${comment.id}`}
              comment={comment}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
        {user && <CommentForm method="POST" onSuccess={onPost} />}
      </section>
    )
  );
};

export default CommentSection;
