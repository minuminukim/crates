import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../store/reviewsReducer';
import CardRow from '../CardRow';
import StarRating from '../StarRating';
import './IndexView.css';

const sortByRecent = (items) => {
  return items.sort((a, b) => b.id - a.id);
};

const IndexView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.session);
  const sorted = sortByRecent(Object.values(items)).slice(0, 5);

  useEffect(() => {
    return dispatch(getReviews())
      .then((data) => console.log('do i get here', data))
      .then(() => setIsLoading(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          console.log('errors', data.errors);
        }
      });
  }, [dispatch]);

  return (
    <div className="page-container index">
      <section className="welcome-hero">
        <h1 className="welcome-heading">
          Welcome back, <span>{user.username}</span>. Here's what your friends
          have been listening to...
        </h1>
      </section>
      <section className="recent-posts-section">
        <h2 className="recent-posts-heading">
          NEW FROM FRIENDS
        </h2>
        {!isLoading && <CardRow items={sorted} />}
      </section>
      {/* <StarRating /> */}
    </div>
  );
};

export default IndexView;
