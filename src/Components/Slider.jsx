import React, { useState } from 'react';
import '../styles/SearchButton.css';

function Slider() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    // eslint-disable-next-line no-console
    console.log('coucou', isChecked);
    setIsChecked(!isChecked);
  };

  return (

    <div id="switch">
      <label role="presentation" className="switchLabel" htmlFor="slider" onClick={handleCheckboxChange}>
        <input type="checkbox" checked={isChecked} readOnly className={`slider ${isChecked ? 'checked' : ''}`} />
        <span className="slider" />
      </label>
      <span role="presentation" id="find" onClick={handleCheckboxChange}>Find my accomodation</span>
    </div>

  );
}

export default Slider;
