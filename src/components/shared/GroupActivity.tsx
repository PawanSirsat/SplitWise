import { Models } from "appwrite";
import {
  useDeleteActivity,
  useGetCurrentUser,
} from "@/lib/react-query/queries";
import DateDisplay from "./DateDisplay";
import ActivityImage from "./ActivityImage";
import { Button } from "../ui/button";
import Loader from "./Loader";
import { useState } from "react";
import { toast } from "../ui";

type UserCardProps = {
  activity: Models.Document;
};

const GroupActivity = ({ activity }: UserCardProps) => {
  const { data: currentUser } = useGetCurrentUser();
  const [isHovered, setIsHovered] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const { mutateAsync: deleteActivityMutation, isLoading: isLoadingExpense } =
    useDeleteActivity();

  const handleDelete = async () => {
    try {
      setModal(!modal);
      await deleteActivityMutation({ activityId: activity.$id });
      toast({
        title: `Expense Deleted Successfully.`,
      });
    } catch (error) {
      toast({
        title: `Failed to delete activity. Please try again.`,
      });
    }
  };
  const isPaidByCurrentUser = activity.PaidBy.$id === currentUser?.$id;
  const isCurrentUserInvolved =
    activity.splitMember?.some(
      (member: { $id: string }) => member.$id === currentUser?.$id
    ) || false;
  const splitCount = activity.splitMember?.length ?? 0;

  let amountMessage = "";

  if (isPaidByCurrentUser && isCurrentUserInvolved) {
    const individualAmount = parseFloat(activity.Amout) / splitCount;
    const getback = parseFloat(activity.Amout) - individualAmount;
    amountMessage = `You get back $${getback.toFixed(2)}`;
  } else if (isPaidByCurrentUser && !isCurrentUserInvolved) {
    const individualAmount = parseFloat(activity.Amout);
    amountMessage = `You get back $${individualAmount.toFixed(2)}`;
  } else if (!isPaidByCurrentUser && isCurrentUserInvolved) {
    const individualAmount = parseFloat(activity.Amout) / splitCount;
    amountMessage = `You owe $${individualAmount.toFixed(2)}`;
  } else {
    amountMessage = `Not involved`;
  }

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="pb-2">
        <div style={{ display: "flex", alignItems: "center" }}>
          <ActivityImage Desc={activity.Desc} />
          <p className="text-lg font-bold mb-1 mt-2">&ensp;{activity.Desc}</p>
        </div>
        <span className="text-blue-500 text-lg font-bold mt-2">
          &#8377;{activity.Amout}
        </span>
      </div>

      <DateDisplay dateTimeString={activity.Time} />
      <p>
        Added by{" "}
        <span
          className={`font-semibold ${
            isPaidByCurrentUser ? "text-green-500" : "text-teal-400"
          }`}>
          "{activity.PaidBy.name}"
        </span>{" "}
        Split in{" "}
        <span className="font-bold text-teal-400	">
          {activity.splitMember?.map(
            (member: {
              UserName: string;
              email: string;
              accountId: string;
              name: string;
              $id: string;
            }) => <span key={member.$id}>{member.name}, </span>
          )}
        </span>{" "}
      </p>
      <p
        className={`${
          isPaidByCurrentUser
            ? "text-green-500 font-semibold"
            : !isPaidByCurrentUser && isCurrentUserInvolved
              ? "text-red font-semibold"
              : "text-indigo-700 font-semibold"
        }`}>
        {amountMessage}
        <Button
          onClick={toggleModal}
          style={{
            backgroundColor:
              isHovered || isLoadingExpense ? "#FF6347" : "#1CC29F",
            color: "white", // Text color
            padding: "8px 12px", // Equivalent to py-2 px-4
            borderRadius: "8px", // Rounded corners
            cursor: isLoadingExpense ? "not-allowed" : "pointer",
            opacity: isLoadingExpense ? 0.6 : 1, // Reduce opacity if loading
            transition: "background-color 0.3s", // Smooth background color transition
            float: "right", // Position button on the left
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={isLoadingExpense}>
          {isLoadingExpense && <Loader />}
          {isLoadingExpense ? "Deleting..." : "Delete"}
        </Button>
      </p>
      {modal && (
        <div className="modal">
          <div onClick={handleDelete} className="overlay"></div>
          <div className="modal-content">
            <h2 className="text-neutral-300	 text-2xl font-bold mb-2">
              Do you want to delete this expense?
            </h2>
            <p className="text-neutral-400 font-semibold mb-2">
              If deleted, the expense will be permanently removed.
            </p>
            <Button className="btn bg-red hover:bg-red" onClick={toggleModal}>
              Cancle
            </Button>
            <Button className="btn m-2 bg-green-600" onClick={handleDelete}>
              Confirm
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default GroupActivity;
