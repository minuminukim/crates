import useSearch from '../../hooks/useSearch';
import SearchBar from '../SearchBar';
import SearchList from '../SearchList';
import './SearchModal.css';

const SearchModal = ({ closeSearch = null }) => {
  const { query, setQuery, results, isLoading, error } = useSearch();
  const handleChange = (e) => setQuery(e.target.value);

  return (
    <form className="search-modal" onSubmit={(e) => e.preventDefault()}>
      <div className="form-section">
        <h1 className="search-modal-heading">ADD TO YOUR ALBUMS...</h1>
      </div>
      <div className="form-section">
        <div className="form-input-group">
          <label htmlFor="search" className="form-label">
            Name of Album
          </label>
          <SearchBar value={query} onChange={handleChange} id="search" />
        </div>
      </div>
      {results?.length > 0 && (
        <SearchList items={results} closeSearch={closeSearch} />
      )}
    </form>
  );
};

export default SearchModal;
