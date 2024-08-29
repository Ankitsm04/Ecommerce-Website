import React, { useState } from 'react';
import './SearchBar.css'; // Optional: For styling

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search products..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;