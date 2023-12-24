import {useGetCurrentUser, useSignOutAccount} from "@/lib/react-query/queries";
import { Loader } from "@/components/shared";
import Profilephoto from "@/components/shared/Profilephoto";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
// const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

const Profile = () => {
  const { mutate: signOut } = useSignOutAccount();
  const navigate = useNavigate();

  const { setUser, setIsAuthenticated } = useUserContext();

   const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  const { data: currentUser} = useGetCurrentUser();  
  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  return (
<div className="common-container">
  <div className="user-container">
    <div className="container p-5">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <section className="text-white bg-slate-800 p-4 shadow-md rounded-md">
          <h3 className="text-xl font-bold mb-4">Account</h3>
         
          <div style={{ display: 'flex', alignItems: 'center' }} className="pb-3 text-white">
           <Profilephoto name={currentUser}/>
           <p className="text-lg font-bold mb-1 pl-3 text-blue-500">{currentUser.name}  </p>
          </div>
        
          <div className="mb-4">
           <p className="text-gray-200">User Name:</p>
           <p className="font-semibold">@{currentUser.UserName}</p>
          </div>
          <div className="mb-4">
           <p className="text-gray-200">Email:</p>
           <p className="text-white font-semibold">{currentUser.email}</p>
          </div>
          <button className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md mr-2">
            Edit
          </button>
          <button
            className="bg-green-500 font-semibold text-white px-4 py-2 rounded-md">
            Contact 
          </button>
      </section>

      <section className="mt-6">
        <button
          className="bg-red font-semibold text-white px-4 py-2 rounded-md"
          onClick={(e) => handleSignOut(e)}
        >
          Logout
        </button>
      </section>
    </div>
    </div>
  </div>   
  );
};

export default Profile;
