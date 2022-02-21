import FeedPost from '../../components/FeedPost';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserLists } from '../../store/listsReducer';
import { useHistory } from 'react-router-dom';
import { ActionsRow } from '../../components/ActionsPanel';

const UserLists = ({ userID }) => {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    return dispatch(fetchUserLists(userID))
      .then((items) => setLists(items))
      .then(() => setLoading(false))
      .catch((err) => console.log('error fetching UserLists', err));
  }, [dispatch, userID]);

  return (
    !loading &&
    lists.length > 0 && (
      <div className="page-container user-lists-page">
        <div>
          <h3 className="section-heading">ALL LISTS</h3>
          <ul>
            {lists.map((list, i) => (
              <FeedPost key={`list-${i}`} list={list} />
            ))}
          </ul>
        </div>
        <div>
          <ActionsRow
            label="Start a new list"
            className="hover"
            link="/lists/new"
          />
        </div>
      </div>
    )
  );
};

export default UserLists;
