// src/pages/BookDetail.tsx
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { EditBookDialog } from "@/components/dialog/EditBookDialog";

import { DeleteBookDialog } from "@/components/dialog/DeleteBookDialog"; // New Import
import { Calendar, DollarSign, Hash, User as UserIcon } from "lucide-react";
import { useGetBookByIsbn } from "@/hooks/useBooks";
import { useAuth } from "@/context/auth-context";

const DUMMY_WEEKLY_SALES = [
  { week: "Week 1", sales: 45 },
  { week: "Week 2", sales: 52 },
  { week: "Week 3", sales: 38 },
  { week: "Week 4", sales: 65 },
  { week: "Week 5", sales: 48 },
  { week: "Week 6", sales: 70 },
];

const BookDetail = () => {
  const { isbn } = useParams();
  const { data: bookResp, isLoading } = useGetBookByIsbn(isbn ?? "");
  const { isAdmin } = useAuth();
  // In a real app, fetch book by ISBN

  if (isLoading) return <p>Loading book details...</p>;
  if (!bookResp?.success || !bookResp?.data)
    return <p>Error: Book not found or an error occurred.</p>;

  const bookData = bookResp.data;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{bookData.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              ISBN: {bookData.isbn}
            </span>

            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Printed: {bookData.year}
            </span>
            <DollarSign className="h-4 w-4 text-muted-foreground ml-4" />
            <span className="text-sm text-muted-foreground">
              Price: ${bookData.price}
            </span>
            <UserIcon className="h-4 w-4 text-muted-foreground ml-4" />
            <span className="text-sm text-muted-foreground">
              Author: {bookData.author ?? bookData.user.name}
            </span>
            <Badge variant="secondary">{bookData.user.email}</Badge>
          </div>
        </div>
        {/* ADMIN ACTIONS AREA */}
        {isAdmin && (
          <div className="flex gap-2">
            <EditBookDialog book={bookData} />
            <DeleteBookDialog bookId={bookData.id} bookName={bookData.name} />
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Author</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{bookData.user.name}</div>
            <p className="text-xs text-muted-foreground">
              {bookData.user.email}
            </p>
          </CardContent>
        </Card>
        {/* Add more KPI cards for Price and Print Year here */}
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Weekly Sales Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DUMMY_WEEKLY_SALES}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetail;
