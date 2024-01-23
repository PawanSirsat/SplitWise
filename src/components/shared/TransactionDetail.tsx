import DateDisplay from "./DateDisplay";

const TransactionDetail = ({ transactionData, userId }: any) => {
  return (
    <div className=" border-gray-300 rounded-lg m-1 font-bold">
      <div className="flex justify-between">
        <div>
          {/* Payer name */}
          <span className={"text-green-500"}>
            {userId === transactionData.payerId.$id
              ? `You `
              : `${transactionData.payerId.name}`}
          </span>
        </div>
        <div>
          {/* Transaction amount */}
          <span
            className={
              userId === transactionData.payerId?.$id
                ? "text-red"
                : "text-green-500"
            }>
            {userId === transactionData.payerId?.$id ? "-" : "+"}
            {transactionData.Amount}
          </span>
        </div>
      </div>
      <div className="text-blue-500">
        <DateDisplay dateTimeString={transactionData.Time} />
      </div>
    </div>
  );
};

export default TransactionDetail;
