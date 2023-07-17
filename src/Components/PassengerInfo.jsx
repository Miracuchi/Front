/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UseClickOutside from './ClickOutsideHandler';
import '../Styles/PassengerInfo.css';

const youthAgeOptions = [];
for (let i = 0; i <= 25; i += 1) {
  const youthAgeCreation = {
    value: `Youth ${i}`,
    label: `${i} years`,
  };

  youthAgeOptions.push(youthAgeCreation);
}

const FLIP_STATES_PASS = {
  start: {
    value: 'startPass',
    className: '',
  },
  up: {
    value: 'upPass',
    className: 'flipPass',
  },
  down: {
    value: 'downPass',
    className: 'flipDownPass',
  },
};

function PassengerInfo() {
  const [flipStatePass, setFlipStatePass] = useState(FLIP_STATES_PASS.start);
  const handleFlipClickPass = () => {
    switch (flipStatePass.value) {
      case 'upPass':
      case 'startPass':
        setFlipStatePass(FLIP_STATES_PASS.down);
        break;
      case 'downPass':
        setFlipStatePass(FLIP_STATES_PASS.up);
        break;
      default:
    }
  };
  console.log(flipStatePass);
  const [isPassengerInfoVisible, setIsPassengerInfoVisible] = useState(false);
  const [passengerCount, setPassengerCount] = useState({
    adult: 0,
    senior: 0,
    youth: 0,
  });
  const [youthAges, setYouthAges] = useState({});

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
    setFlipStatePass(FLIP_STATES_PASS.up);
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
      <span onClick={handleFlipClickPass}>
        <button type="button" id="passengerButton" onClick={handlePassengerInfoClick} ref={passengerInfoRef}>
          <span id="totalPassengerCount">0</span>
          <span className="fontChevron">Passagers</span>
          <FontAwesomeIcon icon={faChevronDown} className={`chevrons ${flipStatePass.className}`} />
        </button>
      </span>
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
