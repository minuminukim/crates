import { useSelector } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import CardRow from '../../components/CardRow';
import ReviewListItem from '../../components/ReviewListItem';
import { sortByRecent } from '../../utils/sorts';

const Profile = ({ user }) => {
  const { items } = useSelector((state) => state.reviews);
  console.log('reviews', user.reviews);
  const reviews = user.reviews.map(({ id }) => items[id]);
  const sorted = sortByRecent([...reviews]);

  return (
    <div>
      <section>
        <ProfileHeader username={user.username} />
      </section>
      <section>
        <h2 className="section-heading">RECENT ACTIVITY</h2>
        <CardRow items={sorted.slice(0, 4)} />
      </section>
      <section>
        <h2 className="section-heading">RECENT REVIEWS</h2>
        {sorted
          .filter((review) => review.body)
          .slice(0, 4)
          .map((review) => (
            <ReviewListItem review={review} shape="landscape" />
          ))}
      </section>
    </div>
  );
};

export default Profile;
