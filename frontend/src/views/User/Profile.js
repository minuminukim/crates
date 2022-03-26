import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchReviews } from '../../store/reviewsReducer';
import { fetchSingleUser } from '../../store/usersReducer';
import ProfileHeader from './ProfileHeader';
import CardRow from '../../components/CardRow';
import ReviewListItem from '../../components/ReviewListItem';
import { sortByDateListened } from '../../utils/sorts';
import { Empty } from '.';
import './Profile.css';

const Profile = () => {
  const { userID } = useParams();
  const username = useSelector((state) => state.users[userID].username);
  const reviewIDs = useSelector((state) => state.users[userID].reviews);
  const reviews = useSelector((state) =>
    reviewIDs.map((id) => state.reviews.items[id])
  );
  const [loading, setLoading] = useState(true);
  // const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const [reviews, user] = await Promise.all([
  //         dispatch(fetchReviews()),
  //         dispatch(fetchSingleUser(+userID)),
  //       ]);
  //       const filtered = reviews.filter((review) => review.userID === user.id);
  //       setReviews(sortByDateListened([...filtered]));
  //       setUser(user);
  //       setLoading(false);
  //     } catch (res) {
  //       return res;
  //     }
  //   })();
  // }, [dispatch, userID]);

  return (
    <div className="profile-content">
      <div>
        <section className="profile-header">
          <ProfileHeader username={username} />
        </section>
        <section className="profile-recent-activity">
          <h2 className="section-heading">RECENT ACTIVITY</h2>
          {reviewIDs?.length > 0 ? (
            <CardRow reviewIDs={reviewIDs.slice(0, 4)} />
          ) : (
            <Empty />
          )}
        </section>
        {reviews?.length > 0 && (
          <section className="profile-recent-reviews">
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
    </div>
  );
};

export default Profile;
