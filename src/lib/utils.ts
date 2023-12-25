import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { appwriteConfig, databases } from "./appwrite/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

//
export const multiFormatDateString = (timestamp: string = ""): string => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};

export async function targetaddFriend(newFriendArray: string[],visitDocId: any) {
  try {
      console.log("start 1");
      
      const updatedCurrentUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.friendsCollectionId,
      visitDocId,
      {
        friendsId: newFriendArray,
      }
    );
    console.log('Updated target user:', updatedCurrentUser);
    return { updatedCurrentUser };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loginaddFriend(LoginfriendArray: string[],loginDocId: any) {
  try {

    console.log("start 2");
    
    // Add the userId to the target user's followers list
    const updatedTargetUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.friendsCollectionId,
      loginDocId,
      {
        friendsId: LoginfriendArray,
      }
    );
    if(!updatedTargetUser) throw new Error("error1")
    console.log('Updated login user:', updatedTargetUser);
    return { updatedTargetUser };
  } catch (error) 
  {
    console.error(error);
    throw error;
  }
}


export async function addMember(
  newMemberArray: string[],
  groupDocId: any
  ) {
      try {
    
    // Add the targetUserId to the current user's followings list
      const updatedMembers = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.groupsCollectionId,
      groupDocId,
      {
        Members: newMemberArray,
      }
    );    
    return { updatedMembers };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
