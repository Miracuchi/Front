/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import TripInfo from './TripInfo';
import PassengerInfo from './PassengerInfo';
import InputSearch from './InputSearch';
import Calendar from './Calendar';
import SearchButton from './SearchButton';
import '../Styles/SearchBar.css';
import Slider from './Slider';

library.add(faChevronUp, faChevronDown);

function SearchBar() {
  return (
    <div id="searchBar">
      <div id="allInfo">
        <TripInfo />
        <PassengerInfo />
      </div>
      <div id="allInput">
        <InputSearch />
        <Calendar />
        <SearchButton />
      </div>
      <div>
        <Slider />
      </div>
    </div>
  );
}

export default SearchBar;
