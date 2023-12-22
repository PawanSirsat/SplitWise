import React from "react";
import Profilephoto from "./Profilephoto";
import { Models } from "appwrite";

type ShowFriendListProps = {
  list: any[]; // Replace 'any' with the type of your friend data
};

const ShowFriendList: React.FC<ShowFriendListProps> = ({ list }) => {

  return (
   <>
   <h4 className="m-3">User Found</h4>
     <div className="gap-1">
    <div className="bg-slate-800 p-4 shadow-md rounded-md text-white">
          <FriendCard friend={list} />
    </div>
   </div>
   </>
 
  );
};

type FriendCardProps = {
  friend: any; // Replace 'any' with the type of your friend data
};

const FriendCard: React.FC<FriendCardProps> = ({ friend }) => {

  return (
   <div style={{ display: 'flex', alignItems: 'center' }} className=" text-white">
           <Profilephoto name={friend}/>
           <p className="text-lg font-bold mb-1 pl-3 text-blue-500">{friend.name}  </p>   
      <button className="absolute bg-blue-500 text-white px-2 py-1 rounded end-px mr-10">
      Add Friend
    </button>
 </div>
  );
};

export default ShowFriendList;
