import { useSettlmentById } from "@/lib/react-query/queries";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import CircleLoader from "./CircleLoader";

type SimplifyCardProps = {
  activities: Models.Document[];
  userId: string | undefined;
};

const SimplifyCard: React.FC<SimplifyCardProps> = ({ activities, userId }) => {
  const calculateOverallBalance = (
    activities: Models.Document[],
    currentUserId: string | undefined
  ) => {
    let overallOwe = 0;
    let overallOwned = 0;

    activities.forEach((activity) => {
      const isPaidByCurrentUser = activity.PaidBy.$id === currentUserId;
      const isCurrentUserInvolved =
        activity.splitMember?.some(
          (member: { $id: string }) => member.$id === currentUserId
        ) || false;
      const splitCount = activity.splitMember?.length ?? 0;

      if (isPaidByCurrentUser && isCurrentUserInvolved) {
        const individualAmount = parseFloat(activity.Amout) / splitCount;
        const getback = parseFloat(activity.Amout) - individualAmount;
        overallOwned += getback;
      } else if (isPaidByCurrentUser && !isCurrentUserInvolved) {
        overallOwned += parseFloat(activity.Amout);
      } else if (!isPaidByCurrentUser && isCurrentUserInvolved) {
        const individualAmount = parseFloat(activity.Amout) / splitCount;
        overallOwe += individualAmount;
      }
    });

    return { overallOwe, overallOwned };
  };

  const { overallOwe, overallOwned } = calculateOverallBalance(
    activities,
    userId
  );

  const { data: settlementDataPayer, isLoading: issettlementDataPayerLoading } =
    useSettlmentById("", userId);

  const {
    data: settlementDataReceiver,
    isLoading: issettlementDataReceiverLoading,
  } = useSettlmentById(userId, "");

  const totalAmountPayer =
    settlementDataPayer?.documents?.reduce((sum: number, settlementItem) => {
      return sum + parseFloat(settlementItem.Amount);
    }, 0) ?? 0;

  const totalAmountReceiver =
    settlementDataReceiver?.documents?.reduce((sum: number, settlementItem) => {
      return sum + parseFloat(settlementItem.Amount);
    }, 0) ?? 0;

  const [payeer, setpayeer] = useState(0);
  const [receiver, setreceiver] = useState(0);

  useEffect(() => {
    const newSum = overallOwned - totalAmountPayer;
    setpayeer(newSum);
  }, [totalAmountPayer, overallOwned]);

  useEffect(() => {
    const newSum = overallOwe - totalAmountReceiver;
    setreceiver(newSum);
  }, [totalAmountReceiver, overallOwe]);
  return (
    <>
      <div className="text-white text-lg font-bold mb-3">
        <p className="text-blue-500">
          Total Balance :{" "}
          <span
            className={`text-lg font-bold ${
              payeer - receiver < 0 ? "text-red" : "text-green-500"
            }`}>
            {" "}
            &#8377; {(payeer - receiver).toFixed(2)}
          </span>
        </p>
        <p>
          Overall, you owe{" "}
          <span style={{ display: "inline-block" }}>
            {issettlementDataReceiverLoading ? (
              <CircleLoader />
            ) : (
              <span className="text-red">&#8377;{receiver.toFixed(2)}</span>
            )}
          </span>
        </p>
        <p>
          and you are receive{" "}
          <span style={{ display: "inline-block" }}>
            {issettlementDataPayerLoading ? (
              <CircleLoader />
            ) : (
              <span className="text-green-500">&#8377;{payeer.toFixed(2)}</span>
            )}
          </span>
        </p>
      </div>
    </>
  );
};

export default SimplifyCard;
