import DiaryItem from '../../components/DiaryItem';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getReviewsByUserID } from '../../store/reviewsReducer';
import { useParams } from 'react-router-dom';
import { Empty } from '.';

const Diary = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const history = useHistory();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);

  console.log('reviews', reviews);

  const sortByDateListened = (reviews) => {
    return [...reviews].sort(
      (a, b) => new Date(b.listenedDate) - new Date(a.listenedDate)
    );
  };

  useEffect(() => {
    dispatch(getReviewsByUserID(+userID))
      // .then((reviews) => sortByRecent(reviews))
      .then((reviews) => sortByDateListened(reviews))
      .then((sorted) => setReviews(sorted))
      .then(() => setLoading(false))
      .catch(async (res) => {
        if (res && res?.status === 404) {
          history.push('/not-found');
        }
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
