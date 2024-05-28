import { Models } from "appwrite";
import { Loader } from "@/components/shared";
import ActivityCard from "@/components/shared/ActivityCard";
import SimplifyCard from "@/components/shared/SimplifyCard";
import { SetStateAction, useState } from "react";
import Scrollicon from "@/components/ui/Scrollicon";
import { useUserContext } from "@/context/AuthContext";
import { useGetGroupsActivityById } from "@/lib/react-query/queries";

const AllActivity = () => {
  const { user } = useUserContext();
  const [scrollTop, setScrollTop] = useState(0);

  const {
    data: GroupsData,
    isLoading: isGroupsDataLoading,
    isError: isGroupsError,
  } = useGetGroupsActivityById(user.group);

  const handleScroll = (event: {
    currentTarget: { scrollTop: SetStateAction<number> };
  }) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  if (isGroupsError) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <span className="body-medium text-dark-1">
            Something bad happened
          </span>
        </div>
        <div className="home-creators">
          <span className="body-medium text-light-1">
            Something bad happened
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="common-container ">
      <div className="user-container">
        <div className="container p-3">
          <h2 className="text-white text-2xl font-bold mb-3">Activity</h2>
          {isGroupsDataLoading ? (
            <Loader />
          ) : GroupsData.length == 0 && !isGroupsDataLoading ? (
            <span className="text-white font-bold mb-2">
              No Activity in Groups
            </span>
          ) : (
            <>
              <SimplifyCard activities={GroupsData} userId={user?.id} />
              <div
                onScroll={handleScroll}
                style={{ maxHeight: "440px", overflowY: "auto" }}
                className="custom-scrollbar">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {GroupsData.sort(
                    (a, b) =>
                      new Date(b.Time).getTime() - new Date(a.Time).getTime()
                  ).map((activity: Models.Document) => (
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
