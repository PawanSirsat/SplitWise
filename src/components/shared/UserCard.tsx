import React from "react";
import { Models } from "appwrite";
import Profilephoto from "./Profilephoto";
import CircleLoader from "./CircleLoader";
import axios from "axios";

type UserCardProps = {
  user: Models.Document;
  userCanPay: number;
  friendCanPay: number;
};

const UserCard: React.FC<UserCardProps> = ({
  user,
  userCanPay,
  friendCanPay,
}) => {
  const handlePayment = () => {
    const upiLink = generateUPILink();
    if (upiLink) {
      window.location.href = upiLink;
    } else {
      // Handle error or provide feedback to the user
      console.error("Failed to generate UPI link");
    }
  };

  const generateUPILink = () => {
    // Replace these values with your actual payment details
    const payeeVPA = "johndoe@upi";
    const payeeName = "John Doe";
    const merchantCode = "123456";
    const transactionId = "txn123";
    const transactionRefId = "ref123";
    const transactionNote = "Payment for Goods";
    const transactionAmount = "100.00";
    const currencyCode = "INR";
    const callbackURL = "https://yourcallbackurl.com";

    // Construct the UPI link
    const upiLink = `upi://pay?pa=${payeeVPA}&pn=${payeeName}&mc=${merchantCode}&tid=${transactionId}&tr=${transactionRefId}&tn=${transactionNote}&am=${transactionAmount}&cu=${currencyCode}&url=${callbackURL}`;

    return upiLink;
  };

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="pb-3 text-white">
        <Profilephoto name={user} />
        <p className="text-lg font-bold mb-1 pl-3 text-blue-500">{user.name}</p>
      </div>
      {userCanPay === 0 || friendCanPay === 0 ? (
        <CircleLoader />
      ) : (
        <>
          <p>
            "{user.name}" owes you:{" "}
            <span className="text-lg font-bold text-green-500">
              &#8377;&nbsp;{userCanPay}
            </span>
          </p>
          <p>
            You owe "{user.name}":{" "}
            <span className="text-lg font-bold text-red">
              &#8377;&nbsp;{friendCanPay}
            </span>
          </p>
          <button onClick={handlePayment}>Settle Up</button>
        </>
      )}
    </div>
  );
};

export default UserCard;
