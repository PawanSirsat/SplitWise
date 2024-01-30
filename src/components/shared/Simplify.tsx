import { Models } from "appwrite";

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

export function simplifyTransactions(GroupData: any) {
  const idMap = new Map();
  const userFriends: any[] = [];

  GroupData.forEach((obj: any) => {
    obj.Members.forEach((member: any) => {
      if (!idMap.has(member.$id)) {
        idMap.set(member.$id, true);
        userFriends.push(member);
      }
    });
  });

  const jsonData = Array.from(
    new Set(
      GroupData.flatMap((obj: any) =>
        obj.activity.map((activity: any) => activity)
      )
    )
  );
  const users: { [key: string]: number } = {};
  userFriends.forEach((friend: Models.Document) => {
    users[friend.name] = 0;
  });

  const transactions: { from: any; to: any; amount: number }[] = [];
  const processedPairs = new Set();

  userFriends.forEach((friendList: Models.Document) => {
    userFriends.forEach((friend: Models.Document) => {
      const updatedUserFriendsID = friend.$id;

      if (updatedUserFriendsID !== friendList.$id) {
        const pair1 = `${friendList.$id}-${updatedUserFriendsID}`;
        const pair2 = `${updatedUserFriendsID}-${friendList.$id}`;

        if (!processedPairs.has(pair1) && !processedPairs.has(pair2)) {
          const { userCanPay, friendCanPay } = processTransactions(
            friendList.$id || "",
            jsonData || [],
            updatedUserFriendsID || []
          );

          transactions.push({
            from: friendList.name,
            to: friend.name,
            amount: friendCanPay,
          });

          transactions.push({
            from: friend.name,
            to: friendList.name,
            amount: userCanPay,
          });

          // Add the pairs to the set to avoid duplicates
          processedPairs.add(pair1);
          processedPairs.add(pair2);
        }
      }
    });
  });

  transactions.forEach((transaction) => {
    users[transaction.from] -= transaction.amount;
    users[transaction.to] += transaction.amount;
  });

  const simplifiedTransactions: { from: any; to: any; amount: number }[] = [];

  Object.keys(users).forEach((sender) => {
    if (users[sender] < 0) {
      Object.keys(users).forEach((receiver) => {
        if (users[receiver] > 0) {
          const amount = Math.min(Math.abs(users[sender]), users[receiver]);
          simplifiedTransactions.push({
            from: sender,
            to: receiver,
            amount: amount,
          });
          users[sender] += amount;
          users[receiver] -= amount;
        }
      });
    }
  });

  return simplifiedTransactions;
}
