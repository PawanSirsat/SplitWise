import React from 'react';

const formatDate = (inputDateString: string | number | Date) => {
  const inputDate = new Date(inputDateString);

  const monthOptions = { month: 'long' };
  const dateOptions = { day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

  const monthName = new Intl.DateTimeFormat('en-US', monthOptions).format(inputDate);
  const dayAndTime = new Intl.DateTimeFormat('en-US', dateOptions).format(inputDate);

  return `${monthName.slice(0, 3)} ${dayAndTime}`;
};

const DateDisplay = ({ dateTimeString }) => {
  const formattedDate = formatDate(dateTimeString);

  return (
    <div className="date-container">
      <div className="month-circle">
        <span className="month-initials">{formattedDate.substring(0, 3)}</span>
      </div>
      <div className="date-time">
        <span className="formatted-date">{formattedDate.substring(3)}</span>
      </div>
    </div>
  );
};

export default DateDisplay;
