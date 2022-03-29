import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorMessages } from '../ValidationError';
import { postComment, editComment } from '../../store/commentsReducer';
import { CommentField } from '.';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../Button';
import { SaveButton } from '../Button';

const CommentForm = ({
  isPost = true,
  toggle = null,
  initialBody = '',
  commentID = null,
  className = '',
}) => {
  const dispatch = useDispatch();
  const { reviewID } = useParams();
  const { user } = useSelector((state) => state.session);
  const [body, setBody] = useState(initialBody);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const action = isPost ? postComment : editComment;
  const isDisabled = inProgress || errors.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setInProgress(true);

    const payload = {
      reviewID: +reviewID,
      userID: user?.id,
      body,
    };

    if (commentID) {
      payload.id = commentID;
    }

    dispatch(action(payload))
      .then(() => {
        setBody('');
        setErrors([]);
        setMessage(isPost ? 'Reply posted.' : 'Reply updated.');
        setInProgress(false);
        if (!isPost) {
          const messageTimeout = setTimeout(() => toggle(), 2000);
          return () => clearTimeout(messageTimeout);
        }
      })

      .catch(async (err) => {
        const data = await err.json();
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });
  };

  const postButton = (
    <Button
      type="submit"
      className="btn-save"
      label="POST"
      disabled={isDisabled}
    />
  );

  const editButtons = (
    <>
      <Button
        className="btn-cancel"
        label="CANCEL"
        onClick={toggle}
        disabled={isDisabled}
      />
      <SaveButton label="UPDATE" disabled={isDisabled} />
    </>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={`comment-form ${isPost ? 'POST' : 'PUT'} ${className}`}
    >
      {!isPost && (
        <div className="form-header">
          <h1>EDIT YOUR COMMENT</h1>
          <AiOutlineClose className="close-icon large" onClick={toggle} />
        </div>
      )}
      <div className="form-row">
        <CommentField
          onChange={(e) => setBody(e.target.value)}
          value={body}
          placeholder={isPost ? `Reply as ${user.username}...` : ''}
        />
      </div>
      <div className="btn-row">{isPost ? postButton : editButtons}</div>
      <ErrorMessages errors={errors} success={message} />
    </form>
  );
};

export default CommentForm;
