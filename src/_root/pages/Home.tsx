import { Models } from "appwrite";
import { Loader, PostCard } from "@/components/shared";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const Home = () => {

  const { data: currentUser, isLoading: isgroupLoading, isError: isErrorgroups  } = useGetCurrentUser();

  let userGroups: Models.Document[] = [];

  if (currentUser && currentUser.groups) {
    userGroups = currentUser.groups;
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
    <div className="container p-5 flex flex-col">
      <h2 className="text-black text-2xl font-bold mb-6">Groups</h2>

      {isgroupLoading ? (
        <Loader />
      ) : userGroups.length === 0 ? (
        <p className="text-dark-1 font-bold mb-2">You are not part of any groups.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userGroups.map((group: Models.Document) => (
            <li key={group.$id} className="bg-white p-4 shadow-md rounded-md text-black">
              <PostCard post={group} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
 
export default Home;
