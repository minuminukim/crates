import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../../store/listsReducer';
import ListCard from '../../components/ListCard';
import Button from '../../components/Button';
import './Lists.css';

const Lists = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.items);

  useEffect(() => {
    return dispatch(fetchLists()).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        console.log('Error in ListsView:', data.errors);
      }
    });
  }, [dispatch]);

  return (
    Object.keys(lists)?.length > 0 && (
      <div className="page-container lists-view-container">
        <div className="lists-view-wrapper">
          <section className="lists-header">
            <h1 className="page-heading">
              Collect, curate, and share. Lists are the perfect way to group
              albums.
            </h1>
            <Button
              label="Start your own list"
              onClick={() => history.push('/lists/new')}
            />
          </section>
          <section className="popular-lists">
            <h2 className="section-heading">POPULAR THIS WEEK</h2>
            <div className="popular-lists">
              <ListCard list={lists[1]} size="large" />
              <ListCard list={lists[2]} size="large" />
              <ListCard list={lists[5]} size="large" />
            </div>
          </section>
        </div>
      </div>
    )
  );
};

export default Lists;
