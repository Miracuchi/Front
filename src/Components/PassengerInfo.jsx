/* eslint-disable no-console,react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useState, useEffect, useMemo,
} from 'react';
import '../styles/PassengerInfo.css';
import FlipContainer from './FlipContainer';

const youthAgeOptions = [];
for (let i = 0; i <= 25; i += 1) {
  const youthAgeCreation = {
    value: `Youth ${i}`,
    label: `${i} years`,
  };

  youthAgeOptions.push(youthAgeCreation);
}

function PassengerInfo() {
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

  const contentLoop = useMemo(() => passengerCount.youth > 0 && (

  <div id="youthAgeContainer" onClick={noPropagationAge}>
    <div id="scroll">
      {Array.from(Array(passengerCount.youth)).map((_, index) => (
        <div key={`${index}_youth`} id="youthAgePerfil">
          <span id="ageDivider" />
          <div id="youthAgeInfo">
            <span id="youthAgeText">
              Youth
              {index + 1}
            </span>
            <select
              id="youthAge"
              value={youthAges[index] || youthAgeOptions[0].value}
              onChange={(e) => setYouthAges((prevAges) => ({
                ...prevAges,
                [index]: e.target.value,
              }))}
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
  ), []);

  const content = (
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
      {contentLoop}

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
  );

  return (
    <FlipContainer
      content={content}
      setIsVisible={setIsPassengerInfoVisible}
      onClick={handlePassengerInfoClick}
      spanId="totalPassengerCount"
      spanTxt="Passagers"
    />
  );
}

export default PassengerInfo;
