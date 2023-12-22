import React from "react";
import Profilephoto from "./Profilephoto";
import { useUserContext } from "@/context/AuthContext";
import { useFriends } from "@/lib/react-query/queries";

type ShowFriendListProps = {
  list: any[]; // Replace 'any' with the type of your friend data
};

const ShowFriendList: React.FC<ShowFriendListProps> = ({ list }) => {
  const { user } = useUserContext();
  const { data: friendList, isLoading: isFrndLoading, isError: isErrorFrnd } = useFriends(user.id);

  // Extract friend IDs from the friend list
  const friendIds = friendList?.documents[0].friendsId || [];
  
  // Check if any user in the list is already a friend

  type Friend = {
  $id: string; // Adjust the type accordingly
  // Other properties...
};

const isAlreadyFriend = Array.isArray(friendIds) && friendIds.some((item: { $id: any }) => item.$id === list.$id);

  return (
    <>
      <h4 className="m-3">User Found</h4>
      <div className="flex">
          <FriendCard friend={list} isAlreadyFriend={isAlreadyFriend} />
      </div>
    </>
  );
};

type FriendCardProps = {
  friend: any; // Replace 'any' with the type of your friend data
  isAlreadyFriend: boolean;
};

const FriendCard: React.FC<FriendCardProps> = ({ friend, isAlreadyFriend }) => {
  return (
   <div className="bg-slate-800 p-4 shadow-md rounded-md text-white mb-4">
      
      <div className="flex items-center">
        <Profilephoto name={friend} />
        <div className="ml-2">
          <p className="text-lg font-bold mb-1 mt-1 text-blue-500">Name : {friend.name}</p>
          <p className="mb-1 ">Username : {friend.UserName}</p>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded mt-3"
        disabled={isAlreadyFriend}
      >
        {isAlreadyFriend ? "Already Friend" : "Add Friend"}
      </button>
    </div>
  );
};

export default ShowFriendList;
