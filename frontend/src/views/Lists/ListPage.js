import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleList } from '../../store/listsReducer';
import AlbumGrid from '../../components/AlbumGrid';
import { ListActions } from '../../components/ActionsPanel';
import { deleteList } from '../../store/listsReducer';
import './ListPage.css';

const ListPage = () => {
  const { listID } = useParams();
  const list = useSelector((state) => state.lists.items[listID]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (list && list.albums?.length) {
      setIsLoading(false);
      return;
    }

    return dispatch(fetchSingleList(+listID))
      .then(() => setIsLoading(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          console.log('error fetching list', data);
        }
      });
  }, [dispatch]);

  const handleDelete = () => {
    return dispatch(deleteList(+listID))
      .then(() => history.push('/'))
      .catch((err) => console.log('error deleting list', err));
  };

  return (
    !isLoading &&
    list.albums.length > 0 && (
      <div className="list-page">
        <div className="content-wrap">
          <section className="list-page-header">
            <h1>{list.title}</h1>
            <p>{list.description}</p>
          </section>
          <main className="list-page-main">
            <AlbumGrid albums={list.albums} isRanked={list.isRanked} />
          </main>
        </div>
        <section className="list-page-side">
          {/* <div className="actions-panel edit-actions">
            {list.userID === sessionUser?.id && (
              <>
                <ActionsRow
                  label="Edit this list..."
                  className="list-action"
                  link={`/lists/${listID}/edit`}
                />
                <ActionsRow
                  label="Delete this list..."
                  className="list-action delete"
                  onClick={() => handleDelete()}
                />
              </>
            )}
          </div> */}
          <ListActions
            userID={list.userID}
            sessionUserID={sessionUser.id}
            listID={listID}
            handleDelete={handleDelete}
          />
        </section>
      </div>
    )
  );
};

export default ListPage;
