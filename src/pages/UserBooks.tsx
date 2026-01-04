// src/pages/UserBooksPage.tsx
import React from "react";
import { useUserBooks } from "@/hooks/useUsers";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hash, ArrowUpRight, Book as BookIcon, Layers } from "lucide-react";

const UserBooksPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: booksResp, isLoading } = useUserBooks();

  if (isLoading)
    return <p className="p-6 text-center">Loading your library...</p>;
  if (!booksResp?.success)
    return (
      <p className="p-6 text-center text-red-500">
        Error: {booksResp?.error ?? "Unknown"}
      </p>
    );

  const books = booksResp?.data || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Books</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view performance for your published titles.
          </p>
        </div>
        <Badge variant="outline" className="h-6 px-3">
          {books.length} Total Books
        </Badge>
      </div>

      {/* Table Container */}
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center gap-2">
            <BookIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Published Catalog</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {" "}
          {/* P-0 to allow table to be edge-to-edge if desired */}
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-[180px] pl-6">ISBN</TableHead>
                <TableHead>Book Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Print Year</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.length > 0 ? (
                books.map((book: any) => (
                  <TableRow
                    key={book.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => navigate(`/books/${book.isbn}`)}
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                        <Hash className="h-3 w-3" />
                        {book.isbn}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-foreground">
                        {book.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      {book.category ? (
                        <div className="flex items-center gap-1.5">
                          <Layers className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{book.category}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          Uncategorized
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="font-normal text-xs"
                      >
                        {book.year || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {book.price ? `₹${book.price.toFixed(2)}` : "—"}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1 shadow-sm"
                        asChild
                        onClick={(e) => e.stopPropagation()} // Prevent double navigation
                      >
                        <Link to={`/books/${book.isbn}`}>
                          View Details
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <BookIcon className="h-8 w-8 opacity-20" />
                      <p>You haven't added any books yet.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBooksPage;
