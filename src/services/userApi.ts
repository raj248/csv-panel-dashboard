import axios from "axios";
import type { User } from "../types/entities";
import type { APIResponse } from "../types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// update password of the user from old to new
export const updatePassword = async (
  oldPass: string,
  newPass: string
): Promise<APIResponse<User>> => {
  const res = await axios.put<APIResponse<User>>(
    `${API_URL}/auth/update-password`,
    { oldPass, newPass },
    { withCredentials: true }
  );
  return res.data;
};

// get api/user/upload-events
export const getUploadEvents = async (): Promise<APIResponse<any[]>> => {
  const res = await axios.get<APIResponse<any[]>>(
    `${API_URL}/user/upload-events`,
    { withCredentials: true }
  );
  return res.data;
};
