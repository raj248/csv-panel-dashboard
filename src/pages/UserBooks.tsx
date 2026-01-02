import React from "react";
import { useUserBooks } from "@/hooks/useUsers";
import { DataTable } from "@/components/table/user-table";
import { useNavigate } from "react-router-dom";

const UserBooksPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: booksResp, isLoading } = useUserBooks();

  if (isLoading) return <p>Loading...</p>;
  console.log(booksResp?.data);
  if (!booksResp?.success) return <p>Error: {booksResp?.error ?? "Unknown"}</p>;

  const books = booksResp?.data;

  const columns = [
    { id: "isbn", header: "ISBN", accessorKey: "isbn" },
    { id: "name", header: "Book Name", accessorKey: "name" },
    // { id: "author", header: "Author", accessorKey: "author" },
    { id: "price", header: "Price", accessorKey: "price" },
    { id: "year", header: "Print Year", accessorKey: "year" },
  ];

  return (
    <div className="p-4 bg-background">
      <h2 className="text-xl font-medium mb-4">My Books</h2>
      <DataTable
        columns={columns}
        data={books ?? []}
        tableType="book"
        onRowClick={(book) => navigate(`/books/${book.isbn}`)} // Navigate on click
      />
    </div>
  );
};

export default UserBooksPage;
