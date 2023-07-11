/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Styles/Calendar.css';

function Calendar() {
  const [selectedDates, setSelectedDates] = useState(Array.from({ length: 2 }, () => null));

  useEffect(() => {
    setSelectedDates((prevDates) => {
      const updatedDates = [...prevDates];
      updatedDates[0] = new Date();
      return updatedDates;
    });
  }, []);

  const handleDateChange = (date, index) => {
    const updatedDates = [...selectedDates];
    updatedDates[index] = date;
    setSelectedDates(updatedDates);
  };

  return (
    <div id="twoCalendar">
      {selectedDates.map((selectedDate, index) => (
        <div key={index} id="datePickerContainer">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => handleDateChange(date, index)}
            dateFormat="dd/MM/yyyy"
            id={`datePicker-${index}`}
            monthsShown={2}
            placeholderText={index > 0 ? 'Add return' : ''}
          />
        </div>
      ))}
      <span id="divider" />
    </div>
  );
}

export default Calendar;
