import { Signature } from '.';

const Comment = ({ comment, onEdit, onDelete }) => {
  return (
    <li className="comment">
      <Signature
        userID={comment.userID}
        username={comment.username}
        body={comment.body}
        commentID={comment.id}
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
