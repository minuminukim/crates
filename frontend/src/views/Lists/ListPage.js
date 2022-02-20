import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchSingleList } from '../../store/listsReducer';
import AlbumGrid from '../../components/AlbumGrid';
import { ActionsRow } from '../../components/ActionsPanel';
import './ListPage.css';

const ListPage = () => {
  const { listID } = useParams();
  const list = useSelector((state) => state.lists.items[listID]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

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
            <AlbumGrid albums={list.albums} />
          </main>
        </div>
        <section className="list-page-side">
          <div className="actions-panel edit-actions">
            {list.userID === sessionUser.id && (
              <ActionsRow
                label="Edit or delete this list..."
                className="list-action"
                link={`/lists/${listID}/edit`}
              />
            )}
          </div>
        </section>
      </div>
    )
  );
};

export default ListPage;
