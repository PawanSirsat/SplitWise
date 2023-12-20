import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1", // Updated URL value
  projectId: "657c067c93411fbcf173", // Updated project ID value
  databaseId: "657c0953b37f27853da8", // Updated database ID value
  storageId: "655731fab3467412e016", // Updated storage ID value
  userCollectionId: "657c096db7f49cee3b20", // Updated user collection ID value
  groupsCollectionId: "657c098394249f087496", // Updated post collection ID value
  activityCollectionId: "657c099dd2eddbdd9ebb", // Updated saves collection ID value
  friendsCollectionId: "6581b28b356ccbedd28d", // Updated saves collection ID value
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
