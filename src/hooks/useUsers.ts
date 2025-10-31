import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  resetUserPassword,
  updateRole,
  updateUser,
} from "../services/adminApi";
import type { User } from "../types/entities";
import type { APIResponse } from "../types/api";

// 🔹 Get all users
export const useUsers = (isAdmin: boolean) =>
  useQuery<APIResponse<User[]>>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    enabled: !!isAdmin,
  });

// 🔹 Get one user
export const useUser = (id: string) =>
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
