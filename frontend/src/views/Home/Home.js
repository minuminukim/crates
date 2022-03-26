import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../../store/reviewsReducer';
import CardRow from '../../components/CardRow';
import ReviewListItem from '../../components/ReviewListItem';
import { sortByDateListened } from '../../utils/sorts';
import './Home.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.session);
  const sorted = sortByDateListened(Object.values(items)).slice(0, 4);
  const popular = Object.values(items).slice(0, 6);
  const recentReviewIDs = sortByDateListened(Object.values(items))
    .slice(0, 4)
    .map(({ id }) => id);

  useEffect(() => {
    dispatch(fetchReviews())
      .then(() => setIsLoading(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          return data;
        }
      });
  }, [dispatch]);

  return (
    <div className="page-container index">
      <section className="welcome-hero">
        <h1 className="welcome-heading page-heading">
          Welcome back, <span>{user ? user.username : 'guest'}</span>. Here's
          what we've been listening to...
        </h1>
      </section>
      <section className="recent-posts-section">
        <h2 className="section-heading">NEW ON CRATES</h2>
        {!isLoading && (
          <CardRow items={sorted} reviewIDs={recentReviewIDs} feed="home" />
        )}
      </section>
      <section className="popular">
        <h2 className="section-heading">POPULAR REVIEWS</h2>
        <ul>
          {popular.map(({ id }) => (
            <li className="popular-list-item" key={`review-${id}`}>
              <ReviewListItem reviewID={id} shape="block" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
