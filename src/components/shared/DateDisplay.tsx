import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  format,
} from "date-fns";

const formatDate = (inputDateString: any) => {
  const currentDate = new Date();
  const date = new Date(inputDateString);
  let timeDifference;
  const minutesDifference = differenceInMinutes(currentDate, date);
  const hoursDifference = differenceInHours(currentDate, date);
  const daysDifference = differenceInDays(currentDate, date);

  if (minutesDifference < 1) {
    timeDifference = "Just now";
  } else if (minutesDifference < 60) {
    timeDifference = `${minutesDifference} minute${
      minutesDifference > 1 ? "s" : ""
    } ago`;
  } else if (hoursDifference < 24) {
    timeDifference = `${hoursDifference} hour${
      hoursDifference > 1 ? "s" : ""
    } ago`;
  } else if (daysDifference >= 3) {
    timeDifference = format(date, "MMM dd, h:mm a");
  } else if (daysDifference <= 2) {
    timeDifference = `${daysDifference} day${
      daysDifference > 1 ? "s" : ""
    } ago`;
  } else {
    timeDifference = format(date, "MMM dd, yyyy, h:mm a");
  }

  return timeDifference;
};

const DateDisplay = ({ dateTimeString }: { dateTimeString: any }) => {
  const formattedDate = formatDate(dateTimeString);

  return (
    <div className="date-container">
      <div className="date-time">
        <span className="formatted-date">{formattedDate}</span>
      </div>
    </div>
  );
};

export default DateDisplay;
