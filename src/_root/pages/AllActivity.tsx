import { Models } from "appwrite";
import { Loader } from "@/components/shared";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import ActivityCard from "@/components/shared/ActivityCard";

const AllActivity = () => {
  const { data: currentUser, isLoading: isgroupLoading, isError: isErrorgroups } = useGetCurrentUser();

  let groupActivity: Models.Document[] = [];

  if (currentUser && currentUser.members && currentUser.members.length > 0 ) {
    groupActivity = currentUser.members;
  }

  console.log(currentUser);
  
  if (isErrorgroups) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-5 flex flex-col">
      <h2 className="text-black text-2xl font-bold mb-6">Activity</h2>

      {isgroupLoading ? (
        <Loader />
      ) : groupActivity.length === 0 ? (
        <p className="text-dark-1 font-bold mb-2">No Activity in Groups</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupActivity.map((activity: Models.Document) => (
            <li key={activity.$id} className="bg-white p-4 shadow-md rounded-md text-black">
              <ActivityCard activity={activity} />
            </li>
          ))}
        </ul>
      )}
         {/* Floating Add Friend button */}
      <button
        className="fixed top-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-full"
      >
        Add expense
      </button>
    </div>
  );
};

export default AllActivity;
