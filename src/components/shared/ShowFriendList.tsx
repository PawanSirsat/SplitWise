import React, { useEffect, useState } from "react";
import Profilephoto from "./Profilephoto";
import { useUserContext } from "@/context/AuthContext";
import { useFriends } from "@/lib/react-query/queries";
import { Button } from "../ui/button";
import Loader from "./Loader";
import { addFriend } from "@/lib/utils";

type ShowFriendListProps = {
  list: any; // Replace 'any' with the type of your friend data
};

const ShowFriendList: React.FC<ShowFriendListProps> = ({ list }) => {
  const { user } = useUserContext();
  const { data: friendList} = useFriends(user.id);
  const { data: newfriendList } = useFriends(list.$id);

  const loginDocId = friendList?.documents[0]?.$id;
  const visitDocId = newfriendList?.documents[0]?.$id;

  const [IsFriend, setIsFriend] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [friendArray, setfriendArray] = useState<string[]>(
    friendList?.documents[0]?.friendsId?.map(
      (item: { $id: any }) => item?.$id
    ) || []
  );

  const [newfriendArray, setnewfriendArray] = useState<string[]>(
    newfriendList?.documents[0]?.friendsId?.map(
      (item: { $id: any }) => item?.$id
    ) || []
  );
  useEffect(() => {
    setIsFriend(friendArray.includes(list.$id) && newfriendArray.includes(user.id));
  }, [friendArray, list.$id]);

   const handlefollow = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    try {

      if(!IsFriend)
      {
        setLoading(true);
           
        let newloggedInFriendArray = [...friendArray];
        let newAddedFriendArray = [...newfriendArray];

        // LOGIN USER ARRAY
        if (!newloggedInFriendArray.includes(list?.$id)) {
          newloggedInFriendArray.push(list?.$id);
        } 
        setfriendArray(newloggedInFriendArray);

        // NEW USER ARRAY
        if (!newAddedFriendArray.includes(user.id)) {
          newAddedFriendArray.push(user.id);
        } 
        setnewfriendArray(newAddedFriendArray);
        // SAVE IN DATABASE
        await addFriend(newAddedFriendArray, newloggedInFriendArray, visitDocId, loginDocId);
        // SET TRUE TO ISFRIEND
        setIsFriend(!IsFriend);
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
                disabled={IsFriend}>
                {isLoading ? (
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
