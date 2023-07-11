import { useEffect } from 'react';

const UseClickOutside = (ref, handleClickOutside) => {
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

export default UseClickOutside;
