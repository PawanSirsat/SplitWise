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

export const getUniqueUserIdsFromGroups = (groups: any, userid: any) => {
  const uniqueUserDataMap = new Map(); // Use a Map to store unique user data based on user IDs

  groups.forEach((group: { Members: any[] }) => {
    if (group.Members && Array.isArray(group.Members)) {
      group.Members.forEach((member) => {
        if (member.$id !== undefined && member.$id !== userid) {
          uniqueUserDataMap.set(member.$id, member);
        }
      });
    }
  });
  const uniqueUserDataArray = Array.from(uniqueUserDataMap.values());
  return uniqueUserDataArray;
};
