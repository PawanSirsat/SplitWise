import { Models } from "appwrite";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import DateDisplay from "./DateDisplay";
import ActivityImage from "./ActivityImage";

type UserCardProps = {
  activity: Models.Document;
};

const GroupActivity = ({ activity }: UserCardProps) => {  

  const { data: currentUser } = useGetCurrentUser();
 
  const isPaidByCurrentUser = activity.PaidBy.$id === currentUser?.$id;
  const isCurrentUserInvolved = activity.splitMember?.some((member: { $id: string }) => member.$id === 
  currentUser?.$id) || false;
  const splitCount = activity.splitMember?.length ?? 0;

  let amountMessage = '';

  if (isPaidByCurrentUser && isCurrentUserInvolved) {
    const individualAmount = parseFloat(activity.Amout) / splitCount;    
    const getback = parseFloat(activity.Amout) - individualAmount
    amountMessage = `You get back $${getback.toFixed(2)}`;
  } 
  else if (isPaidByCurrentUser && !isCurrentUserInvolved) {
    const individualAmount = parseFloat(activity.Amout)
    amountMessage = `You get back $${individualAmount.toFixed(2)}`;
  } 
   else if (!isPaidByCurrentUser && isCurrentUserInvolved) {
     const individualAmount = parseFloat(activity.Amout) / splitCount;
    amountMessage = `You owe $${individualAmount.toFixed(2)}`;
  }
  else {
    amountMessage = `Not involved`;
  }

  return (
    <>
     <div style={{ display: 'flex', alignItems: 'center' }} className="pb-2">
      <ActivityImage Desc={activity.Desc}/>
      <DateDisplay dateTimeString={activity.Time} />
      <span className="text-blue-500 text-lg font-bold pl-10">&ensp;&#8377;{activity.Amout} </span>
      </div>
      <p className="text-lg font-bold mb-1">{activity.Desc}</p>
      <p>
        Added by <span className={`font-semibold ${isPaidByCurrentUser ? 'text-green-500' : 'text-teal-400'}`}>" 
         {activity.PaidBy.name}"</span> Split in{' '}
<span className="font-bold text-teal-400	">
          {activity.splitMember?.map((member: { UserName: string, email: string, accountId: string, name: string, $id: string }) => (
            <span key={member.$id}>{member.name}, </span>
          ))}
        </span>      </p>
     <p className={`${isPaidByCurrentUser ? 'text-green-500 font-semibold' : (!isPaidByCurrentUser 
      && isCurrentUserInvolved ? 'text-red font-semibold' : 'text-indigo-700 font-semibold')}`}>
      {amountMessage}
     </p>
    </>    
  );
};

export default GroupActivity;
