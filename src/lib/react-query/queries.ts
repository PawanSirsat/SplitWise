import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import {
  createUserAccount,
  signInAccount,
  getCurrentUser,
  signOutAccount,
  getUsers,
  getUserById,
  getGroups,
  getActivity,
  getFriends,
  createGroup,
  geByUsername,
  getGroupById,
  createExpense,
  deleteActivity,
} from "@/lib/appwrite/api";
import { INewExpense, INewGroup, INewUser } from "@/types";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useGroups = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_GROUPS],
    queryFn: getGroups,
  });
};

export const useFriends = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_FRIENDS, userId],
    queryFn: () => getFriends(userId),
    enabled: !!userId,
  });
};

export const useActivity = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_ACTIVITY],
    queryFn: getActivity,
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (group: INewGroup) => createGroup(group),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_GROUPS],
      });
    },
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (expense: INewExpense) => createExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_ACTIVITY],
      });
    },
  });
};

export const useAddFriend = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (group: INewGroup) => createGroup(group),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_FRIENDS],
      });
    },
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId }: { groupId?: string }) =>
      deleteActivity(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_ACTIVITY],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useGetGroupById = (groupId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_GROUP_BY_ID, groupId],
    queryFn: () => getGroupById(groupId),
    enabled: !!groupId,
  });
};

export const useGetUserByUserName = (userName: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_USER_NAME, userName],
    queryFn: () => geByUsername(userName),
    enabled: !!userName,
  });
};

