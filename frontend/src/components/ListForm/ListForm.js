import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createList } from '../../store/listsReducer';
import InputField from '../InputField';
import InputLabel from '../InputLabel';
import useSearch from '../../hooks/useSearch';
import SearchItem from '../SearchItem';
import { SaveButton } from '../Button/SaveDeleteButtons';
import ValidationError from '../ValidationError';
import Button from '../Button';
import './ListForm.css';
import DraggableList from '../DraggableList/DraggableList';

const ListForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isRanked, setIsRanked] = useState(false);
  const [errors, setErrors] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { user } = useSelector((state) => state.session);
  const { query, setQuery, results, isLoading, error } = useSearch();
  const dispatch = useDispatch();

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);

    const payload = {
      userID: user.id,
      title,
      description,
      isRanked,
      albums,
    };

    if (albums.length === 0) {
      setErrors([...errors, 'A list must contain at least one album.']);
    }

    return dispatch(createList(payload))
      .then((list) => console.log('successful post', list))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          return setErrors([...errors, ...Object.values(data.errors)]);
        }
        console.log('error', data);
      });
  };

  return (
    <div className="page-container list-form-page">
      <ul className="validation-errors">
        {errors.length >= 0 &&
          errors.map((error, i) => (
            <ValidationError key={error} error={error} index={i} />
          ))}
      </ul>
      <form className="list-form" onSubmit={handleSubmit}>
        <h1 className="page-heading">New List</h1>
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
            <div className="form-row">
              <InputLabel label="Ranked list" />
              <p>Show position for each album.</p>
              <InputField
                type="checkbox"
                id="isRanked"
                value={isRanked}
                onChange={() => setIsRanked(!isRanked)}
              />
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
          <div>
            <Button label="ADD A FILM" />
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
          <div>
            <Button label="CANCEL" />
            <SaveButton />
          </div>
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
