import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../../store/listsReducer';
import ListCard from '../../components/ListCard';
import Button from '../../components/Button';
import FeedPost from '../../components/FeedPost';
import { sortByRecent } from '../../utils/sorts';
import './Lists.css';

const Lists = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const listsObject = useSelector((state) => state.lists.items);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    return (
      dispatch(fetchLists())
        // .then((items) => console.log('items', items))
        .then((items) => setLists(items))
        .then(() => setIsLoading(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            console.log('Error in ListsView:', data.errors);
          }
        })
    );
  }, [dispatch]);

  return (
    !isLoading &&
    lists.length > 0 && (
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
              <ListCard list={listsObject[1]} size="large" />
              <ListCard list={listsObject[2]} size="large" />
              <ListCard list={listsObject[5]} size="large" />
            </div>
          </section>
          <section className="recently-shared">
            <h2 className="section-heading">RECENTLY SHARED</h2>
            <ul>
              {sortByRecent(lists)
                .slice(0, 10)
                .map((list, i) => (
                  <FeedPost key={`list-${i}`} list={list} />
                ))}
            </ul>
          </section>
        </div>
      </div>
    )
  );
};

export default Lists;
