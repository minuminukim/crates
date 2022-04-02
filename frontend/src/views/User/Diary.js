import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import DiaryItem from '../../components/DiaryItem';
import {
  fetchReviewsByUserID,
  selectMostRecentReviews,
} from '../../store/reviewsReducer';
import { Empty } from '.';

const Diary = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userID } = useParams();
  const reviewIDs = useSelector((state) => state.users[userID]?.reviews);
  const [loading, setLoading] = useState(true);
  const isSessionUser = useSelector(
    (state) => state.session.user?.id === +userID
  );
  const mostRecentlyListened = useSelector((state) =>
    selectMostRecentReviews(state, reviewIDs)
  );

  useEffect(() => {
    // if (reviewIDs) {
    //   setLoading(false);
    //   return;
    // }
    dispatch(fetchReviewsByUserID(+userID))
      .then(() => setLoading(false))
      .catch(async (res) => {
        if (res && res?.status === 404) {
          history.push('/not-found');
        }
      });
  }, [dispatch, userID, history]);

  return (
    !loading && (
      <div className="diary-content">
        {mostRecentlyListened?.length > 0 ? (
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
                {isSessionUser && (
                  <th scope="col" className="edit">
                    EDIT
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {mostRecentlyListened?.map((reviewID, i) => (
                <DiaryItem key={`entry-${i}`} reviewID={reviewID} />
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
