import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../store/reviewsReducer';
import CardRow from '../CardRow';
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

  // TODO: figure out what's causing 404.. improper set session user.albums ?

  useEffect(() => {
    if (!Object.values(items).length) {
      dispatch(getReviews());
    }
    console.log('items', items);
  }, [items, dispatch]);
  return (
    <div className="page-container index">
      <section className="welcome-banner">
        <h2 className="welcome-heading">
          Welcome back, <span>friend</span>. Here's what your friends
          have been listening to...
        </h2>
      </section>
      <section>{!isLoading && <CardRow albums={sorted} />}</section>
    </div>
  );
};

export default IndexView;
