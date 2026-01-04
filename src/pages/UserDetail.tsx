// src/pages/admin/UserDetail.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useUserById } from "@/hooks/useUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditUserDialog } from "@/components/dialog/EditUserDialog";
import { DeleteUserDialog } from "@/components/dialog/DeleteUserDialog";
import {
  Book as BookIcon,
  ShieldCheck,
  User as UserIcon,
  ArrowUpRight,
  Hash,
  Globe,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
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

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading } = useUserById(id ?? "");
  const { user: currentUser } = useAuth();

  if (isLoading)
    return <p className="p-6 text-center">Loading user details...</p>;
  if (!user?.success || !user?.data)
    return (
      <p className="p-6 text-center text-red-500">Error: User not found.</p>
    );

  const userData = user.data;
  const books = userData.books || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{userData.name}</h1>
            <Badge
              variant={userData.role === "ADMIN" ? "default" : "secondary"}
            >
              {userData.role}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <UserIcon className="h-4 w-4" /> {userData.email}
          </p>
        </div>

        <div className="flex gap-3">
          <EditUserDialog user={userData} />
          {currentUser.email !== userData.email && (
            <DeleteUserDialog
              userId={userData.id}
              userName={userData.name}
              onSuccess={() => navigate("/admin/authors")}
            />
          )}
        </div>
      </div>

      {/* KPI Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.length}</div>
            <p className="text-xs text-muted-foreground">Published titles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Account Role</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {userData.role.toLowerCase()}
            </div>
            <p className="text-xs text-muted-foreground text-primary">
              System permissions granted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(userData.createdAt).toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">Registration date</p>
          </CardContent>
        </Card>
      </div>

      {/* Books Table Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Author's Published Books</CardTitle>
            <Badge variant="outline">{books.length} Entries</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">ISBN</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Hash className="h-3 w-3" /> {book.isbn}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{book.name}</TableCell>
                      <TableCell>{book.category || "N/A"}</TableCell>
                      <TableCell>{book.year || "—"}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {book.price ? `₹${book.price.toFixed(2)}` : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/books/${book.isbn}`}>
                            View <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No books found for this author.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailPage;
