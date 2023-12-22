import { Models } from 'appwrite';
import React from 'react';

type SimplifyCardProps = {
  activities: Models.Document[];
  userId: string | undefined;
};

const SimplifyCard: React.FC<SimplifyCardProps> = ({ activities, userId }) => {
  const calculateOverallBalance = (activities: Models.Document[], currentUserId: string | undefined) => {
    let overallOwe = 0;
    let overallOwned = 0;

    activities.forEach((activity) => {
      const isPaidByCurrentUser = activity.PaidBy.$id === currentUserId;
      const isCurrentUserInvolved =
        activity.splitMember?.some((member: { $id: string }) => member.$id === currentUserId) || false;
      const splitCount = activity.splitMember?.length ?? 0;

      if (isPaidByCurrentUser && isCurrentUserInvolved) {
        const individualAmount = parseFloat(activity.Amout) / splitCount;
        const getback = parseFloat(activity.Amout) - individualAmount;
        overallOwned += getback;
      } else if (isPaidByCurrentUser && !isCurrentUserInvolved) {
        overallOwned += parseFloat(activity.Amout);
      } else if (!isPaidByCurrentUser && isCurrentUserInvolved) {
        const individualAmount = parseFloat(activity.Amout) / splitCount;
        overallOwe += individualAmount;
      }
    });

    return { overallOwe, overallOwned };
  };

  const { overallOwe, overallOwned } = calculateOverallBalance(activities, userId);
  return (
    <>
    <div className="text-white text-lg font-semibold mb-3">
 <p >
    Overall, you owe <span className="text-red">&#8377;{overallOwe.toFixed(2)}</span>
  </p>
  <p >
    and you are owed <span className="text-green-500">&#8377;{overallOwned.toFixed(2)}</span>
  </p>
    </div>
 
</>
  );
};

export default SimplifyCard;
