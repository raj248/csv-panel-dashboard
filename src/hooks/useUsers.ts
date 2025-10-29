import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserById } from "../services/adminApi";
import type { User } from "../types/entities";
import type { APIResponse } from "../types/api";

// 🔹 Get all users
export const useUsers = () =>
  useQuery<APIResponse<User[]>>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

// 🔹 Get one user
export const useUser = (id: string) =>
  useQuery<APIResponse<User>>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
