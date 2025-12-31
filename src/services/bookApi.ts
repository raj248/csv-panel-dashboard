import axios from "axios";

import type { APIResponse } from "../types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// create book
export const createBook = async (bookData: any): Promise<APIResponse<any>> => {
  const res = await axios.post<APIResponse<any>>(
    `${API_URL}/user/books`,
    bookData,
    { withCredentials: true }
  );
  return res.data;
};

// update book
export const updateBook = async (
  id: string,
  bookData: any
): Promise<APIResponse<any>> => {
  const res = await axios.put<APIResponse<any>>(
    `${API_URL}/user/books/${id}`,
    bookData,
    { withCredentials: true }
  );
  return res.data;
};

// delete book
export const deleteBook = async (id: string): Promise<APIResponse<null>> => {
  const res = await axios.delete<APIResponse<null>>(
    `${API_URL}/user/books/${id}`,
    { withCredentials: true }
  );
  return res.data;
};
