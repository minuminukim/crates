import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorMessages } from '../ValidationError';
import { postComment } from '../../store/commentsReducer';
import Button from '../Button';

const CommentForm = () => {
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([]);
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

    return dispatch(postComment(payload))
      .then((res) => console.log('res', res))
      .catch(async (err) => {
        const data = await err.json();
        console.log('data', data);
        if (data && data.errors) {
          setErrors([...errors, ...Object.values(data.errors)]);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <textarea
          id="body"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <div>
        <Button type="submit" className="btn-save" label="POST" />
      </div>
      <ErrorMessages errors={errors} success={''} />
    </form>
  );
};

export default CommentForm;
