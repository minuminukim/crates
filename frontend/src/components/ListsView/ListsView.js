import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../../store/listsReducer';
import Button from '../Button';

const ListsView = () => {
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
      </div>
    )
  );
};

export default ListsView;
