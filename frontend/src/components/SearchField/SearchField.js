import ValidationError from '../ValidationError';
import { InputField } from '../InputField';

const SearchField = ({ query, error, onChange, onFocus, onBlur }) => {
  return (
    <>
      <InputField
        id="search"
        value={query}
        onChange={onChange}
        placeholder="Enter name of album..."
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {error.length > 0 && <ValidationError error={error} />}
    </>
  );
};

export default SearchField;
