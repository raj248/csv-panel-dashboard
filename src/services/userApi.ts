import axios from "axios";
import type { Book, User } from "../types/entities";
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
    `${API_URL}/kpi/upload-events`,
    { withCredentials: true }
  );
  return res.data;
};

// get all books
export const getAllBooks = async (): Promise<APIResponse<any[]>> => {
  const res = await axios.get<APIResponse<any[]>>(`${API_URL}/books/all`, {
    withCredentials: true,
  });
  return res.data;
};

// get user books
export const getUserBooks = async (): Promise<APIResponse<Book[]>> => {
  const res = await axios.get<APIResponse<Book[]>>(`${API_URL}/books`, {
    withCredentials: true,
  });
  console.log(res.status);
  return res.data;
};

// book entries by date range
export const getBookEntriesByDateRange = async (
  fromDate: string,
  toDate: string
): Promise<APIResponse<any[]>> => {
  const res = await axios.get<APIResponse<any[]>>(
    // `${API_URL}/user/data/${fromDate}/${toDate}`,
    `${API_URL}/kpi/data`,
    {
      params: { fromDate, toDate },
      withCredentials: true,
    }
  );
  return res.data;
};
