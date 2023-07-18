// eslint-disable react/no-unknown-property@
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { any, func, string } from 'prop-types';
import UseClickOutside from './ClickOutsideHandler';

const FLIP_STATES = {
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

function FlipContainer({
  content, onClick, spanId, spanTxt, setIsVisible,
}) {
  const [flipState, setFlipState] = useState(FLIP_STATES.start);

  useEffect(() => setFlipState(FLIP_STATES.start), []);

  const handleFlipClick = () => {
    switch (flipState.value) {
      case 'upPass':
      case 'startPass':
        setFlipState(FLIP_STATES.down);
        break;
      case 'downPass':
        setFlipState(FLIP_STATES.up);
        break;
      default:
    }
  };

  const buttonRef = useRef(null);

  const handleClickOutside = () => {
    setIsVisible(false);
    if (flipState !== FLIP_STATES.start) {
      setFlipState(FLIP_STATES.up);
    }
  };

  UseClickOutside(buttonRef, handleClickOutside);

  return (
    <>
      <span
        tabIndex={0}
        role="button"
        onClick={handleFlipClick}
        onKeyDown={null}
      >
        <div ref={buttonRef}>
          <button type="button" id="selectedTripType" onClick={onClick}>
            <span id={spanId} />
            <span className="fontChevron">{spanTxt}</span>
            <FontAwesomeIcon icon={faChevronDown} className={`chevrons ${flipState?.className}`} />
          </button>
        </div>
      </span>
      {content}

    </>
  );
}

FlipContainer.propTypes = {
  onClick: func,
  spanId: string,
  spanTxt: string,
  content: any,
  setIsVisible: func,
};
export default FlipContainer;
