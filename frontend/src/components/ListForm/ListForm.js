import { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchModal from '../SearchModal';
import InputField from '../InputField';
import InputLabel from '../InputLabel';
import useSearch from '../../hooks/useSearch';
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
  const [query, setQuery] = useState('');
  const { user } = useSelector((state) => state.session);
  return (
    <div className="page-container list-form-page">
      <section className="page-header">
        <h1 className="page-heading">New List</h1>
      </section>
      <main>
        <form className="list-form">
          <section className="list-form-left">
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
                onChange={(e) => setIsRanked(!isRanked)}
              />
            </div>
          </section>
          <section className="list-form-right">
            <div className="form-row">
              <InputLabel label="Description" />
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </section>
        </form>
      </main>
      <SearchModal />
    </div>
  );
};

export default ListForm;
