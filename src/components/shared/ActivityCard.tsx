import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';

type UserCardProps = {
  activity: Models.Document;
};

const ActivityCard = ({ activity }: UserCardProps) => {
  const currentDate = new Date();
  const date = new Date(activity.Time);
  
  let timeDifference;

  const minutesDifference = differenceInMinutes(currentDate, date);
  const hoursDifference = differenceInHours(currentDate, date);
  const daysDifference = differenceInDays(currentDate, date);

  if (minutesDifference < 1) {
    timeDifference = 'Just now';
  } else if (minutesDifference < 60) {
    timeDifference = `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
  } else if (hoursDifference < 24) {
    timeDifference = `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
  } else if (daysDifference < 7) {
    timeDifference = `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
  } else {
    // You can add more conditions for weeks, months, etc.
    timeDifference = 'More than a week ago';
  }

  return (
    <Link to={`/profile/${activity.$id}`}>
      <p className="text-lg font-bold mb-1">{activity.Desc}</p>
      <p>
        Added by <span className="font-semibold">{activity.PaidBy.UserName}</span> in{' '}
        <span className="font-semibold">{activity.Group.groupName}</span>
      </p>
      <p className="text-gray-500">{timeDifference}</p>
    </Link>
  );
};

export default ActivityCard;
