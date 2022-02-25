import { useSelector } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import CardRow from '../../components/CardRow';
import ReviewListItem from '../../components/ReviewListItem';
import { sortByRecent } from '../../utils/sorts';
import { Empty } from '.';

const Profile = ({ user }) => {
  const { items } = useSelector((state) => state.reviews);
  console.log('reviews', user.reviews);
  const reviews = user.reviews.map(({ id }) => items[id]);
  const sorted = sortByRecent([...reviews]);

  return (
    <div className="profile-content">
      <section className="profile-header">
        <ProfileHeader username={user.username} />
      </section>
      <section>
        <h2 className="section-heading">RECENT ACTIVITY</h2>
        {reviews?.length > 0 ? (
          <CardRow items={sorted.slice(0, 4)} />
        ) : (
          <Empty />
        )}
      </section>
      {reviews?.length > 0 && (
        <section>
          <h2 className="section-heading">RECENT REVIEWS</h2>
          {sorted
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
  );
};

export default Profile;
