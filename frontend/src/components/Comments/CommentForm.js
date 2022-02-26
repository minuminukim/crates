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
  onSuccess,
  method,
  toggle = null,
  initialBody = '',
  commentID = null,
  className = '',
}) => {
  const [body, setBody] = useState(initialBody);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const { reviewID } = useParams();
  const { user } = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      reviewID: +reviewID,
      userID: user?.id,
      body,
    };

    if (commentID) {
      payload.id = commentID;
    }

    const action = method === 'POST' ? postComment : editComment;

    return dispatch(action(payload))
      .then((comment) => {
        onSuccess(comment);
        setBody('');
        setErrors([]);
        setMessage(method === 'POST' ? 'Reply posted.' : 'Reply updated.');

        if (method === 'PUT') {
          const messageTimeout = setTimeout(() => toggle(), 3000);
          return () => clearTimeout(messageTimeout);
        }
      })

      .catch(async (err) => {
        const data = await err.json();
        console.log('data', data);
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`comment-form ${method} ${className}`}
    >
      {method === 'PUT' && (
        <div className="form-header">
          <h1>EDIT YOUR COMMENT</h1>
          <AiOutlineClose className="close-icon large" onClick={toggle} />
        </div>
      )}
      <div className="form-row">
        <CommentField
          onChange={(e) => setBody(e.target.value)}
          value={body}
          placeholder={method === 'POST' ? `Reply as ${user.username}...` : ''}
        />
      </div>
      <div className="btn-row">
        {method === 'POST' ? (
          <Button type="submit" className="btn-save" label="POST" />
        ) : (
          <>
            <Button className="btn-cancel" label="CANCEL" onClick={toggle} />
            <SaveButton label="UPDATE" />
          </>
        )}
      </div>
      <ErrorMessages errors={errors} success={message} />
    </form>
  );
};

export default CommentForm;
