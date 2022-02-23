import DiaryItem from '../../components/DiaryItem';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getReviewsByUserID } from '../../store/reviewsReducer';
import { useParams } from 'react-router-dom';
import { ErrorMessages } from '../../components/ValidationError';

const Diary = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { userID } = useParams();

  useEffect(() => {
    dispatch(getReviewsByUserID(+userID))
      .then((reviews) => setReviews(reviews))
      .then(() => setLoading(false))
      .catch(async (err) => {
        const data = await err.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }, [dispatch]);

  return (
    !loading && (
      <div className="user-page-container">
        <ul>
          {reviews.map((review, i) => (
            <DiaryItem key={`entry-${i}`} entry={review} />
          ))}
        </ul>
        <ErrorMessages errors={errors} success={message} />
      </div>
    )
  );
};

export default Diary;
