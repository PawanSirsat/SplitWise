type User = {
  UserName: string;
  email: string;
  accountId: string;
  name: string;
  $id: string;
  // Add any other properties if needed
};

type Transaction = {
  Desc: string;
  Time: string;
  Amount: number;
  $id: string;
  PaidBy: User;
  splitMember: User[];
};

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

  transactions.forEach((transaction) => {
    const isUserPayer = transaction.PaidBy.$id === userId;
    const isFriendPayer = transaction.PaidBy.$id === userFriendsID;

    const amountPerPerson = transaction.Amout / transaction.splitMember.length;

    transaction.splitMember.forEach((friend) => {
      const isFriend = friend.$id === userFriendsID;
      const isUser = friend.$id === userId;

      if (isUserPayer && isFriend) {
        userCanPay += amountPerPerson;
      } else if (isFriendPayer && isUser) {
        friendCanPay += amountPerPerson;
      }
    });
  });

  return { userCanPay, friendCanPay };
}
