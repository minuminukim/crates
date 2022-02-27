import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import useSearch from '../../hooks/useSearch';
import { InputField, InputLabel } from '../../components/InputField';
import { SaveButton } from '../../components/Button';
import { ErrorMessages } from '../../components/ValidationError';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import DraggableList from '../../components/DraggableList/DraggableList';
import { SearchField, SearchItem } from '../../components/Search';
import areAllUnique from '../../utils/areAllUnique';
import './ListForm.css';
import {
  createList,
  editList,
  fetchSingleList,
} from '../../store/listsReducer';

const ListForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isRanked, setIsRanked] = useState(false);
  const [errors, setErrors] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [action, setAction] = useState(null);
  const [message, setMessage] = useState('');
  const [showList, setShowList] = useState(false);
  const { user } = useSelector((state) => state.session);
  const { query, setQuery, results, isLoading, searchErrors } = useSearch();
  const dispatch = useDispatch();
  const history = useHistory();
  const { listID } = useParams();

  // an album was passed in as a prop when redirected
  // from the 'add to new list' action panel
  const location = useLocation();
  const data = location.state?.data;

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }

    if (!listID) {
      if (data) {
        setAlbums([data]);
      }
      setAction('post');
      return;
    }

    setAction('edit');
    (async () => {
      try {
        // if edit, we fetch the list and set form state
        const list = await dispatch(fetchSingleList(listID));

        // check if session user is the owner of this list
        if (list && list.userID !== user?.id) {
          return history.push('/unauthorized');
        }

        setTitle(list.title);
        setDescription(list.description);
        setIsRanked(list.isRanked);
        setAlbums(list.albums);
      } catch (error) {
        const data = await error.json();
        if (data && data.errors) {
          console.log('error fetching list', data);
          return history.push('/not-found');
        }
      }
    })();
  }, [user, listID, dispatch, data]);

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (albums.length === 0) {
      setErrors(['A list must contain at least one album.']);
      return;
    }

    if (!areAllUnique(albums)) {
      setErrors([...errors, 'Albums in a list must all be unique.']);
      return;
    }

    const payload = {
      userID: user.id,
      title,
      description,
      isRanked,
      albums,
      id: +listID,
    };

    const thunk = action === 'post' ? createList : editList;

    return dispatch(thunk(payload))
      .then((list) => {
        setMessage(`Your list '${list.title}' has been saved successfully.`);
        return list.id;
      })
      .then((listID) =>
        setTimeout(() => history.push(`/lists/${listID}`), 3000)
      )
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors([...Object.values(data.errors)]);
          return;
        }
      });
  };

  return (
    <div className="page-container list-form-page">
      <ErrorMessages success={message} errors={errors} />
      <form className="list-form" onSubmit={handleSubmit}>
        <h1 className="page-heading">
          {action === 'post' ? 'New List' : 'Edit List'}
        </h1>
        <div className="list-form-top">
          <div className="list-form-left">
            <div className="form-row">
              <InputLabel label="Name of list" required />
              <InputField
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-row checkbox">
              <Checkbox
                value={isRanked}
                onChange={() => setIsRanked(!isRanked)}
              >
                <InputLabel label="Ranked list">
                  <p className="label-details">Show position for each album.</p>
                </InputLabel>
              </Checkbox>
            </div>
          </div>
          <div className="list-form-right">
            <div className="form-row">
              <InputLabel label="Description" />
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="list-form-bottom">
          <div className="search-field">
            <SearchField
              query={query}
              error={searchErrors}
              onChange={handleChange}
              onFocus={() => setShowList(true)}
              onBlur={() => setShowList(false)}
            />
            {!searchErrors.length && showList && (
              <ul className={`search-list ${showList ? 'absolute' : 'block'}`}>
                {!isLoading &&
                  results?.length > 0 &&
                  results.map((item) => (
                    <SearchItem
                      key={item.spotifyID}
                      title={item.title}
                      artist={item.artist}
                      releaseYear={item.releaseYear}
                      onMouseDown={() => {
                        const found = albums.some(
                          ({ spotifyID }) => spotifyID === item.spotifyID
                        );

                        if (found) {
                          setErrors([
                            ...errors,
                            'Albums in a list must be unique.',
                          ]);
                        } else {
                          setAlbums([...albums, item]);
                          setShowList(false);
                        }
                      }}
                    />
                  ))}
              </ul>
            )}
          </div>
          <div className="list-form-btns">
            <Button
              className="btn-cancel"
              label="CANCEL"
              onClick={() => history.goBack()}
            />
            <SaveButton />
          </div>
        </div>
        <DraggableList
          items={albums}
          isRanked={isRanked}
          albums={albums}
          updateAlbums={(next) => setAlbums(next)}
        />
      </form>
    </div>
  );
};

export default ListForm;
