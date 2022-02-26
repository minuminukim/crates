import { Signature } from '.';

const Comment = ({ comment, onEdit }) => {
  return (
    <li className="comment">
      <Signature
        userID={comment.userID}
        username={comment.username}
        body={comment.body}
        commentID={comment.id}
        onEdit={onEdit}
      />
      <div className="comment-body">
        <p>{comment.body}</p>
      </div>
    </li>
  );
};

export default Comment;
