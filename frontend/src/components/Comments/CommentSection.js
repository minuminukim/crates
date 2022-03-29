import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../store/commentsReducer';
import { Comment, CommentForm } from '.';
import './Comment.css';

const CommentSection = () => {
  const dispatch = useDispatch();
  const { reviewID } = useParams();
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.session.user !== null);
  const commentIDs = useSelector(
    (state) => state.reviews.items[reviewID]?.comments
  );

  useEffect(() => {
    setLoading(true);
    dispatch(fetchComments(+reviewID))
      .then(() => setLoading(false))
      .catch((error) =>
        console.log(`Error fetching comments for review ${reviewID}`, error)
      );
  }, [reviewID, dispatch]);

  if (loading || !commentIDs) {
    return null;
  }

  return (
    !loading &&
    commentIDs && (
      <section className="comments-section">
        <h3 className="section-heading">
          {commentIDs.length} {commentIDs.length === 1 ? 'COMMENT' : 'COMMENTS'}
        </h3>
        <ul className="comments-list">
          {commentIDs?.map((commentID) => (
            <Comment key={`comment-${commentID}`} commentID={+commentID} />
          ))}
        </ul>
        {isLoggedIn && <CommentForm isPost />}
      </section>
    )
  );
};

export default CommentSection;
