import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  createList,
  editList,
  fetchSingleList,
} from '../../store/listsReducer';
import useSearch from '../../hooks/useSearch';
import { InputField, InputLabel } from '../../components/InputField';
import SearchItem from '../../components/SearchItem';
import { SaveButton } from '../../components/Button';
import ValidationError from '../../components/ValidationError';
import { SuccessMessage } from '../../components/ValidationError';
import Button from '../../components/Button';
import DraggableList from '../../components/DraggableList/DraggableList';
import './ListForm.css';

const ListForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isRanked, setIsRanked] = useState(false);
  const [errors, setErrors] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [action, setAction] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useSelector((state) => state.session);
  const { query, setQuery, results, isLoading, error } = useSearch();
  const dispatch = useDispatch();
  const history = useHistory();
  const { listID } = useParams();

  useEffect(() => {
    if (!listID) {
      setAction('post');
      return;
    }

    setAction('edit');
    (async () => {
      try {
        // if edit, we fetch the list and set form state
        const list = await dispatch(fetchSingleList(listID));

        // check if session user is the owner of this list
        if (list && list.userID !== user.id) {
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
  }, [dispatch]);

  const handleChange = (e) => setQuery(e.target.value);

  const areAllUnique = (albums) => {
    const mapped = albums.map((album) => album.spotifyID);
    const unique = [...new Set(mapped)];
    return unique.length === mapped.length;
  };

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
        setMessage(`Your list ${list.title} has been saved successfully.`);
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
        console.log('error', data);
      });
  };

  return (
    <div className="page-container list-form-page">
      {message.length > 0 && <SuccessMessage message={message} />}
      <ul className="validation-errors">
        {errors.length > 0 &&
          errors.map((error, i) => (
            <ValidationError key={`error-${i}`} error={error} index={i} />
          ))}
      </ul>
      <form className="list-form" onSubmit={handleSubmit}>
        <h1 className="page-heading">
          {action === 'post' ? 'New List' : 'Edit List'}
        </h1>
        <div className="list-form-top">
          <div className="list-form-left">
            <div className="form-row">
              <InputLabel label="Name of list" />
              <InputField
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-row checkbox">
              <InputField
                type="checkbox"
                id="isRanked"
                value={isRanked}
                onChange={() => setIsRanked(!isRanked)}
                checked={isRanked}
              />
              <div>
                <InputLabel label="Ranked list" />
                <p>Show position for each album.</p>
              </div>
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
          <Button label="ADD AN ALBUM" />
          <div className="search-field">
            <InputField
              id="search"
              value={query}
              onChange={handleChange}
              placeholder="Enter name of album..."
            />
            <ul className="search-list">
              {!isLoading &&
                results?.length > 0 &&
                results.map((item) => (
                  <SearchItem
                    key={item.spotifyID}
                    title={item.title}
                    artist={item.artist}
                    releaseYear={item.releaseYear}
                    onClick={() => setAlbums([...albums, item])}
                  />
                ))}
            </ul>
          </div>

          <Button label="CANCEL" onClick={() => history.goBack()} />
          <SaveButton disabled={errors && errors.length > 0} />
        </div>
      </form>
      {/* {albums?.length > 0 && albums.map((album) => album.title)} */}
      <DraggableList
        items={albums}
        isRanked={isRanked}
        albums={albums}
        updateAlbums={(next) => setAlbums(next)}
      />
      {/* <section className="list-form-search">
        <SearchBar value={query} onChange={handleChange} id="search" />
          {results?.length > 0 && <SearchList items={results} />}
      </section> */}
    </div>
  );
};

export default ListForm;
