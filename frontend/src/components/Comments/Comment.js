import { useSelector } from 'react-redux';
import { Signature } from '.';

const Comment = ({ commentID }) => {
  const comment = useSelector((state) => state.comments[commentID]);

  if (!comment) {
    return null;
  }

  return (
    <li className="comment">
      <Signature
        userID={comment?.userID}
        commentID={commentID}
        reviewID={comment?.reviewID}
      />
      <div className="comment-body">
        <p>{comment?.body}</p>
      </div>
    </li>
  );
};

export default Comment;
