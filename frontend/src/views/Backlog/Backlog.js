import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBacklogByUserID } from '../../store/backlogsReducer';
import { BacklogGrid } from '.';
import BacklogPanel from './BacklogPanel';
import { Empty } from '../User';
import './Backlog.css';

const Backlog = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const username = useSelector((state) => state.users[userID]?.username);
  const albumIDs = useSelector((state) => state.backlogs.items[userID]?.albums);
  const [loading, setLoading] = useState(true);
  const sessionUserID = useSelector((state) => state.session.user?.id);
  const isSessionUser = sessionUserID === +userID;

  useEffect(() => {
    if (albumIDs) {
      setLoading(false);
      return;
    }

    dispatch(fetchBacklogByUserID(+userID)).then(
      () => setLoading(false),
      (error) => console.log('Error fetching backlog', error)
    );
  }, [dispatch, userID, albumIDs]);

  return (
    !loading && (
      <>
        <div className="backlog-content">
          <section className="backlog-left">
            <h2 className="section-heading">
              {username} WANTS TO LISTEN TO {albumIDs?.length}{' '}
              {albumIDs?.length === 1 ? 'ALBUM' : 'ALBUMS'}
            </h2>
            <section className="backlog-grid">
              {albumIDs?.length > 0 ? (
                <BacklogGrid userID={userID} />
              ) : (
                <Empty item="albums" />
              )}
            </section>
          </section>
          <section className="backlog-right">
            {isSessionUser && <BacklogPanel userID={userID} />}
          </section>
        </div>
      </>
    )
  );
};

export default Backlog;
