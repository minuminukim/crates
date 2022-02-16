import './SearchBar.css';

const SearchBar = ({ id, value, onChange, placeholder = null }) => {
  return (
    <input
      id={id}
      name={id}
      type="text"
      className="search-input"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default SearchBar;
