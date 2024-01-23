import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  groupsCollectionId: import.meta.env.VITE_APPWRITE_GROUPS_COLLECTION_ID,
  activityCollectionId: import.meta.env.VITE_APPWRITE_ACTIVITY_COLLECTION_ID,
  friendsCollectionId: import.meta.env.VITE_APPWRITE_FRIENDS_COLLECTION_ID,
  TransactionCollectionId: import.meta.env.VITE_APPWRITE_FRIENDS_TRANSACTION_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
