import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../store/reviewsReducer';
import CardRow from '../CardRow';
import StarRating from '../StarRating';
import './IndexView.css';

const sortByRecent = (items) => {
  return items.sort((a, b) => b.id - a.id);
};

const IndexView = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.session);
  const sorted = sortByRecent(Object.values(items)).slice(0, 5);
  console.log('sorted', sorted);

  useEffect(() => {
    if (!Object.values(items).length) {
      dispatch(getReviews());
    }
    console.log('isLoading', isLoading);
  }, [items, dispatch]);

  return (
    <div className="page-container index">
      <section className="welcome-banner">
        <h2 className="welcome-heading">
          Welcome back, <span>{user.username}</span>. Here's what your friends have been
          listening to...
        </h2>
        <StarRating />
      </section>
      <section>{!isLoading && <CardRow items={sorted} />}</section>
    </div>
  );
};

export default IndexView;
