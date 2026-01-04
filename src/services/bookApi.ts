import axios from "axios";

import type { APIResponse } from "../types/api";
import type { Book } from "../types/entities";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// create book
export const createBook = async (bookData: any): Promise<APIResponse<any>> => {
  const res = await axios.post<APIResponse<any>>(`${API_URL}/books`, bookData, {
    withCredentials: true,
  });
  return res.data;
};

// create bulk books
export const createBulkBooks = async (
  booksData: any[]
): Promise<APIResponse<any>> => {
  const res = await axios.post<APIResponse<any>>(
    `${API_URL}/books/bulk`,
    booksData,
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
    `${API_URL}/books/${id}`,
    bookData,
    { withCredentials: true }
  );
  return res.data;
};

// delete book
export const deleteBook = async (id: string): Promise<APIResponse<null>> => {
  const res = await axios.delete<APIResponse<null>>(`${API_URL}/books/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// get book by isbn
export const getBookByIsbn = async (
  isbn: string
): Promise<APIResponse<Book>> => {
  const res = await axios.get<APIResponse<Book>>(
    `${API_URL}/books/isbn/${isbn}`,
    { withCredentials: true }
  );
  return res.data;
};
