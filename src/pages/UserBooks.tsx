import React from "react";
import { useUserBooks } from "@/hooks/useUsers";
import { DataTable } from "@/components/table/user-table";

const UserBooksPage: React.FC = () => {
  const { data: booksResp, isLoading } = useUserBooks();

  if (isLoading) return <p>Loading...</p>;
  if (!booksResp?.success) return <p>Error: {booksResp?.error ?? "Unknown"}</p>;

  const books = booksResp.data;

  const columns = [
    { id: "isbn", header: "ISBN", accessorKey: "isbn" },
    { id: "name", header: "Book Name", accessorKey: "name" },
    // {
    //   id: "entriesCount",
    //   header: "Entries",
    //   accessorFn: (row: any) => row.entries?.length || 0,
    // },
  ];

  return (
    <div className="p-4 bg-background">
      <h2 className="text-xl font-medium mb-4">My Books</h2>
      <DataTable columns={columns} data={books} tableType="book" />
    </div>
  );
};

export default UserBooksPage;
