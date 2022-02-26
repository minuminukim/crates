import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../store/commentsReducer';
import { fetchSingleUser } from '../../store/usersReducer';
import Comment from './Comment';
import './Comment.css';

const CommentSection = () => {
  const { reviewID } = useParams();
  const dispatch = useDispatch();
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
  }, [dispatch, history, reviewID]);

  return (
    !loading && (
      <section>
        <h3 className="section-heading">{comments.length} COMMENTS</h3>
        <ul>
          {comments?.map((comment) => (
            <Comment key={`comment-${comment.id}`} comment={comment} />
          ))}
        </ul>
      </section>
    )
  );
};

export default CommentSection;
