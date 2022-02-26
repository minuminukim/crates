import { useState } from 'react';
import useSearch from '../../hooks/useSearch';
import { SearchField, SearchItem, SearchList } from '../Search';
import { AiOutlineClose } from 'react-icons/ai';
import './SearchModal.css';

const SearchModal = ({ closeSearch = null }) => {
  const { query, setQuery, results, isLoading, searchErrors } = useSearch();
  // const [showForm, setShowForm] = useState(false);
  const handleChange = (e) => setQuery(e.target.value);

  return (
    <>
      <form className="search-modal" onSubmit={(e) => e.preventDefault()}>
        <div className="form-section search-top">
          <h1 className="search-modal-heading">ADD TO YOUR ALBUMS...</h1>
          <span className="modal-close">
            <AiOutlineClose
              className="modal-close close-icon"
              onClick={closeSearch}
            />
          </span>
        </div>
        <div className="form-section">
          <div className="form-input-group">
            <label htmlFor="search" className="form-label">
              Name of Album
            </label>
            <SearchField
              query={query}
              error={searchErrors}
              onChange={handleChange}
            />
            {/* <SearchBar value={query} onChange={handleChange} id="search" /> */}
            {results?.length > 0 && (
              <SearchList
                items={results}
                isModal={true}
                closeSearchModal={closeSearch}
              />
            )}
          </div>
        </div>
      </form>
      {/* {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <ReviewForm
            album={chosen}
            onSuccess={() => {
              closeSearch();
              setShowForm(false);
            }}
          />
        </Modal>
      )} */}
    </>
  );
};

export default SearchModal;
