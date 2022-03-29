import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import CardRow from '../../components/CardRow';
import ReviewListItem from '../../components/ReviewListItem';
import { Empty } from '.';
import './Profile.css';
import { fetchSingleUser } from '../../store/usersReducer';

const Profile = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const username = useSelector((state) => state.users[userID]?.username);
  const reviewIDs = useSelector((state) => state.users[userID]?.reviews);
  const [isLoading, setLoading] = useState(true);

  // we only want the ones that have bodies
  const mostRecentReviews = useSelector((state) => {
    if (!reviewIDs) return [];
    return reviewIDs
      .filter((id) => state.reviews.items[id].body)
      .sort((a, b) => b - a)
      .slice(0, 4);
  });

  useEffect(() => {
    dispatch(fetchSingleUser(+userID))
      .then(() => setLoading(false))
      .catch((error) => console.log('Error fetching user data', error));
  }, [userID, dispatch]);

  return (
    !isLoading && (
      <div className="profile-content">
        <div>
          <section className="profile-header">
            <ProfileHeader username={username} />
          </section>
          <section className="profile-recent-activity">
            <h2 className="section-heading">RECENT ACTIVITY</h2>
            {reviewIDs?.length > 0 ? (
              <CardRow reviewIDs={reviewIDs} />
            ) : (
              <Empty />
            )}
          </section>

          <section className="profile-recent-reviews">
            <h2 className="section-heading">RECENT REVIEWS</h2>
            {mostRecentReviews.map((id) => (
              <ReviewListItem key={id} reviewID={id} shape="landscape" />
            ))}
          </section>
        </div>
      </div>
    )
  );
};

export default Profile;
