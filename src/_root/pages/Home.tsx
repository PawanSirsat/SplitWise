import { Models } from "appwrite";
import { Loader, PostCard } from "@/components/shared";
import { useGetCurrentUser, useGroups } from "@/lib/react-query/queries";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { data: currentUser, isLoading: isgroupLoading, isError: isErrorgroups  } = 
  useGetCurrentUser();
  const { data: currentGroup, isLoading: isLoading, isError: iserror  } = useGroups();

  // console.log(currentGroup);
  
     const userMemberGroups: Models.Document[] = currentGroup?.documents?.filter((group: 
     Models.Document) => {
     return group.Members?.some((member: { $id: string | undefined; }) => member.$id === 
     currentUser?.$id);
  }) ?? [];

   if (isErrorgroups || iserror) {
 return (
  <>
   <div className="home-container">
      <p className="body-medium text-light-1">Something bad happened</p>
   </div>
   <div className="home-creators">
      <p className="body-medium text-light-1">Something bad happened</p>
   </div>
  </>  
  );
  }
  return (
<div className="common-container">
  <div className="user-container">
    <div className="container p-5 flex flex-col">
      <h2 className="text-white text-2xl font-bold mb-6">Groups
      <button  style={{ backgroundColor: '#1CC29F' }}
       className="font-semibold bg-blue-500 text-white px-2 py-1 ml-2 rounded-full 
      hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 text-lg"
          onClick={() => navigate("/create-group")}>
        Add Group
      </button>
      </h2>
      { isLoading || isgroupLoading ? (
        <Loader />
      ) : userMemberGroups.length === 0 ? (
        <p className="text-white font-bold mb-2">You are not part of any groups.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userMemberGroups.map((group: Models.Document) => (
            <li key={group.$id} className="bg-slate-800 p-4 shadow-md rounded-md text-white">
              <PostCard post={group}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>
  );
};
 
export default Home;
