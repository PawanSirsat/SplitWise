type FriendTransactions = {
  friendCanPay: number;
  userCanPay: number;
};

export function processTransactions(
  userId: string,
  transactions: any,
  userFriendsID: any
): FriendTransactions {
  let friendCanPay = 0;
  let userCanPay = 0;

  transactions.forEach(
    (transaction: {
      PaidBy: { $id: string };
      Amout: number;
      splitMember: any[];
    }) => {
      const isUserPayer = transaction.PaidBy.$id === userId;
      const isFriendPayer = transaction.PaidBy.$id === userFriendsID;

      const amountPerPerson =
        transaction.Amout / transaction.splitMember.length;

      transaction.splitMember.forEach((friend) => {
        const isFriend = friend.$id === userFriendsID;
        const isUser = friend.$id === userId;

        if (isUserPayer && isFriend) {
          userCanPay += amountPerPerson;
        } else if (isFriendPayer && isUser) {
          friendCanPay += amountPerPerson;
        }
      });
    }
  );

  return { userCanPay, friendCanPay };
}
