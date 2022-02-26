import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../store/commentsReducer';
import { fetchSingleUser } from '../../store/usersReducer';
import { Comment, CommentForm } from '.';
import './Comment.css';

const CommentSection = () => {
  const { reviewID } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  // const comments = useSelector((state) => state.comments);
  // const users = useSelector((state) => state.users);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const comments = await dispatch(fetchComments());
        const filtered = Object.values(comments)?.filter(
          (comment) => comment.reviewID === +reviewID
        );
        const response = await Promise.all(
          filtered.map(async (comment) => {
            const { username } = await dispatch(
              fetchSingleUser(comment.userID)
            );
            return { ...comment, username };
          })
        );
        setComments(response);
        setLoading(false);
      } catch (res) {
        console.log('error fetching comments and users', res);
      }
    })();
  }, [dispatch, reviewID]);

  const onPost = (comment) => setComments([...comments, comment]);
  const onEdit = (comment) =>
    setComments([
      ...comments.filter((item) => item.id !== comment.id),
      comment,
    ]);

  return (
    !loading && (
      <section className="comments-section">
        <h3 className="section-heading">{comments.length} COMMENTS</h3>
        <ul className="comments-list">
          {comments?.map((comment) => (
            <Comment
              key={`comment-${comment.id}`}
              comment={comment}
              onEdit={onEdit}
            />
          ))}
        </ul>
        {user && <CommentForm method="POST" onSuccess={onPost} />}
      </section>
    )
  );
};

export default CommentSection;
