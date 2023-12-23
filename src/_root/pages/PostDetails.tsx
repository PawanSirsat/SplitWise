import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { Loader } from "@/components/shared";
import { useGetGroupById } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import GroupActivity from "@/components/shared/GroupActivity";
import CollapseButton from "@/components/ui/CollapseButton";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: GroupData, isLoading: isGroupDataLoading } = useGetGroupById(id);
  const totalAmount = GroupData?.activity.reduce((sum: number, activityItem: { Amout: string }) => {
    return sum + parseFloat(activityItem.Amout);
  }, 0);

  const [isBlurred, setIsBlurred] = useState(false);

    const handleButtonClick = () => {
    setIsBlurred((prevIsBlurred) => !prevIsBlurred);
    console.log("Click");
    
  };
  return (
    <>
      <div className={`items-center flex-1 p-5 `}>   
             <div className={`app-container `}>
      <button onClick={handleButtonClick} className={`blur-button ${isBlurred ? 'expanded' : ''}`}>
        <span className={`plus-sign ${isBlurred ? 'minus' : ''}`}></span>
      </button>
      <div className={`${isBlurred ? 'expanded' : 'hidden'}`}>
        <Button className='ml-2'>Add Member</Button>
        <Button className='ml-2'>Add Expense</Button>
      </div>
    </div>

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

        {isGroupDataLoading || !GroupData ? (
          <Loader />
        ) : (
          <div className={`bg-slate-800 p-4 shadow-md rounded-md text-white  ${isBlurred ? 'blurred2' : ''}`}>
            <h2 className="text-lg font-bold mb-2">Group : {GroupData.groupName}</h2>

            <p>Members: {GroupData?.Members?.map((user: { name: any }) => user.name).join(', ')} </p>
            <p className="text-xl" style={{ paddingBottom: '5px' }}>
              Expenses: <span className="font-semibold text-green-500">${totalAmount.toFixed(2)}</span>
            </p>
            <div style={{ maxHeight: "330px", overflowY: "auto" }} className="custom-scrollbar">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {GroupData.activity.map((activity: Models.Document) => (
                  <li key={activity.$id} className="bg-slate-800 p-4 shadow-md rounded-md text white">
                    <GroupActivity activity={activity} GroupName={GroupData?.groupName} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetails;
