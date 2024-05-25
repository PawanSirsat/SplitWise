import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, toast } from "@/components/ui";
import { Loader } from "@/components/shared";
import {
  useDeleteGroup,
  useGetCurrentUser,
  useGetGroupById,
} from "@/lib/react-query/queries";
import { Models } from "appwrite";
import GroupActivity from "@/components/shared/GroupActivity";
import { simplifyTransactions } from "@/components/shared/Simplify";

const GroupDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: GroupData, isLoading: isGroupDataLoading } = useGetGroupById(
    id!
  );
  const { data: currentUser } = useGetCurrentUser();
  const { mutateAsync: deleteGroupMutation, isLoading: isLoadingGroup } =
    useDeleteGroup();
  const [modal2, setModal2] = useState(false);

  const [showAllMembers, setShowAllMembers] = useState(false);

  const toggleShowAllMembers = () => {
    setShowAllMembers(!showAllMembers);
  };

  const membersToShow = showAllMembers
    ? GroupData?.Members
    : GroupData?.Members?.slice(0, 2);

  const handleDelete = async () => {
    try {
      toggleModal2(); // Close the modal
      await deleteGroupMutation({ groupId: GroupData?.$id });
      navigate(-1);
      toast({
        title: `Group Deleted Successfully.`,
      });
    } catch (error) {
      toast({
        title: `Failed to delete group. Please try again.`,
      });
    }
  };
  const GroupDataId = [GroupData];
  const simplifiedData2: { from: any; to: any; amount: number }[] =
    !isGroupDataLoading ? simplifyTransactions(GroupDataId) : [];

  const totalAmount = GroupData?.activity.reduce(
    (sum: number, activityItem: { Amout: string }) => {
      return sum + parseFloat(activityItem.Amout);
    },
    0
  );

  const [isBlurred, setIsBlurred] = useState(false);
  const handleButtonClick = () => {
    setIsBlurred((prevIsBlurred) => !prevIsBlurred);
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleModal2 = () => {
    setModal2(!modal2);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      <div className={`items-center flex-1 p-5 `}>
        <div className={`app-container `}>
          <button
            onClick={handleButtonClick}
            className={`blur-button ${isBlurred ? "expanded" : ""}`}>
            <span className={`plus-sign ${isBlurred ? "minus" : ""}`}></span>
          </button>
          <div className={`${isBlurred ? "expanded" : "hidden"}`}>
            <Button
              className="ml-2"
              onClick={() => navigate(`/add-member/${GroupData?.$id}`)}>
              Add Member
            </Button>
            <Button
              className="ml-2"
              onClick={() => navigate(`/add-expense/${GroupData?.$id}`)}>
              Add Expense
            </Button>
          </div>
        </div>
        <div className={`w-full`}>
          <Button
            onClick={() => navigate("/")}
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
          <div
            className={`bg-slate-800 p-4 shadow-md rounded-md text-white  ${
              isBlurred ? "blurred2" : ""
            }`}>
            <h2 className="text-lg font-bold mb-2  text-gray-400 inline ">
              Group :{" "}
              <span className="font-mono text-blue-400">
                &nbsp;{GroupData.groupName}{" "}
              </span>{" "}
            </h2>

            <p className="font-bold text-gray-400">
              Members :&nbsp;&nbsp;
              <span className="font-mono text-blue-400">
                {membersToShow
                  ?.map((user: { name: any }) => user.name)
                  .join(",")}
                {GroupData.Members?.length! > 2 && (
                  <span
                    className="text-green-400 cursor-pointer ml-1 underline"
                    onClick={toggleShowAllMembers}>
                    {showAllMembers ? "hide" : "show all"}
                  </span>
                )}
              </span>
            </p>

            <div className="flex items-center">
              <div className="py-2">
                <p
                  className="font-bold text-gray-400"
                  style={{ paddingBottom: "5px" }}>
                  Expenses :{" "}
                  <span className="font-bold text-green-400">
                    ${totalAmount.toFixed(2)}
                  </span>
                </p>
              </div>

              <div className=" ml-1 text-sm">
                <Button className="m-1" onClick={toggleModal}>
                  <img
                    width="24"
                    height="24"
                    src="/assets/icons/debt3.png"
                    alt="paytm"
                  />{" "}
                  Simplify Debt
                </Button>
                <Button
                  className="m-1"
                  onClick={toggleModal2}
                  disabled={isLoadingGroup}>
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/color/48/delete-forever.png"
                    alt="delete-forever"
                  />{" "}
                  {isLoadingGroup && <Loader />}
                  {isLoadingGroup ? "Deleting..." : "Delete Group"}{" "}
                </Button>
              </div>
            </div>

            <div
              style={{ maxHeight: "330px", overflowY: "auto" }}
              className="custom-scrollbar">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {GroupData.activity
                  .sort(
                    (
                      a: { Time: string | number | Date },
                      b: { Time: string | number | Date }
                    ) => new Date(b.Time).getTime() - new Date(a.Time).getTime()
                  ) // Sort by timestamp in descending order
                  .map((activity: Models.Document) => (
                    <li
                      key={activity.$id}
                      className="bg-slate-900 p-4 shadow-md  rounded-md text white">
                      <GroupActivity activity={activity} />
                    </li>
                  ))}
              </ul>
            </div>
            {modal && GroupData && simplifiedData2 && (
              <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>

                <div className="modal-content">
                  <div className="py-3">
                    <div className="flex justify-between">
                      <div className="py-2">
                        <h2 className="text-yellow-400	text-2xl font-bold  inline">
                          Simplify Debts
                        </h2>
                      </div>

                      <div className="ml-1">
                        <button className="m-1" onClick={toggleModal}>
                          <img
                            className="mr-1 p-1"
                            width="40"
                            height="40"
                            src="/assets/icons/close.png"
                            alt="paytm"
                          />
                        </button>
                      </div>
                    </div>

                    {simplifiedData2.map((item: any) => (
                      <>
                        <p className="">
                          <span
                            className={`text-lg font-bold inline ${
                              currentUser?.name === item.from
                                ? "text-green-500"
                                : "text-blue-500"
                            }`}>
                            {" "}
                            "{item.from}"
                          </span>{" "}
                          owes{" "}
                          <span
                            className={`text-lg font-bold inline ${
                              currentUser?.name === item.to
                                ? "text-green-500"
                                : "text-blue-500"
                            }`}>
                            "{item.to}"{" "}
                          </span>{" "}
                          <span className="text-lg font-bold text-red ">
                            &#8377;&nbsp;{item.amount.toFixed(1)}
                          </span>
                        </p>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {modal2 && (
        <div className="modal">
          <div onClick={handleDelete} className="overlay"></div>
          <div className="modal-content">
            <h2 className="text-yellow-400	 text-2xl font-bold mb-2">
              Do you want to delete this group?
            </h2>
            <p className="text-white font-semibold mb-2">
              If deleted, the Group expense will be permanently removed.
            </p>
            <Button className="btn bg-red hover:bg-red" onClick={toggleModal2}>
              Cancle
            </Button>
            <Button className="btn m-2 bg-green-400" onClick={handleDelete}>
              Confirm
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupDetails;
