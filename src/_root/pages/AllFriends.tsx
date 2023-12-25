import { Models } from "appwrite";
import { Loader, UserCard } from "@/components/shared";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import { useNavigate } from "react-router-dom";

const AllFriends = () => {
const navigate = useNavigate();
const { data: currentUser, isLoading: isgroupLoading, isError: isErrorgroups } = useGetCurrentUser();
let userFriends: Models.Document[] = [];

if (currentUser && currentUser.List && currentUser.List.length > 0 && currentUser.List[0].friendsId) {
    userFriends = currentUser.List[0].friendsId;
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
      <h2 className="text-white text-2xl font-bold mb-6">Friends
       <button  style={{ backgroundColor: '#1CC29F' }}
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
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userFriends.map((friend: Models.Document) => (
            <li key={friend.$id} className="bg-slate-800 p-4 shadow-md rounded-md text-white">
              <UserCard user={friend} />
            </li>
          ))}
        </ul>
      )}
         {/* Floating Add Friend button */}
    </div>
          </div>
      </div>

  );
};

export default AllFriends;
