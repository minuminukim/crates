import { useState } from 'react';
import { useSelector } from 'react-redux';
import InputField from '../InputField';
import InputLabel from '../InputLabel';
import useSearch from '../../hooks/useSearch';
import SearchBar from '../SearchBar';
import SearchList from '../SearchList';
import { SaveButton } from '../Button/SaveDeleteButtons';
import Button from '../Button';
import './ListForm.css';

// <ListInfo>
// <Search>
// <ListStructure>
// Please enter the list name.
// A list must contain at least one album.
const ListForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isRanked, setIsRanked] = useState(false);
  const [errors, setErrors] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { user } = useSelector((state) => state.session);
  const { query, setQuery, results, isLoading, error } = useSearch();
  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="page-container list-form-page">
      <header className="page-header">
        <h1 className="page-heading">New List</h1>
      </header>
      <main>
        <section className="list-form-details">
          <form className="list-form" onSubmit={handleSubmit}>
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
              <div className="form-row">
                <Button label="ADD A FILM" />
                <InputField
                  id="search"
                  value={query}
                  onChange={handleChange}
                  placeholder="Enter name of album..."
                />
                <Button label="CANCEL" />
                <SaveButton />
              </div>
            </div>
          </form>
        </section>
        <section className="list-form-search">
          {/* <SearchBar value={query} onChange={handleChange} id="search" />
          {results?.length > 0 && <SearchList items={results} />} */}
        </section>
      </main>
    </div>
  );
};

export default ListForm;
