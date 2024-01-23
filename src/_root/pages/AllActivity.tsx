import { Models } from "appwrite";
import { Loader } from "@/components/shared";
import { useActivity, useGetCurrentUser } from "@/lib/react-query/queries";
import ActivityCard from "@/components/shared/ActivityCard";
import SimplifyCard from "@/components/shared/SimplifyCard";
import { SetStateAction, useState } from "react";
import Scrollicon from "@/components/ui/Scrollicon";

const AllActivity = () => {
  const {
    data: currentUser,
    isLoading: isgroupLoading,
    isError: isErrorgroups,
  } = useGetCurrentUser();
  const {
    data: activity,
    isLoading: isactivityLoading,
    isError: isErroractivity,
  } = useActivity();

  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event: {
    currentTarget: { scrollTop: SetStateAction<number> };
  }) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const userMemberGroups: Models.Document[] =
    activity?.documents?.filter(
      (activity: Models.Document) =>
        activity.Group.Members?.some(
          (member: { $id: string | undefined }) =>
            member.$id === currentUser?.$id
        )
    ) ?? [];

  if (isErrorgroups || isErroractivity) {
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
    <div className="common-container ">
      <div className="user-container">
        <div className="container p-3">
          <h2 className="text-white text-2xl font-bold mb-3">Activity</h2>
          {isgroupLoading || isactivityLoading ? (
            <Loader />
          ) : userMemberGroups.length === 0 ? (
            <p className="text-white font-bold mb-2">No Activity in Groups</p>
          ) : (
            <>
              <SimplifyCard
                activities={userMemberGroups}
                userId={currentUser?.$id}
              />
              <div
                onScroll={handleScroll}
                style={{ maxHeight: "380px", overflowY: "auto" }}
                className="custom-scrollbar">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userMemberGroups.map((activity: Models.Document) => (
                    <li
                      key={activity.$id}
                      className="bg-slate-800 p-4 shadow-md rounded-md text white">
                      <ActivityCard activity={activity} />
                    </li>
                  ))}
                  {scrollTop < 50 && <Scrollicon />}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllActivity;
