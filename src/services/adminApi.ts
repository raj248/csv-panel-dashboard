import axios from "axios";
import type { User } from "../types/entities";
import type { APIResponse } from "../types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export type event = { fromDate: string; toDate: string; email: string };
export type AllEvents = {
  userId: string;
  email: string;
  name: string;
  events: event[];
};

// GET all users
export const getAllUsers = async (): Promise<APIResponse<User[]>> => {
  const res = await axios.get<APIResponse<User[]>>(`${API_URL}/auth/users`, {
    withCredentials: true,
  });
  return res.data; // keep success + error + data
};

// GET all upload events for all user
export const getAllUploadEvents = async (): Promise<
  APIResponse<AllEvents[]>
> => {
  const res = await axios.get<APIResponse<AllEvents[]>>(
    `${API_URL}/user/upload-events/all`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

// GET user by id
export const getUserById = async (id: string): Promise<APIResponse<User>> => {
  const res = await axios.get<APIResponse<User>>(`${API_URL}/user/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// create user
export const createUser = async (
  userData: Partial<User>
): Promise<APIResponse<User>> => {
  const res = await axios.post<APIResponse<User>>(
    `${API_URL}/auth/create-user`,
    userData,
    { withCredentials: true }
  );
  return res.data;
};

// reset password
export const resetUserPassword = async (
  email: string
): Promise<APIResponse<User>> => {
  const res = await axios.post<APIResponse<User>>(
    `${API_URL}/auth/reset-password/`,
    { email },
    { withCredentials: true }
  );
  return res.data;
};

// update role
export const updateRole = async (
  id: string,
  role: "USER" | "ADMIN"
): Promise<APIResponse<User>> => {
  const res = await axios.put<APIResponse<User>>(
    `${API_URL}/auth/update-role/${id}`,
    { role },
    { withCredentials: true }
  );
  return res.data;
};

// update user
export const updateUser = async (
  id: string,
  userData: Partial<User>
): Promise<APIResponse<User>> => {
  const res = await axios.put<APIResponse<User>>(
    `${API_URL}/auth/user/${id}`,
    userData,
    { withCredentials: true }
  );
  return res.data;
};

// delete user
export const deleteUser = async (id: string): Promise<APIResponse<null>> => {
  const res = await axios.delete<APIResponse<null>>(
    `${API_URL}/auth/delete-user/${id}`,
    { withCredentials: true }
  );
  return res.data;
};
