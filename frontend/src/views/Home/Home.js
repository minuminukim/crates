import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../store/reviewsReducer';
import CardRow from '../../components/CardRow';
import ReviewListItem from '../../components/ReviewListItem';
import './Home.css';

const sortByRecent = (items) => {
  return items.sort((a, b) => b.id - a.id);
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.session);
  const sorted = sortByRecent(Object.values(items)).slice(0, 4);
  const popular = Object.values(items).slice(0, 6);

  useEffect(() => {
    return dispatch(getReviews())
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
          Welcome back, <span>{user ? user.username : 'guest'}</span>. Here's what we've been
          listening to...
        </h1>
      </section>
      <section className="recent-posts-section">
        <h2 className="section-heading">NEW ON CRATES</h2>
        {!isLoading && <CardRow items={sorted} />}
      </section>
      <section className="popular">
        <h2 className="section-heading">POPULAR REVIEWS</h2>
        <ul>
          {popular.map((review) => (
            <li className="popular-list-item" key={`review-${review.id}`}>
              <ReviewListItem
                review={review}
                shape="block"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
