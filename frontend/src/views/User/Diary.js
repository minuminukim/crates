import DiaryItem from '../../components/DiaryItem';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getReviewsByUserID } from '../../store/reviewsReducer';
import { useParams } from 'react-router-dom';
import { ErrorMessages } from '../../components/ValidationError';
import { sortByRecent } from '../../utils/sorts';
import { Empty } from '.';

const Diary = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const history = useHistory();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getReviewsByUserID(+userID))
      .then((reviews) => sortByRecent(reviews))
      .then((reviews) => setReviews(reviews))
      .then(() => setLoading(false))
      .catch(async (err) => {
        history.push('/not-found');
      });
  }, [dispatch, userID]);

  return (
    !loading && (
      <div className="diary-content">
        {reviews?.length > 0 ? (
          <table className="diary-table" cellSpacing="0" cellPadding="0">
            <thead>
              <tr>
                <th scope="col" className="month">
                  MONTH
                </th>
                <th scope="col" className="day">
                  DAY
                </th>
                <th scope="col" className="album">
                  ALBUM
                </th>
                <th scope="col" className="released">
                  RELEASED
                </th>
                <th scope="col" className="rating">
                  RATING
                </th>
                <th scope="col" className="relisten">
                  RELISTEN
                </th>
                <th scope="col" className="review">
                  REVIEW
                </th>
                {sessionUser?.id === +userID && (
                  <th scope="col" className="edit">
                    EDIT
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, i) => (
                <DiaryItem key={`entry-${i}`} entry={review} />
              ))}
            </tbody>
          </table>
        ) : (
          <Empty item="diary entries" />
        )}
      </div>
    )
  );
};

export default Diary;
