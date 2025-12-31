import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getAllUploadEvents,
  getAllUsers,
  getUserById,
  resetUserPassword,
  updateRole,
  updateUser,
  type AllEvents,
} from "../services/adminApi";
import type { User } from "../types/entities";
import type { APIResponse } from "../types/api";
import {
  getAllBooks,
  getBookEntriesByDateRange,
  getUploadEvents,
  getUserBooks,
} from "@/services/userApi";

// 🔹 Get all users
export const useUsers = (isAdmin: boolean) =>
  useQuery<APIResponse<User[]>>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    enabled: !!isAdmin,
  });

// 🔹 Get one user
export const useUserById = (id: string) =>
  useQuery<APIResponse<User>>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

// create new user

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<APIResponse<User>, Error, Partial<User>>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<User>,
    Error,
    { id: string; userData: Partial<User> }
  >({
    mutationFn: ({ id, userData }) => updateUser(id, userData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
};

// delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<APIResponse<null>, Error, string>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// update user role
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<User>,
    Error,
    { id: string; role: "USER" | "ADMIN" }
  >({
    mutationFn: ({ id, role }) => updateRole(id, role),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
};

// reset user password
export const useResetUserPassword = () => {
  const queryClient = useQueryClient();
  return useMutation<APIResponse<User>, Error, string>({
    mutationFn: resetUserPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

//get all events
export const useAllUploadEvents = () => {
  return useQuery<APIResponse<AllEvents[]>>({
    queryKey: ["allUploadEvents"],
    queryFn: getAllUploadEvents,
  });
};

// get upload event
export const useUploadEvents = () => {
  return useQuery<APIResponse<{ fromDate: string; toDate: string }[]>>({
    queryKey: ["uploadEvents"],
    queryFn: getUploadEvents,
  });
};

// get user books
export const useUserBooks = () => {
  return useQuery<APIResponse<any[]>>({
    queryKey: ["userBooks"],
    queryFn: getUserBooks,
  });
};

// get all books
export const useAllBooks = () => {
  return useQuery<APIResponse<any[]>>({
    queryKey: ["allBooks"],
    queryFn: getAllBooks,
  });
};

// get book entries by date range
export const useBookEntriesByDateRange = (fromDate: string, toDate: string) => {
  return useQuery<APIResponse<any[]>>({
    queryKey: ["bookEntries", fromDate, toDate],
    queryFn: () => getBookEntriesByDateRange(fromDate, toDate),
    enabled: !!fromDate && !!toDate,
  });
};
