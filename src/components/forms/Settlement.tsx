import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { ISettlement } from "@/types";
import { useMakeSettlement } from "@/lib/react-query/queries";
import { useForm } from "react-hook-form";
import Loader from "../shared/Loader";

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
    if (!isNaN(inputValue)) {
      setCashAmount(Math.min(Number(amount), inputValue));
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
            <label className="font-bold shad-form_label m-2 ml-3">
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
            <Button className="mt-2 m-2" type="submit">
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
              )}{" "}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settlement;
