import { ID, Query } from "appwrite";
import { appwriteConfig, account, databases } from "./config";
import {  INewUser, INewExpense, INewGroup } from "@/types";

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );    
    if (!newAccount) throw Error;
    const newUser = await saveUserToDB({
      UserName: user.username,
      email: newAccount.email,
      accountId: newAccount.$id,
      name: newAccount.name
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  UserName?: string;
  email: string;
  accountId: string;
  name: String;
}) {
  try {
    const uniqueID = ID.unique();
    console.log("Unique ID " + uniqueID);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      uniqueID,
      user
    );

     await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.friendsCollectionId,
      ID.unique(),
      {
        CollectionId: newUser.$id,
      }
    );
    console.log(newUser.$id);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================== CREATE GROUP
export async function createGroup(group: INewGroup) {
  try {
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.groupsCollectionId,
      ID.unique(),
      {
        Creator: group.userId,
        groupName: group.groupName,
        Members: group.members,
      }
    );
    return newPost;
  } catch (error) {
    console.log(error);
  }
}

// ============================== CREATE EXPENSE

export async function createExpense(expense: INewExpense) {
  try {  
    const newExpense = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.activityCollectionId,
      ID.unique(),
      {
        Desc: expense.desc,
        PaidBy: expense.paidBy,
        Group : expense.group,
        Time : new Date().toISOString(),
        splitMember : expense.splitMember,
        Amout : expense.amount,
      }
    );    
    return newExpense;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE ACTIVITY
export async function deleteActivity(postId?: string) {

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.activityCollectionId,
      postId!
    );
    if (!statusCode) throw Error;
    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET GROUPS DATA
export async function getGroups() {
  try {
    const groups = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.groupsCollectionId,
    );

    if (!groups) throw Error;
    return groups;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FRIENDS DATA


export async function getFriends(userId?: string) {
  if (!userId) return;
  try {
    const friendsData = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.friendsCollectionId,
      [Query.equal("CollectionId", userId)]
    );
    return friendsData;
  } catch (error) {
    console.error(error);
  }
}
// ============================== GET ACTIVITY DATA
export async function getActivity() {
  try {
    const activity = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.activityCollectionId,
    );
    
    if (!activity) throw Error;
    return activity;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USERS

export async function getUsers() {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.friendsCollectionId,
    );    
    if (!users) throw Error;
    return users;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER BY ID
export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );
    if (!user) throw Error;
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getGroupById(groupId: string) {
  try {
    const group = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.groupsCollectionId,
      groupId
    );
    if (!group) throw Error;
    return group;
  } catch (error) {
    console.log(error);
  }
}


export async function geByUsername(username: string) {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("UserName", username) 
      ] 
    );
    if (!users.documents || users.documents.length === 0) {
      throw new Error("User not found");
    }
    const user = users.documents[0];
    return user;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}