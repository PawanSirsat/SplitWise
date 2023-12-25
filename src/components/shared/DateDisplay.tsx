
const formatDate = (inputDateString: any) => {
  const inputDate = new Date(inputDateString);

    const monthOptions: Intl.DateTimeFormatOptions = { month: "long", day: 'numeric', year: 'numeric', hour: '2-digit', minute: "2-digit" };

  const dateOptions: Intl.DateTimeFormatOptions = { month: "long", day: 'numeric', year: 'numeric', hour: '2-digit', minute: "2-digit", hour12: true };

  const monthName = new Intl.DateTimeFormat('en-US', monthOptions).format(inputDate);
  const dayAndTime = new Intl.DateTimeFormat('en-US', dateOptions).format(inputDate);

  return `${monthName.slice(0, 3)} ${dayAndTime}`;
};

const DateDisplay = ({ dateTimeString  }: { dateTimeString: any; }) => {
  const formattedDate = formatDate(dateTimeString);

  return (
    <div className="date-container">
      <div className="month-circle">
        <span className="month-initials font-bold">{formattedDate.substring(0, 3)}</span>
      </div>
      <div className="date-time">
        <span className="formatted-date">{formattedDate.substring(12)}</span>
      </div>
    </div>
  );
};

export default DateDisplay;
