import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchBacklogByUserID,
  appendBacklog,
  removeFromBacklog,
} from '../../store/backlogsReducer';
import { BacklogGrid } from '.';
import { Empty } from '../User';
import { useSearch } from '../../hooks';
import { SearchField, SearchItem } from '../../components/Search';
import { ErrorMessages } from '../../components/ValidationError';
import './Backlog.css';

const Backlog = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const username = useSelector((state) => state.users[userID]?.username)
  const backlog = useSelector((state) => state.backlogs.items[userID]);
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const { query, setQuery, results, isLoading, searchErrors } = useSearch();
  const [showList, setShowList] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  console.log('backlog', backlog);

  useEffect(() => {
    if (backlog) {
      setLoading(false);
      return;
    }

    dispatch(fetchBacklogByUserID(+userID)).then(
      () => setLoading(false),
      (error) => console.log('Error fetching backlog', error)
    );
  }, [dispatch, userID, username]);

  const handleDispatch = (item) => {
    setErrors([]);
    setShowList(false);

    const found = albums.some(({ spotifyID }) => spotifyID === item.spotifyID);

    if (found) {
      setErrors([...errors, 'Albums in a backlog must be unique.']);
    } else {
      setLoading(true);
      dispatch(appendBacklog(item, +userID))
        .then(({ backlog }) => {
          setMessage(`You have added '${item.title}' to your backlog.`);
          setAlbums([...backlog]);
          setLoading(false);
          setErrors([]);
        })
        .catch(async (error) => {
          const data = await error.json();
          if (data && data.errors) {
            setErrors([...errors, ...data.errors]);
          }
        });
    }
  };

  const onDelete = (album) => {
    dispatch(removeFromBacklog(album?.id, +userID))
      .then(() => {
        setMessage(`You have removed '${album.title}' from your backlog.`);
        updateGrid(album.id);
      })

      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const updateGrid = (removedID) =>
    setAlbums([...albums.filter((album) => album.id !== removedID)]);

  return (
    !loading && (
      <>
        <div className="backlog-content">
          <ErrorMessages success={message} errors={errors} />
          <section className="backlog-left">
            <h2 className="section-heading">
              {username} WANTS TO LISTEN TO {albums?.length}{' '}
              {albums?.length === 1 ? 'ALBUM' : 'ALBUMS'}
            </h2>
            <section className="backlog-grid">
              {backlog?.albums.length > 0 ? (
                <BacklogGrid
                  albums={albums}
                  updateGrid={updateGrid}
                  onDelete={onDelete}
                />
              ) : (
                <Empty item="albums" />
              )}
            </section>
          </section>
          <section className="backlog-right">
            {sessionUser && sessionUser.id === +userID && (
              <>
                <div className="side-panel">
                  <h3 className="section-heading">HOW TO ADD</h3>
                  <p>
                    Add albums you want to hear to your backlog by clicking the
                    Backlog icon in the actions panel on a review page, or input
                    a search in the field below.
                  </p>
                </div>
                <div>
                  <h3 className="section-heading">ADD AN ALBUM</h3>
                  <SearchField
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowList(true);
                    }}
                    onFocus={() => setShowList(true)}
                    onBlur={() => setShowList(false)}
                    error={searchErrors}
                  />
                  {!searchErrors?.length && showList && (
                    <ul
                      className={`search-list ${
                        showList ? 'absolute' : 'block'
                      }`}
                    >
                      {!isLoading &&
                        results?.length > 0 &&
                        results.map((item) => (
                          <SearchItem
                            key={item.spotifyID}
                            title={item.title}
                            artist={item.artist}
                            releaseYear={item.releaseYear}
                            onMouseDown={() => handleDispatch(item)}
                          />
                        ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </>
    )
  );
};

export default Backlog;
