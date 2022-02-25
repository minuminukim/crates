import FeedPost from '../../components/FeedPost';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLists } from '../../store/listsReducer';
import { useHistory } from 'react-router-dom';
import { Empty } from '.';
import { ActionsRow } from '../../components/ActionsPanel';
import './UserLists.css';

// TODO: paging -- render 12 lists per
const UserLists = ({ userID }) => {
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState([]);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    return dispatch(fetchUserLists(userID))
      .then((items) => setLists(items))
      .then(() => setLoading(false))
      .catch((err) => console.log('error fetching UserLists', err));
  }, [dispatch, userID]);

  return !loading && lists?.length > 0 ? (
    <div className="user-lists-content">
      <div>
        <h3 className="section-heading">ALL LISTS</h3>
        <ul>
          {lists.map((list, i) => (
            <FeedPost key={`list-${i}`} list={list} />
          ))}
        </ul>
      </div>
      {userID === sessionUser?.id && (
        <div>
          <ActionsRow
            label="Start a new list..."
            className="hover solo"
            link="/lists/new"
          />
        </div>
      )}
    </div>
  ) : (
    <Empty item="lists" />
  );
};

export default UserLists;
