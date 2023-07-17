/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../Styles/TripInfo.css';
import UseClickOutside from './ClickOutsideHandler';

const FLIP_STATES = {
  start: {
    value: 'start',
    className: '',
  },
  up: {
    value: 'up',
    className: 'flip',
  },
  down: {
    value: 'down',
    className: 'flipDown',
  },
};

function TripInfo() {
  const [isOneWaySelected, setIsOneWaySelected] = useState(true);
  const [isRoundTripSelected, setIsRoundTripSelected] = useState(false);
  const [isTravelInfoVisible, setIsTravelInfoVisible] = useState(false);

  const [flipState, setFlipState] = useState({});

  useEffect(() => setFlipState(FLIP_STATES.start), []);

  const handleOpenClick = () => {
    if (isTravelInfoVisible === false) {
      setIsTravelInfoVisible(true);
    } else {
      setIsTravelInfoVisible(false);
    }
  };

  const handleTripTypeChange = (event) => {
    const selectedTravelTypeValue = event.target.textContent;

    if (selectedTravelTypeValue === 'One-way') {
      setIsOneWaySelected(true);
      setIsRoundTripSelected(false);
    } else if (selectedTravelTypeValue === 'Round-trip') {
      setIsOneWaySelected(false);
      setIsRoundTripSelected(true);
    }

    setIsTravelInfoVisible(false);
  };

  const tripInfoRef = useRef(null);
  const handleClickOutsideTripInfo = () => {
    setIsTravelInfoVisible(false);
    setFlipState(FLIP_STATES.up);
  };
  UseClickOutside(tripInfoRef, handleClickOutsideTripInfo);

  const handleFlipClick = () => {
    switch (flipState.value) {
      case 'up':
      case 'start':
        setFlipState(FLIP_STATES.down);
        break;
      case 'down':
        setFlipState(FLIP_STATES.up);
        break;
      default:
    }
  };

  console.log(flipState);

  return (
    <>
      <span onClick={handleFlipClick}>
        <button type="button" id="selectedTripType" onClick={handleOpenClick} ref={tripInfoRef}>
          <span className="fontChevron">{isOneWaySelected ? 'One-Way' : 'Round Trip'}</span>
          <FontAwesomeIcon icon={faChevronDown} className={`chevron ${flipState.className}`} />
        </button>
      </span>
      <div id="tripInfo" className={isTravelInfoVisible ? 'visible' : ''}>
        <div id="containerTravelInfo">
          <div id="travelInfoOne" onClick={handleTripTypeChange} onKeyUp={handleTripTypeChange} className={isOneWaySelected ? 'selected' : ''}>
            {isOneWaySelected && <i id="checkOneWay" className="fa-solid fa-check" />}
            <span className="wayTextOne">One-way</span>
          </div>
          <div id="travelInfoRound" onClick={handleTripTypeChange} onKeyUp={handleTripTypeChange} className={isRoundTripSelected ? 'selected' : ''}>
            {isRoundTripSelected && <i id="checkRoundTrip" className="fa-solid fa-check" />}
            <span className="wayTextRound">Round-trip</span>
          </div>
        </div>
      </div>

    </>
  );
}

export default TripInfo;
