import React from "react";
import { useAllBooks } from "@/hooks/useUsers";
import { DataTable } from "@/components/table/user-table";
import { CreateBookDialog } from "@/components/dialog/CreateBookDialog";
import { useNavigate } from "react-router-dom";

const AllBooksPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: booksResp, isLoading } = useAllBooks();

  if (isLoading) return <p>Loading...</p>;
  if (!booksResp?.success) return <p>Error: {booksResp?.error ?? "Unknown"}</p>;

  const books = booksResp.data;
  const columns = [
    { id: "isbn", header: "ISBN", accessorKey: "isbn" },
    { id: "name", header: "Book Name", accessorKey: "name" },
    // { id: "author", header: "Author", accessorKey: "author" },
    { id: "price", header: "Price", accessorKey: "price" },
    { id: "printYear", header: "Print Year", accessorKey: "printYear" },
    {
      id: "userEmail",
      header: "User Email",
      accessorFn: (row: any) => row.user.email,
    },
  ];

  return (
    <div className="p-4 bg-background">
      <div className="flex justify-end mb-4">
        <CreateBookDialog />
      </div>
      <h2 className="text-xl font-medium mb-4">All Books</h2>
      <DataTable
        columns={columns}
        data={books}
        tableType="book"
        onRowClick={(book) => navigate(`/books/${book.isbn}`)} // Navigate on click
      />
    </div>
  );
};

export default AllBooksPage;
