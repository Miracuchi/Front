import React from 'react';
import '../Styles/SearchButton.css';

function SearchButton() {
  document.getElementsByTagName('button');

  return (
    <>
      <button type="submit" id="searchButton">Search</button>
      <label className="switch" htmlFor="slider">
        <input type="checkbox" />
        <span className="slider" />
      </label>

    </>
  );
}

export default SearchButton;
