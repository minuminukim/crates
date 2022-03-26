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

  // we only want the ones that have bodies
  const filtered = useSelector((state) =>
    reviewIDs
      .filter((id) => state.reviews.items[id].body)
      .sort((a, b) => b - a)
      .slice(0, 4)
  );

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
        {filtered?.length > 0 && (
          <section className="profile-recent-reviews">
            <h2 className="section-heading">RECENT REVIEWS</h2>
            {filtered.map((id) => (
              <ReviewListItem key={`${id}`} reviewID={id} shape="landscape" />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Profile;
