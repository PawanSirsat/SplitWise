import React, { useEffect, useState } from "react";
import Profilephoto from "./Profilephoto";
import { useUserContext } from "@/context/AuthContext";
import { useFriends } from "@/lib/react-query/queries";
import { Button } from "../ui/button";
import Loader from "./Loader";
import {  loginaddFriend, targetaddFriend } from "@/lib/utils";

type ShowFriendListProps = {
  list: any; // Replace 'any' with the type of your friend data
};

const ShowFriendList: React.FC<ShowFriendListProps> = ({ list }) => {
  const { user } = useUserContext();

  const { data: friendList, isLoading: isFriendListLoading } = useFriends(user.id);
  const { data: newfriendList, isLoading: isnewfriendListLoading } = useFriends(list.$id);

  const [IsFriend, setIsFriend] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [friendArray, setFriendArray] = useState<string[]>([]);
  const [newfriendArray, setNewFriendArray] = useState<string[]>([]);
  
   const [loginDocId, setloginDocId] = useState<string>();
  const [visitDocId, setvisitDocId] = useState<string>();
 

  console.log("old");

  console.log(newfriendArray);
  console.log(friendArray);

  useEffect(() => {
    // Ensure both friendList and newfriendList data are available before updating state
    if (!isFriendListLoading && !isnewfriendListLoading) {

      setloginDocId(friendList?.documents[0]?.$id)
      setvisitDocId(newfriendList?.documents[0]?.$id)

      setFriendArray(
        friendList?.documents[0]?.friendsId?.map((item: { $id: any }) => item?.$id) || []
      );
      setNewFriendArray(
        newfriendList?.documents[0]?.friendsId?.map((item: { $id: any }) => item?.$id) || []
      );
    }
  }, [friendList, newfriendList, isFriendListLoading, isnewfriendListLoading]);

  useEffect(() => {
    setIsFriend(friendArray.includes(list.$id) && newfriendArray.includes(user.id));
  }, [friendArray, newfriendArray, setIsFriend]);

  const handlefollow = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      if (!IsFriend) {
        setLoading(true);
        let newloggedInFriendArray = [...friendArray];
        let newAddedFriendArray = [...newfriendArray];

        // LOGIN USER ARRAY
        if (!newloggedInFriendArray.includes(list?.$id)) {
          newloggedInFriendArray.push(list?.$id);
        }
        setFriendArray(newloggedInFriendArray);

        // NEW USER ARRAY
        if (!newAddedFriendArray.includes(user.id)) {
          newAddedFriendArray.push(user.id);
        }
        setNewFriendArray(newAddedFriendArray);
       
      // SAVE IN DATABASE

        async function addFriendsWithTimeout(newAddedFriendArray :any, newloggedInFriendArray:any, 
           visitDocId:any, loginDocId:any) {
      const targetAddFriendPromise = targetaddFriend(newAddedFriendArray, visitDocId);
      const loginAddFriendPromise = loginaddFriend(newloggedInFriendArray, loginDocId);

      try {
        // Wait for targetaddFriend, but set a timeout of 10 seconds
        await Promise.race([targetAddFriendPromise, new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))]);
      } catch (error) {
        console.error('Error in targetaddFriend:', error);
      }

      try {
        // Wait for loginaddFriend, but set a timeout of 10 seconds
        await Promise.race([loginAddFriendPromise, new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))]);
      } catch (error) {
        console.error('Error in loginaddFriend:', error);
      }
    }
    addFriendsWithTimeout(newAddedFriendArray, newloggedInFriendArray, visitDocId, loginDocId);
     
    setTimeout(() => {
    setIsFriend(!IsFriend);
    setLoading(false);
  }, 10000);

}
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <>
      <h4 className="m-3">User Found</h4>
      <div className="flex">
        <div className="bg-slate-800 p-4 shadow-md rounded-md text-white mb-4">
          <div className="flex items-center">
            <Profilephoto name={list} />
            <div className="ml-2">
              <p className="text-lg font-bold mb-1 mt-1 text-blue-500">Name : {list.name}</p>
              <p className="mb-1 ">Username : {list.UserName}</p>
            </div>
          </div>
          <Button
            type="button"
            className="shad-button_primary px-8"
            disabled={IsFriend || isLoading || isFriendListLoading || isnewfriendListLoading }
          >
            {isLoading || isFriendListLoading || isnewfriendListLoading  ? (
              <>
                Loading... <Loader />
              </>
            ) : IsFriend ? (
              <span onClick={handlefollow}>Added</span>
            ) : (
              <span onClick={handlefollow}>Add Friend</span>
            )}{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShowFriendList;
