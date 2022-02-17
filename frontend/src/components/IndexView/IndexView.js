import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../store/reviewsReducer';
import CardRow from '../CardRow';
import Card from '../Card';
import './IndexView.css';

const IndexView = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (!Object.values(items).length) {
      dispatch(getReviews()).then(() => console.log('items', items));
    }
  }, [items, dispatch]);
  return null;
};

export default IndexView;
