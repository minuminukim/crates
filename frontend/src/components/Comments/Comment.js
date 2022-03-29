import { useSelector } from 'react-redux';
import { Signature } from '.';

const Comment = ({ commentID, onEdit, onDelete }) => {
  const comment = useSelector((state) => state.comments[commentID]);

  return (
    <li className="comment">
      <Signature
        userID={comment.userID}
        username={comment.username}
        body={comment.body}
        commentID={comment.id}
        reviewID={comment.reviewID}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <div className="comment-body">
        <p>{comment.body}</p>
      </div>
    </li>
  );
};

export default Comment;
