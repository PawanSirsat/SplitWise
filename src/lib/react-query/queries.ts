import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  makeSettlement,
  getsettlement,
  deleteGroup,
  getGroupsActivityById,
  getUserGroupsById,
} from "@/lib/appwrite/api";
import { INewExpense, INewGroup, INewUser, ISettlement } from "@/types";

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

export const useSettlmentById = (payerId?: string, receiverId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SETTLEMENT, payerId, receiverId],
    queryFn: () => getsettlement(payerId, receiverId),
    enabled: !!(payerId || receiverId),
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
      queryClient.invalidateQueries([QUERY_KEYS.GET_GROUPS_BY_ID]);
      queryClient.invalidateQueries([QUERY_KEYS.GET_CURRENT_USER]);
    },
  });
};
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useMakeSettlement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settle: ISettlement) => makeSettlement(settle),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_NEW_SETTLEMENT],
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
    mutationFn: ({ activityId }: { activityId?: string }) =>
      deleteActivity(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_GROUP_BY_ID],
      });
    },
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ groupId }: { groupId?: string }) => deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_GROUPS],
      });
    },
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

export const useGetGroupsActivityById = (groups: string[]) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_GROUPS_BY_ID, groups],
    queryFn: () => getGroupsActivityById(groups),
    enabled: !!groups,
  });
};

export const useGetUserGroupsById = (groups: string[]) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_GROUPS_BY_ID, groups],
    queryFn: () => getUserGroupsById(groups),
    enabled: !!groups,
  });
};

export const useGetUserByUserName = (userName: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_USER_NAME, userName],
    queryFn: () => geByUsername(userName),
    enabled: !!userName,
  });
};
