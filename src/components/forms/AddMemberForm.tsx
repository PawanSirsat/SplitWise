import { useState } from "react";
import { useFriends, useGetGroupById } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import UserCard from "../shared/UserCard";
import { Button } from "../ui";
import Loader from "../shared/Loader";
import { addMember } from "@/lib/utils";

const AddMemberForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: friendList, isLoading: isFrndLoading } = useFriends(user.id);
  const { data: GroupData, isLoading: isGroupDataLoading } = useGetGroupById(id!);
  const [isLoading, setLoading] = useState(false);

    
  const friendArray = friendList?.documents[0]?.friendsId?.map((item: { $id: any; name: string }) => ({
    id: item?.$id,
    name: item?.name,
  })) || [];

    const [memberArray, setmemberArray] = useState<string[]>(
    GroupData?.Members?.map((item: { $id: any }) => item?.$id) || []
  );
const [newid, setnewid] = useState<string | null>(null);

 const handleAddMember = async (friendId: string) => {
  // Check if friend is not already a member
  
  setnewid(friendId)
  if (!memberArray.includes(friendId)) 
  {
      const newArray = [...memberArray, friendId];
      console.log("New Member Array:", newArray); 
      Add(newArray);
  } 
  else
  {
    console.log("Friend is already a member of the group");
  }
};

const Add = async (array: string[]) => {
  try {
    setLoading(true);
    const { updatedMembers } = await addMember(array, GroupData?.$id);
    
    console.log(updatedMembers);
    if(updatedMembers){
    setmemberArray(array)
    navigate(`/groups/${id}`);
    }
  } catch (error) {
    console.error("Error adding member:", error);
  }finally {
    setLoading(false);
  }
};

  return (
      <div className="common-container">
      <div className="user-container">

    <div className="container p-5 flex flex-col">
         <div className={`w-full`}>
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="disable shad-button_ghost">
            <img
              src="https://img.icons8.com/color/48/back--v1.png"
              alt="back"
              width={24}
              height={24}
            />
            <p className="small-medium lg:base-medium">Back</p>
          </Button>
        </div>
        <h2 className="h3-bold md:h2-bold w-full">Add Member</h2>

       {isGroupDataLoading || isFrndLoading ? (
        <Loader />
      ) : friendArray.length === 0 ? (
        <p className="text-white font-bold mb-2">You have no friends</p>
      ) : (
        <div style={{ maxHeight: "370px", overflowY: "auto" }} className="custom-scrollbar">
         <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {friendArray.map((friend:any) => (
            <li key={friend.id} className="bg-slate-800 p-4 shadow-md rounded-md text-white">
              <UserCard user={friend} />
              {memberArray.includes(friend.id) ? (
                <Button disabled>Already a Member</Button>
              ) : (
                <Button onClick={() => handleAddMember(friend.id)}>
                   {newid === friend.id && isLoading ? (
                  <>
                    Adding... <Loader />
                  </>
                ) : (
                  <span >Add to Group</span>
                )}{" "}                
                  </Button>
              )}
            </li>
          ))}
        </ul>
        </div>
      )}
        {/* Display friend list */}
       
      </div>
      </div>
      </div>
  );
};

export default AddMemberForm;
