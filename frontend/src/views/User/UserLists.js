import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserLists } from '../../store/listsReducer';
import FeedPost from '../../components/FeedPost';
import { Empty } from '.';
import { ActionsRow } from '../../components/ActionsPanel';
import './UserLists.css';

// TODO: paging -- render 12 lists per
const UserLists = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const listIDs = useSelector((state) => state.users[userID]?.lists);
  const sessionUserID = useSelector((state) => state.session.user?.id);
  const [loading, setLoading] = useState(true);

  const noLists = listIDs && listIDs.length === 0;
  const isSessionUser = sessionUserID === +userID;

  useEffect(() => {
    dispatch(fetchUserLists(+userID))
      .then(() => setLoading(false))
      .catch((err) => console.log(`Error fetching user ${userID} lists`, err));
  }, [dispatch, userID]);

  const listFeed = (
    <ul>
      {listIDs?.map((listID) => (
        <FeedPost key={`list-${listID}`} listID={listID} />
      ))}
    </ul>
  );

  return (
    !loading && (
      <div className="user-lists-content">
        <div className="user-lists-left">
          <h3 className="section-heading">ALL LISTS</h3>
          {noLists ? <Empty item="lists" /> : listFeed}
        </div>
        <div className="user-lists-right">
          {isSessionUser && (
            <ActionsRow
              label="Start a new list..."
              className="hover solo"
              link="/lists/new"
            />
          )}
        </div>
      </div>
    )
  );
};

export default UserLists;
