/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react';
import '../Styles/TripInfo.css';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UseClickOutside from './ClickOutsideHandler';

function TripInfo() {
  const [isOneWaySelected, setIsOneWaySelected] = useState(true);
  const [isRoundTripSelected, setIsRoundTripSelected] = useState(false);
  const [isTravelInfoVisible, setIsTravelInfoVisible] = useState(false);

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
  };
  UseClickOutside(tripInfoRef, handleClickOutsideTripInfo);

  return (
    <>
      <button type="button" id="selectedTripType" onClick={handleOpenClick} ref={tripInfoRef}>
        <span className="fontChevron">{isOneWaySelected ? 'One-Way' : 'Round Trip'}</span>
        <FontAwesomeIcon icon={faChevronUp} className={isTravelInfoVisible ? 'rotate' : 'rotate2'} rotation={isTravelInfoVisible ? 0 : 180} />
      </button>
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
