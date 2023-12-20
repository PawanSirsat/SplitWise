import { Models } from "appwrite";
import { Loader } from "@/components/shared";
import { useActivity, useGetCurrentUser } from "@/lib/react-query/queries";
import ActivityCard from "@/components/shared/ActivityCard";

const AllActivity = () => {
  const { data: currentUser, isLoading: isgroupLoading, isError: isErrorgroups } = useGetCurrentUser();
  const { data: activity, isLoading: isactivityLoading, isError: isErroractivity } = useActivity();
  
  const userMemberGroups: Models.Document[] = (activity?.documents?.filter((activity: Models.Document) => 
  activity.Group.Members?.some((member: { $id: string | undefined; }) => member.$id === currentUser?.$id)
) ?? []).reverse();

  if (isErrorgroups ) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-dark-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
     <div className="common-container">
      <div className="user-container">
      <h2 className="text-white text-2xl font-bold mb-6">Activity</h2>

      {isgroupLoading || isactivityLoading? (
        <Loader />
      ) : userMemberGroups.length === 0 ? (
        <p className="text-white font-bold mb-2">No Activity in Groups</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userMemberGroups.map((activity: Models.Document) => (
            <li key={activity.$id} className="bg-slate-800 p-4 shadow-md rounded-md text-white">
              <ActivityCard activity={activity} />
            </li>
          ))}
        </ul>
      )}
         {/* Floating Add Friend button */}
      <button className="fixed top-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-full">
        Add expense
      </button>
    </div>
  </div>
  );
};

export default AllActivity;
