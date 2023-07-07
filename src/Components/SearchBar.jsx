/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/SearchBar.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faChevronUp, faChevronDown);

function SearchBar() {
  const [searchValueFrom, setSearchValueFrom] = useState('');
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [popularSuggestions, setPopularSuggestions] = useState([]);
  const [searchValueTo, setSearchValueTo] = useState('');
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [popularSuggestionsFromParis, setPopularSuggestionsFromParis] = useState([]);
  const [selectedTravelType, setSelectedTravelType] = useState('One-way'); // "one-way" ou "round-trip"
  const [isOneWaySelected, setIsOneWaySelected] = useState(false);
  const [isRoundTripSelected, setIsRoundTripSelected] = useState(false);

  const [passengerCount, setPassengerCount] = useState({
    adult: 0,
    senior: 0,
    youth: 0,
  });

  const [isTravelInfoVisible, setIsTravelInfoVisible] = useState(false); // Ajoutez cette ligne

  const [isPassengerInfoVisible, setPassengerInfoVisible] = useState(false);
  const [isSuggestionListFromVisible, setSuggestionListFromVisible] = useState(false);
  const [isSuggestionListToVisible, setSuggestionListToVisible] = useState(false);

  const [isPopularFromParisVisible, setIsPopularFromParisVisible] = useState(false);

  const youthAgeOptions = [
    { value: 'Youth 0', label: '0 year' },
    { value: 'Youth 1', label: '1 year' },
    { value: 'Youth 2', label: '2 years' },
    { value: 'Youth 3', label: '3 years' },
    { value: 'Youth 4', label: '4 years' },
    { value: 'Youth 5', label: '5 years' },
    { value: 'Youth 6', label: '6 years' },
    { value: 'Youth 7', label: '7 years' },
    { value: 'Youth 8', label: '8 years' },
    { value: 'Youth 9', label: '9 years' },
    { value: 'Youth 10', label: '10 years' },
    { value: 'Youth 11', label: '11 years' },
    { value: 'Youth 12', label: '12 years' },
    { value: 'Youth 13', label: '13 years' },
    { value: 'Youth 14', label: '14 years' },
    { value: 'Youth 15', label: '15 years' },
    { value: 'Youth 16', label: '16 years' },
    { value: 'Youth 17', label: '17 years' },
    { value: 'Youth 18', label: '18 years' },
    { value: 'Youth 19', label: '19 years' },
    { value: 'Youth 20', label: '20 years' },
    { value: 'Youth 21', label: '21 years' },
    { value: 'Youth 22', label: '22 years' },
    { value: 'Youth 23', label: '23 years' },
    { value: 'Youth 24', label: '24 years' },
    { value: 'Youth 25', label: '25 years' },
  ];
  const [youthAges, setYouthAges] = useState({});

  const handleTripInfoClick = () => {
    setIsTravelInfoVisible(!isTravelInfoVisible);
  };
  const handlePassengerInfoClick = () => {
    setPassengerInfoVisible(!isPassengerInfoVisible);
  };

  // const excludedElements = useRef([]);
  // const excludedElements2 = useRef([]);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       !event.target.closest('#tripInfo')
  //       && !excludedElements.current.some((element) => element.contains(event.target))
  //     ) {
  //       setIsTravelInfoVisible(false);
  //     }
  //   }

  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  // useEffect(() => {
  //   function handleClickOutsidePassengerInfo(event) {
  //     if (
  //       !event.target.closest('#passengerCount')
  // && !excludedElements2.current.some((element) => element.contains(event.target))
  //     ) {
  //       setPassengerInfoVisible(false);
  //     }
  //   }

  //   document.addEventListener('click', handleClickOutsidePassengerInfo);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutsidePassengerInfo);
  //   };
  // }, []);
  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  // Inside your component
  const refs = {
    tripInfo: useRef(null),
    passengerInfo: useRef(null),
    suggestionsFromInfo: useRef(null),
    suggestionsToInfo: useRef(null),
  };

  const {
    tripInfo, passengerInfo, suggestionsFromInfo, suggestionsToInfo,
  } = refs;
  const useClickOutside = (ref, handleClickOutside) => {
    const handleClickOutsideEvent = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickOutside();
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClickOutsideEvent);
      return () => {
        document.removeEventListener('click', handleClickOutsideEvent);
      };
    }, [handleClickOutsideEvent]);
  };

  const handleClickOutsideTripInfo = () => {
    setIsTravelInfoVisible(false);
  };

  const handleClickOutsidePassengerCount = () => {
    setPassengerInfoVisible(false);
  };

  const handleClickOutsideSuggestionsFrom = () => {
    setSuggestionListFromVisible(false);
  };

  const handleClickOutsideSuggestionsTo = () => {
    setSuggestionListToVisible(false);
  };

  useClickOutside(tripInfo, handleClickOutsideTripInfo);
  useClickOutside(passengerInfo, handleClickOutsidePassengerCount);
  useClickOutside(suggestionsFromInfo, handleClickOutsideSuggestionsFrom);
  useClickOutside(suggestionsToInfo, handleClickOutsideSuggestionsTo);

  const handleTripTypeChange = (event) => {
    const selectedTravelType /* EST DECLARE DEUX FOIS */ = event.target.textContent;

    if (selectedTravelType === 'One-way') {
      setSelectedTravelType('One-way');
      setIsOneWaySelected(true);
      setIsRoundTripSelected(false);
    } else if (selectedTravelType === 'Round-trip') {
      setSelectedTravelType('Round-trip');
      setIsOneWaySelected(false);
      setIsRoundTripSelected(true);
    }
    setIsTravelInfoVisible(false);
    setSelectedTravelType(selectedTravelType);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const decreaseCount = (type) => {
    if (passengerCount[type] > 0) {
      setPassengerCount((prevCounts) => ({
        ...prevCounts,
        [type]: prevCounts[type] - 1,
      }));
    }
  };

  const increaseCount = (type) => {
    setPassengerCount((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));

    if (type === 'youth') {
      setYouthAges((prevAges) => ({
        ...prevAges,
        [type]: youthAgeOptions[0].value,
      }));
    }
  };

  useEffect(() => {
    // Calculer le nombre total de passagers
    const totalCount = passengerCount.adult + passengerCount.youth + passengerCount.senior;
    // Mettre à jour le nombre total de passagers dans l'interface utilisateur
    document.getElementById('totalPassengerCount').textContent = totalCount;
  }, [passengerCount]);

  async function fetchSuggestions(value) {
    const apiUrl = 'https://api.comparatrip.eu/cities/autocomplete/?q=par';
    const response = await axios.get(apiUrl, {
      params: {
        query: value,
      },
    });
    return response.data;
  }

  async function fetchPopularCities(value) {
    const apiUrlPopular = 'https://api.comparatrip.eu/cities/popular/5';
    const response = await axios.get(apiUrlPopular, {
      params: {
        query: value,
      },
    });
    return response.data;
  }

  async function fetchSuggestionsFromParis(value) {
    const apiUrlPopularSuggestionsFromParis = 'https://api.comparatrip.eu/cities/popular/from/paris/5';
    const response = await axios.get(apiUrlPopularSuggestionsFromParis, {
      params: {
        query: value,
      },
    });
    return response.data;
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
          })
          .catch((error) => {
            console.error(error);
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
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (value.trim() === '') {
        setPopularSuggestionsFromParis([]);
        setIsPopularFromParisVisible(false);
      } else if (value.trim() === 'Paris, Île-de-France, France') {
        fetchSuggestionsFromParis()
          .then((popularSuggestions/* EST DECLARE TROIS FOIS */) => {
            setPopularSuggestionsFromParis(popularSuggestions);
            setIsPopularFromParisVisible(true);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        fetchSuggestionsFromParis(value)
          .then((popularSuggestions) => {
            setPopularSuggestionsFromParis(popularSuggestions);
            setIsPopularFromParisVisible(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function handleSuggestionClick(searchType, suggestion) {
    if (searchType === 'from') {
      setSearchValueFrom(suggestion.local_name);
      setSuggestionsFrom([]);
      setSuggestionListFromVisible(false);
      setSearchValueFrom(suggestion.local_name);
      setSuggestionsFrom([]);
    } else if (searchType === 'to') {
      setSearchValueTo(suggestion.local_name);
      setSuggestionsTo([]);
      setSuggestionListToVisible(false);
      setSearchValueTo(suggestion.local_name);
      setSuggestionsTo([]);
    }
  }

  useEffect(() => {
    fetchPopularCities()
      .then((popularCities) => {
        setPopularSuggestions(popularCities);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (searchValueFrom === 'Paris, Île-de-France, France') {
      fetchSuggestionsFromParis()

        .then((popularSuggestions/* EST DECLARE DEUX FOIS */) => {
          setPopularSuggestionsFromParis(popularSuggestions);
        });
    } else {
      setPopularSuggestionsFromParis([]);
    }
  }, [searchValueFrom]);

  const noPropagation = (event, type, action) => {
    event.stopPropagation();
    action(type);
  };

  const noPropagationAge = (event) => {
    event.stopPropagation();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div id="searchBar">
      <div id="allInfo">
        <button type="button" id="selectedTripType" onClick={handleTripInfoClick} ref={tripInfo}>
          <span className="fontChevron">{selectedTravelType}</span>
          <FontAwesomeIcon icon={faChevronUp} className={isTravelInfoVisible ? 'rotate' : 'rotate2'} rotation={isTravelInfoVisible ? 0 : 180} />
        </button>
        <button type="button" id="passengerButton" onClick={handlePassengerInfoClick} ref={passengerInfo}>
          <span id="totalPassengerCount">0</span>
          <span className="fontChevron">Passagers</span>
          <FontAwesomeIcon icon={faChevronUp} className={isPassengerInfoVisible ? 'rotate' : 'rotate2'} rotation={isPassengerInfoVisible ? 0 : 180} />
        </button>
      </div>
      <div id="tripInfo" className={isTravelInfoVisible ? 'visible' : ''}>
        <div id="containerTravelInfo">
          <div id="travelInfoOne" onClick={handleTripTypeChange} onKeyUp={handleTripTypeChange} className={isOneWaySelected ? 'selected' : ''}>
            {isOneWaySelected && <i id="chevronOneWay" className="fa-solid fa-check" />}
            <span className="wayTextOne">One-way</span>
          </div>
          <div id="travelInfoRound" onClick={handleTripTypeChange} onKeyUp={handleTripTypeChange} className={isRoundTripSelected ? 'selected' : ''}>
            {isRoundTripSelected && <i id="chevronRoundTrip" className="fa-solid fa-check" />}
            <span className="wayTextRound">Round-trip</span>
          </div>
        </div>
      </div>

      <div id="passengerCount" className={isPassengerInfoVisible ? 'visible' : ''}>

        <div className="passengerInfo">
          <div className="passenger-label">
            <div>Adult</div>
            <div>26+ years</div>
          </div>
          <div className="passenger-controls">
            <button type="button" className="passenger-btn" onClick={(event) => noPropagation(event, 'adult', decreaseCount)}>-</button>
            <span className="passenger-count">{passengerCount.adult}</span>
            <button type="button" className="passenger-btn" onClick={(event) => noPropagation(event, 'adult', increaseCount)}>+</button>
          </div>
        </div>
        <span className="line" />
        <div className="passengerInfo">
          <div className="passenger-label">
            <div>Youth</div>
            <div>0-25 years</div>
          </div>
          <div className="passenger-controls">
            <button type="button" className="passenger-btn" onClick={(event) => noPropagation(event, 'youth', decreaseCount)}>-</button>
            <span className="passenger-count">{passengerCount.youth}</span>
            <button type="button" className="passenger-btn" onClick={(event) => noPropagation(event, 'youth', increaseCount)}>+</button>
          </div>
        </div>
        {passengerCount.youth > 0 && (

          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div id="youthAgeContainer" onClick={noPropagationAge}>

            {Array.from(Array(passengerCount.youth)).map((_, index) => (
              <div key={index} id="youthAgePerfil">
                <span id="ageDivider" />
                <div id="youthAgeInfo">
                  <span id="youthAgeText">
                    Youth
                    {index + 1}
                  </span>
                  <select
                    id="youthAge"
                    value={youthAges[index] || youthAgeOptions[0].value}
                    // eslint-disable-next-line max-len
                    onChange={(e) => setYouthAges((prevAges) => ({ ...prevAges, [index]: e.target.value }))}
                  >
                    {youthAgeOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}

                  </select>
                </div>

              </div>
            ))}
          </div>
        )}

        <span className="line" />
        <div className="passengerInfo">
          <div className="passenger-label">
            <div>Senior</div>
            <div>58+ years</div>
          </div>
          <div className="passenger-controls">
            <button type="button" className="passenger-btn" onClick={(event) => noPropagation(event, 'senior', decreaseCount)}>-</button>
            <span className="passenger-count">{passengerCount.senior}</span>
            <button type="button" className="passenger-btn" onClick={(event) => noPropagation(event, 'senior', increaseCount)}>+</button>
          </div>
        </div>
      </div>

      <div>
        <input type="text" id="inputSearchFrom" value={searchValueFrom} onChange={(event) => handleChange(event, 'from')} placeholder="From : City, Station Or Airport" ref={suggestionsFromInfo} />
        <input type="text" id="inputSearchTo" value={searchValueTo} onChange={(event) => handleChange(event, 'to')} placeholder="To : City, Station Or Airport" ref={suggestionsToInfo} />
        <input type="date" id="dateFrom" />
        <span id="divider" />
        <input type="date" id="dateTo" />
        <button type="button" id="searchButton">Search</button>
      </div>

      <label className="switch" htmlFor="slider">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span id="slider" />
      </label>
      {isSuggestionListFromVisible && (
      <div id="suggestionListFrom">
        <ul>
          {
            searchValueFrom ? suggestionsFrom.filter((element) => JSON.stringify(element)
              .toLowerCase().includes(searchValueFrom.toLowerCase()))
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              .map((element, id) => (<li key={id} onClick={() => handleSuggestionClick('from', element)}>{element.local_name}</li>)) : null
                  }
        </ul>
        { searchValueFrom ? <h3>Villes Populaires</h3> : null}
        <ul>
          {
            searchValueFrom ? popularSuggestions.filter((element) => JSON.stringify(element)
              .toLowerCase().includes(searchValueFrom.toLowerCase()))
              .map((element, id) => (<li key={id} onKeyUp={() => handleSuggestionClick('from', element)} onClick={() => handleSuggestionClick('from', element)}>{element.local_name}</li>)) : null
                  }
        </ul>
      </div>
      )}

      {isSuggestionListToVisible && (
        <div id="suggestionListTo">
          <ul>
            {
              searchValueTo ? suggestionsTo.filter((element) => JSON.stringify(element)
                .toLowerCase().includes(searchValueTo.toLowerCase()))
                .map((element, id) => (<li key={id} onKeyUp={() => handleSuggestionClick('from', element)} onClick={() => handleSuggestionClick('to', element)}>{element.local_name}</li>)) : null
                }
            { searchValueTo ? <h3>Villes Populaires</h3> : null}
            {
                    searchValueTo ? popularSuggestions.filter((element) => JSON.stringify(element)
                      .toLowerCase().includes(searchValueTo.toLowerCase()))
                      .map((element, id) => (<li key={id} onKeyUp={() => handleSuggestionClick('from', element)} onClick={() => handleSuggestionClick('to', element)}>{element.local_name}</li>)) : null
                }
          </ul>

          {isPopularFromParisVisible && (
          <div>
            { searchValueFrom === 'Paris, Île-de-France, France' ? <h3>Villes Populaires au départ de Paris</h3> : null }
            <ul>
              {
                  searchValueFrom === 'Paris, Île-de-France, France' ? popularSuggestionsFromParis.filter((element) => JSON.stringify(element)
                    .toLowerCase().includes(searchValueTo.toLocaleLowerCase()))
                    .map((element, id) => (<li key={id} onKeyUp={() => handleSuggestionClick('from', element)} onClick={() => handleSuggestionClick('to', element)}>{element.local_name}</li>)) : null
                }
            </ul>
          </div>
          )}
        </div>
      )}

    </div>

  );
}

export default SearchBar;
