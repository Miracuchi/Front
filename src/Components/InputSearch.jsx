/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import UseClickOutside from './ClickOutsideHandler';
import '../Styles/InputSearch.css';

function InputSearch() {
  const [searchValueFrom, setSearchValueFrom] = useState('');
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [popularSuggestions, setPopularSuggestions] = useState([]);
  const [searchValueTo, setSearchValueTo] = useState('');
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [popularSuggestionsFromParis, setPopularSuggestionsFromParis] = useState([]);
  const [isSuggestionListFromVisible, setSuggestionListFromVisible] = useState(false);
  const [isSuggestionListToVisible, setSuggestionListToVisible] = useState(false);
  const [isPopularFromParisVisible, setIsPopularFromParisVisible] = useState(false);

  const refs = {
    suggestionsFromInfo: useRef(null),
    suggestionsToInfo: useRef(null),
  };

  const handleClickOutsideSuggestionsFrom = () => {
    setSuggestionListFromVisible(false);
  };

  const handleClickOutsideSuggestionsTo = () => {
    setSuggestionListToVisible(false);
  };

  UseClickOutside(refs.suggestionsFromInfo, handleClickOutsideSuggestionsFrom);
  UseClickOutside(refs.suggestionsToInfo, handleClickOutsideSuggestionsTo);

  const apiUrls = {
    suggestions: 'https://api.comparatrip.eu/cities/autocomplete/?q=par',
    popularCities: 'https://api.comparatrip.eu/cities/popular/5',
    suggestionsFromParis: 'https://api.comparatrip.eu/cities/popular/from/paris/5',
  };

  async function fetchData(api, value) {
    const params = {
      query: value,
    };
    const response = await axios.get(api, { params });
    return response.data;
  }

  async function fetchSuggestions(value) {
    return fetchData(apiUrls.suggestions, value);
  }

  async function fetchPopularCities(value) {
    return fetchData(apiUrls.popularCities, value);
  }

  async function fetchSuggestionsFromParis(value) {
    return fetchData(apiUrls.suggestionsFromParis, value);
  }

  function handleChange(event, searchType) {
    const { value } = event.target;
    if (searchType === 'from') {
      setSearchValueFrom(value);
      if (value.trim() === '') {
        setSuggestionsFrom([]);
      } else {
        setSuggestionListFromVisible(true);
        fetchSuggestions(value)
          .then((apiSuggestions) => {
            setSuggestionsFrom(apiSuggestions);
          });
      }
    } else if (searchType === 'to') {
      setSearchValueTo(value);
      if (value.trim() === '') {
        setSuggestionsTo([]);
      } else {
        setSuggestionListToVisible(true);
        fetchSuggestions(value)
          .then((apiSuggestions) => {
            setSuggestionsTo(apiSuggestions);
          });
      }
    }
  }

  function handleSuggestionClick(searchType, suggestion) {
    if (searchType === 'from') {
      setSearchValueFrom(suggestion.local_name);
      setSuggestionsFrom([]);
      setSuggestionListFromVisible(false);
    } else if (searchType === 'to') {
      setSearchValueTo(suggestion.local_name);
      setSuggestionsTo([]);
      setSuggestionListToVisible(false);
    }
  }

  useEffect(() => {
    fetchPopularCities()
      .then((popularCities) => {
        setPopularSuggestions(popularCities);
      });
  }, []);

  useEffect(() => {
    if (searchValueFrom === 'Paris, Île-de-France, France') {
      fetchSuggestionsFromParis(searchValueTo)
        .then((fromParisSuggestions) => {
          setPopularSuggestionsFromParis(fromParisSuggestions);
          setIsPopularFromParisVisible(true);
        });
    } else {
      setIsPopularFromParisVisible(false);
    }
  }, [searchValueFrom, searchValueTo]);

  return (
    <>
      <input type="text" id="inputSearchFrom" value={searchValueFrom} onChange={(event) => handleChange(event, 'from')} placeholder="From: City, Station, or Airport" ref={refs.suggestionsFromInfo} />
      <input type="text" id="inputSearchTo" value={searchValueTo} onChange={(event) => handleChange(event, 'to')} placeholder="To: City, Station, or Airport" ref={refs.suggestionsToInfo} />
      {isSuggestionListFromVisible && (
        <div id="suggestionListFrom">
          <ul>
            {suggestionsFrom.map((element, id) => (
              <li key={id} onClick={() => handleSuggestionClick('from', element)}>
                {element.local_name}
              </li>
            ))}
          </ul>
          {searchValueFrom && (
          <div>
            <h3>Villes Populaires</h3>
            <ul>
              {popularSuggestions.map((element, id) => (
                <li key={id} onClick={() => handleSuggestionClick('from', element)}>
                  {element.local_name}
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      )}

      {isSuggestionListToVisible && (
        <div id="suggestionListTo">
          <ul>
            {suggestionsTo.map((element, id) => (
              <li key={id} onClick={() => handleSuggestionClick('to', element)}>
                {element.local_name}
              </li>
            ))}
            {isPopularFromParisVisible && searchValueFrom === 'Paris, Île-de-France, France' && (
            <>
              <h3>Villes Populaires au départ de Paris</h3>
              <ul>
                {popularSuggestionsFromParis.map((element, id) => (
                  <li key={id} onClick={() => handleSuggestionClick('to', element)}>
                    {element.local_name}
                  </li>
                ))}
              </ul>
            </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default InputSearch;
