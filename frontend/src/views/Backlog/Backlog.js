import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchUserBacklog,
  appendBacklog,
  removeFromBacklog,
} from '../../store/backlogsReducer';
import areAllUnique from '../../utils/areAllUnique';
import { BacklogGrid } from '.';
import { Empty } from '../User';
import { useSearch } from '../../hooks';
import { SearchField, SearchItem } from '../../components/Search';
import { ErrorMessages } from '../../components/ValidationError';
import './Backlog.css';

const Backlog = ({ username }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { userID } = useParams();
  const users = useSelector((state) => state.users)
  const [albums, setAlbums] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const { query, setQuery, results, isLoading, searchErrors } = useSearch();
  const [showList, setShowList] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!username) {
      
    }
    const fetchBacklog = async () => {
      const backlog = await dispatch(fetchUserBacklog(+userID));
      setAlbums(backlog);
    };

    fetchBacklog().then(() => setLoading(false));
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
        .then(() => {
          setMessage(`You have added '${item.title}' to your backlog.`);
          setAlbums([...albums, item]);
          // setTimeout(() => setAlbums([...albums, item]), 1000);
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

  const updateGrid = (removedID) =>
    setAlbums([...albums.filter((album) => album.id !== removedID)]);

  return (
    !loading && (
      <>
        <div>
          <ErrorMessages success={message} errors={errors} />
          <h2 className="section-heading">
            {username} WANTS TO LISTEN TO {albums.length} ALBUMS
          </h2>
          <section className="backlog-container">
            {albums.length > 0 ? (
              <BacklogGrid albums={albums} updateGrid={updateGrid} />
            ) : (
              <Empty item="albums" />
            )}
          </section>
        </div>
        <div className="side">
          {sessionUser && sessionUser.id === +userID && (
            <>
              <div>
                <h3 className="section-heading">HOW TO ADD</h3>
                <p>
                  Add albums you want to hear to your backlog by clicking the
                  Watchlist icon in the actions panel on a review page.
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
                  onBlur={null}
                  error={searchErrors}
                />
                {!searchErrors?.length && showList && (
                  <ul
                    className={`search-list ${showList ? 'absolute' : 'block'}`}
                  >
                    {!isLoading &&
                      results?.length > 0 &&
                      results.map((item) => (
                        <SearchItem
                          key={item.spotifyID}
                          title={item.title}
                          artist={item.artist}
                          releaseYear={item.releaseYear}
                          onClick={() => handleDispatch(item)}
                        />
                      ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </>
    )
  );
};

export default Backlog;
