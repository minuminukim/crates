import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviews } from '../../store/reviewsReducer';
import { fetchSingleUser } from '../../store/usersReducer';
import ProfileHeader from './ProfileHeader';
import CardRow from '../../components/CardRow';
import ReviewListItem from '../../components/ReviewListItem';
import { sortByRecent } from '../../utils/sorts';
import { Empty } from '.';

const Profile = () => {
  const { userID } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const [reviews, user] = await Promise.all([
          dispatch(getReviews()),
          dispatch(fetchSingleUser(+userID)),
        ]);
        const filtered = reviews.filter((review) => review.userID === user.id);
        setReviews(sortByRecent([...filtered]));
        setUser(user);
        setLoading(false);
      } catch (res) {
        return res;
      }
    })();
  }, [dispatch, userID]);

  return (
    !loading && (
      <div className="profile-content">
        <section className="profile-header">
          <ProfileHeader username={user.username} />
        </section>
        <section>
          <h2 className="section-heading">RECENT ACTIVITY</h2>
          {reviews?.length > 0 ? (
            <CardRow items={reviews.slice(0, 4)} />
          ) : (
            <Empty />
          )}
        </section>
        {reviews?.length > 0 && (
          <section>
            <h2 className="section-heading">RECENT REVIEWS</h2>
            {reviews
            // we only want the ones that have bodies
            .filter((review) => review.body)
            .slice(0, 4)
            .map((review) => (
              <ReviewListItem
                key={`${review.id}`}
                review={review}
                shape="landscape"
              />
            ))}
          </section>
        )}
      </div>
    )
  );
};

export default Profile;
