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
import Scrollicon from "@/components/ui/Scrollicon";
import { SetStateAction, useState } from "react";

const AllFriends = () => {
  const navigate = useNavigate();
  const {
    data: currentUser,
    isLoading: isgroupLoading,
    isError: isErrorgroups,
  } = useGetCurrentUser();

  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event: {
    currentTarget: { scrollTop: SetStateAction<number> };
  }) => {
    setScrollTop(event.currentTarget.scrollTop);
  };
  const { data: currentGroup, isLoading: isDataloading } = useGroups();

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
          {isgroupLoading || isDataloading ? (
            <Loader />
          ) : userFriends.length === 0 ? (
            <p className="text-white font-bold mb-2">You have no friends</p>
          ) : (
            <div
              style={{ maxHeight: "420px", overflowY: "auto" }}
              className={`custom-scrollbar `}
              onScroll={handleScroll}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userFriends.map((friend: Models.Document) => {
                  const updatedUserFriendsID = friend.$id;
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
                {scrollTop < 50 && <Scrollicon />}
              </ul>
            </div>
          )}
          {/* Render the arrow icon when scrolled down */}
          {/* Floating Add Friend button */}
        </div>
      </div>
    </div>
  );
};

export default AllFriends;
