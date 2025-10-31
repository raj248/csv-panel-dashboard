import React from "react";
import { useAllBooks } from "@/hooks/useUsers";
import { DataTable } from "@/components/table/user-table";

const AllBooksPage: React.FC = () => {
  const { data: booksResp, isLoading } = useAllBooks();

  if (isLoading) return <p>Loading...</p>;
  if (!booksResp?.success) return <p>Error: {booksResp?.error ?? "Unknown"}</p>;

  const books = booksResp.data;
  console.log(books);
  const columns = [
    { id: "isbn", header: "ISBN", accessorKey: "isbn" },
    { id: "name", header: "Book Name", accessorKey: "name" },
    {
      id: "userEmail",
      header: "User Email",
      accessorFn: (row: any) => row.user.email,
    },
  ];

  return (
    <div className="p-4 bg-background">
      <h2 className="text-xl font-medium mb-4">All Users' Books</h2>
      <DataTable columns={columns} data={books} tableType="book" />
    </div>
  );
};

export default AllBooksPage;
