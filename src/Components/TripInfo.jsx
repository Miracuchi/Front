/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import '../styles/TripInfo.css';
import FlipContainer from './FlipContainer';

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

  const content = (
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
  );

  return (
    <FlipContainer
      content={content}
      onClick={handleOpenClick}
      setIsVisible={setIsTravelInfoVisible}
      spanTxt={isOneWaySelected ? 'One-Way' : 'Round Trip'}
    />
  );
}

export default TripInfo;
