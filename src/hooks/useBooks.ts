import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBook,
  deleteBook,
  getBookByIsbn,
  updateBook,
} from "@/services/bookApi";

// useCreateBook
export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allBooks"] });
    },
  });
};

import { createBulkBooks } from "@/services/bookApi";

// useCreateBulkBooks
export const useCreateBulkBooks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBulkBooks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allBooks"] });
    },
  });
};

// useUpdateBook
export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, bookData }: { id: string; bookData: any }) =>
      updateBook(id, bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allBooks"] });
    },
  });
};

// useDeleteBook
export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userBooks"] });
      queryClient.invalidateQueries({ queryKey: ["allBooks"] });
    },
  });
};

// useGetBookByIsbn
export const useGetBookByIsbn = (isbn: string) => {
  return useQuery({
    queryKey: ["bookByIsbn", isbn],
    queryFn: () => getBookByIsbn(isbn),
    enabled: !!isbn,
  });
};
