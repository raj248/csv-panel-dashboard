import React from "react";
import { useAllBooks } from "@/hooks/useUsers";
import { DataTable } from "@/components/table/user-table";
import { CreateBookDialog } from "@/components/dialog/CreateBookDialog";
import { useNavigate } from "react-router-dom";
import { BulkBookUploadDialog } from "@/components/dialog/BulkBookUploadDialog";

const AllBooksPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: booksResp, isLoading } = useAllBooks();

  if (isLoading) return <p>Loading...</p>;
  if (!booksResp?.success) return <p>Error: {booksResp?.error ?? "Unknown"}</p>;

  const books = booksResp.data;
  const columns = [
    { id: "isbn", header: "ISBN", accessorKey: "isbn" },
    { id: "name", header: "Book Name", accessorKey: "name" },
    { id: "price", header: "Price", accessorKey: "price" },
    {
      id: "author",
      header: "Author",
      // accessorKey: "author",
      accessorFn: (row: any) => row.author ?? row.user.name,
    },
    { id: "year", header: "Year", accessorKey: "year" },
    { id: "publisher", header: "Publisher", accessorKey: "publisher" },
    { id: "category", header: "Category", accessorKey: "category" },
    { id: "language", header: "Language", accessorKey: "language" },
    {
      id: "userEmail",
      header: "User Email",
      accessorFn: (row: any) => row.user.email,
    },
  ];

  return (
    <div className="p-4 bg-background">
      <div className="flex justify-end items-center gap-2 mb-4">
        <BulkBookUploadDialog />
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
