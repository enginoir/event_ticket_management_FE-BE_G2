import React from 'react';
import PropTypes from 'prop-types';

const Search = props => {
  const { searchValue, setSearchValue } = props;

  const handleSubmit = e => {
    if (e.key === 'Enter') {
      // handle endpoint and result here
    }
  };

  const handleChangeSearch = e => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <div onKeyDown={handleSubmit}>
      <input
        type='text'
        className='mr-3 border-primary rounded-md border-2 border-solid px-10 py-2 text-sm font-medium'
        placeholder='Search...'
        onChange={handleChangeSearch}
        value={searchValue}
      />
    </div>
  );
};

Search.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func
};

export default Search;