import { Models } from "appwrite";
import { Loader, UserCard } from "@/components/shared";
import {
  useActivity,
  useGetCurrentUser,
  useGroups,
} from "@/lib/react-query/queries";
import { useNavigate } from "react-router-dom";
import {
  getUniqueUserIdsFromGroups,
  processTransactions,
} from "@/components/shared/Simplify";

const AllFriends = () => {
  const navigate = useNavigate();
  const {
    data: currentUser,
    isLoading: isgroupLoading,
    isError: isErrorgroups,
  } = useGetCurrentUser();

  const { data: currentGroup } = useGroups();

  const userGroups: Models.Document[] =
    currentGroup?.documents?.filter((group: Models.Document) => {
      return group.Members?.some(
        (member: { $id: string | undefined }) => member.$id === currentUser?.$id
      );
    }) ?? [];

  const uniqueUserIds = getUniqueUserIdsFromGroups(
    userGroups,
    currentUser?.$id
  );

  let userFriends: Models.Document[] = [];

  const { data: activity } = useActivity();

  const userMemberGroups: Models.Document[] =
    activity?.documents?.filter(
      (activity: Models.Document) =>
        activity.Group.Members?.some(
          (member: { $id: string | undefined }) =>
            member.$id === currentUser?.$id
        )
    ) ?? [];

  // Example usage:
  const userId = currentUser?.$id; // Replace with the actual user ID
  const jsonData = userMemberGroups;

  if (
    (currentUser &&
      currentUser.List &&
      currentUser.List.length > 0 &&
      currentUser.List[0].friendsId) ||
    uniqueUserIds.length > 0
  ) {
    userFriends = uniqueUserIds;
  }

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
    <div className="common-container">
      <div className="user-container">
        <div className="container p-5 flex flex-col">
          <h2 className="text-white text-2xl font-bold mb-6">
            Friends
            <button
              style={{ backgroundColor: "#1CC29F" }}
              className="font-semibold bg-blue-500 text-white px-2 py-1 ml-2 rounded-full 
      hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 text-lg"
              onClick={() => navigate("/add-friend")}>
              Add Friend
            </button>
          </h2>
          {isgroupLoading ? (
            <Loader />
          ) : userFriends.length === 0 ? (
            <p className="text-white font-bold mb-2">You have no friends</p>
          ) : (
            <div
              style={{ maxHeight: "380px", overflowY: "auto" }}
              className="custom-scrollbar">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userFriends.map((friend: Models.Document) => {
                  // Update userFriendsID for each friend
                  const updatedUserFriendsID = friend.$id;

                  // Call processTransactions to get updated values
                  const { userCanPay, friendCanPay } = processTransactions(
                    userId || "", // Ensure userId is not undefined
                    jsonData || [],
                    updatedUserFriendsID || []
                  );

                  return (
                    <li
                      key={friend.$id}
                      className="bg-slate-800 p-4 shadow-md rounded-md text-white">
                      <UserCard
                        user={friend}
                        userCanPay={userCanPay}
                        friendCanPay={friendCanPay}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {/* Floating Add Friend button */}
        </div>
      </div>
    </div>
  );
};

export default AllFriends;
