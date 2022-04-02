import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../../store/listsReducer';
import ListCard from '../../components/ListCard';
import Button from '../../components/Button';
import FeedPost from '../../components/FeedPost';
import './Lists.css';

const Lists = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);
  const listIDs = useSelector((state) => state.lists.listIDs);
  const byRecent = [...listIDs].sort((a, b) => b - a);

  useEffect(() => {
    dispatch(fetchLists()).then(
      () => setIsLoading(false),
      (error) => console.log('error fetching list', error)
    );
  }, [dispatch]);

  return (
    !isLoading &&
    listIDs.length > 0 && (
      <div className="page-container lists-view-container">
        <div className="lists-view-wrapper">
          <section className="lists-header">
            <h1 className="page-heading">
              Collect, curate, and share. Lists are the perfect way to group
              albums.
            </h1>
            {sessionUser && (
              <Button
                label="Start your own list"
                onClick={() => history.push('/lists/new')}
                className="transparent"
              />
            )}
          </section>
          <section className="popular-lists">
            <h2 className="section-heading">POPULAR THIS WEEK</h2>
            <div className="popular-lists">
              <ListCard listID={1} size="large" />
              <ListCard listID={2} size="large" />
              <ListCard listID={5} size="large" />
            </div>
          </section>
          <section className="recently-shared">
            <h2 className="section-heading">RECENTLY SHARED</h2>
            <ul>
              {byRecent
                .slice(0, 10)
                .map((listID, i) => (
                  <FeedPost key={`list-${i}`} listID={listID} />
                ))}
            </ul>
          </section>
        </div>
      </div>
    )
  );
};

export default Lists;
