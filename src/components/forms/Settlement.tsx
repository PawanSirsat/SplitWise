import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { ISettlement } from "@/types";
import { useMakeSettlement, useSettlmentById } from "@/lib/react-query/queries";
import { useForm } from "react-hook-form";
import Loader from "../shared/Loader";
import TransactionDetail from "../shared/TransactionDetail";
import { Models } from "appwrite";

const Settlement = () => {
  const form = useForm<ISettlement>({
    defaultValues: {
      payerId: "",
      receiverId: "", // Set the default value based on your logic
      amount: 0,
    },
  });
  const { amount } = useParams();
  const { receiverID } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { data: settlementDataPayer, isLoading: isPayerLoading } =
    useSettlmentById(user?.id, receiverID);

  const { data: settlementDataReceiver, isLoading: isReceiverLoading } =
    useSettlmentById(receiverID, user.id);

  // Use the spread operator to concatenate the 'documents' arrays
  const mergedArray = [
    ...(settlementDataPayer?.documents || []),
    ...(settlementDataReceiver?.documents || []),
  ];

  mergedArray
    .sort((a, b) => new Date(a.Time).getTime() - new Date(b.Time).getTime())
    .reverse();

  // Now, mergedArray is sorted based on the 'Time' property

  const { mutateAsync: makeSettlement, isLoading: isLoadingSettlement } =
    useMakeSettlement();

  const [cashAmount, setCashAmount] = React.useState(Number(amount));

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValues = form.getValues();
    const newExpense = await makeSettlement({
      ...formValues,
      payerId: user.id!,
      receiverId: receiverID!,
      amount: cashAmount,
    });

    if (!newExpense) {
      console.log("Recording cash amount:", cashAmount);
    } else {
      navigate(-1);
    }
    console.log("Recording cash amount:", cashAmount);
  };

  const decreaseCashAmount = () => {
    setCashAmount((prevAmount) => Math.max(0, prevAmount - 1));
  };
  const increaseCashAmount = () => {
    setCashAmount((prevAmount) => Math.min(Number(amount), prevAmount + 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (!isNaN(inputValue) && inputValue > 0) {
      setCashAmount(Math.min(Number(amount), inputValue));
    } else {
      setCashAmount(null!);
    }
  };

  return (
    <div className="common-container">
      <div className="user-container">
        <div className="container p-3 flex flex-col">
          <div className={`w-full pb-3`}>
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
          <form
            onSubmit={handleFormSubmit} // Use handleSubmit directly
            className="flex-col gap-5 w-full max-w-5xl text-gray-300">
            <label className="font-bold shad-form_label m-2 ml-3 text-xl">
              Cash Amount:
            </label>
            <div className="flex m-2">
              <button
                type="button"
                onClick={decreaseCashAmount}
                className="shad-input px-4 py-2 rounded-l-md focus:outline-none focus:shadow-outline">
                -
              </button>
              <input
                type="number"
                className="shad-input text-center"
                value={cashAmount}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={increaseCashAmount}
                className="shad-input px-4 py-2 rounded-r-md focus:outline-none focus:shadow-outline">
                +
              </button>
            </div>
            <Button
              className={`mt-2 m-2 ${
                cashAmount === null || cashAmount === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : ""
              }`}
              type="submit"
              disabled={!cashAmount || cashAmount === 0} // Disable the button if amount is null or zero
            >
              <img
                className="mr-2"
                width="40"
                height="40"
                src="/assets/icons/cash.png"
                alt="paytm"
              />
              {isLoadingSettlement ? (
                <>
                  Saving... <Loader />
                </>
              ) : (
                <span>&#8377; {cashAmount} Record By Cash</span>
              )}
            </Button>
          </form>
          <div className="container p-1">
            <h4 className="text-white text-2xl font-bold mb-1 mt-2">
              Transactions
            </h4>
            {isPayerLoading || isReceiverLoading ? (
              <Loader />
            ) : mergedArray.length === 0 ? (
              <p className="text-white font-bold mb-2">
                No Transactions in Users
              </p>
            ) : (
              <>
                <div
                  style={{ maxHeight: "230px", overflowY: "auto" }}
                  className="custom-scrollbar">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mergedArray.map((activity: Models.Document) => (
                      <li
                        key={activity.$id}
                        className="bg-slate-800 p-4 shadow-md rounded-md text white">
                        <TransactionDetail
                          transactionData={activity}
                          userId={user.id}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* <TransactionDetail transactionData={mergedArray} userId={user.id} /> */}
      </div>
    </div>
  );
};

export default Settlement;
