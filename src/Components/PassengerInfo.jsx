/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UseClickOutside from './ClickOutsideHandler';
import '../Styles/PassengerInfo.css';

function PassengerInfo() {
  const [isPassengerInfoVisible, setIsPassengerInfoVisible] = useState(false);
  const [passengerCount, setPassengerCount] = useState({
    adult: 0,
    senior: 0,
    youth: 0,
  });
  const [youthAges, setYouthAges] = useState({});

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

  const handlePassengerInfoClick = () => {
    if (isPassengerInfoVisible === false) {
      setIsPassengerInfoVisible(true);
    } else {
      setIsPassengerInfoVisible(false);
    }
  };

  const passengerInfoRef = useRef(null);
  const handleClickOutsidePassengerCount = () => {
    setIsPassengerInfoVisible(false);
  };
  UseClickOutside(passengerInfoRef, handleClickOutsidePassengerCount);

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

  const noPropagation = (event, type, action) => {
    event.stopPropagation();
    action(type);
  };

  const noPropagationAge = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    // Calculer le nombre total de passagers
    const totalCount = passengerCount.adult + passengerCount.youth + passengerCount.senior;
    const totalPassengerCountElement = document.getElementById('totalPassengerCount');
    if (totalPassengerCountElement) {
      totalPassengerCountElement.textContent = totalCount;
    }
  }, [passengerCount]);

  return (
    <>
      <button type="button" id="passengerButton" onClick={handlePassengerInfoClick} ref={passengerInfoRef}>
        <span id="totalPassengerCount">0</span>
        <span className="fontChevron">Passagers</span>
        <FontAwesomeIcon icon={faChevronUp} className={isPassengerInfoVisible ? 'rotate' : 'rotate2'} rotation={isPassengerInfoVisible ? 0 : 180} />
      </button>
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
          <div id="scroll">
            {Array.from(Array(passengerCount.youth)).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
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

    </>
  );
}

export default PassengerInfo;
