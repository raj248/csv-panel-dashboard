import axios from "axios";
import type { Admin } from "../types/entities";
import type { APIResponse } from "../types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ---------------- Admin Auth ------------------
export const loginUser = async (
  email: string,
  password: string
): Promise<APIResponse<Admin>> => {
  const res = await axios.post<APIResponse<Admin>>(
    `${API_URL}/auth/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return res.data;
};

export const checkUserSession = async (): Promise<
  APIResponse<{ isUser: boolean }>
> => {
  const res = await axios.get<APIResponse<{ isUser: boolean }>>(
    `${API_URL}/auth/check`,
    { withCredentials: true }
  );
  return res.data;
};

export const logoutUser = async (): Promise<APIResponse<null>> => {
  const res = await axios.post<APIResponse<null>>(
    `${API_URL}/auth/logout`,
    {},
    { withCredentials: true }
  );
  return res.data;
};
