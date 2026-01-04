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
import { DeleteBookDialog } from "@/components/dialog/DeleteBookDialog";
import {
  Calendar,
  DollarSign,
  Hash,
  User as UserIcon,
  TrendingUp,
  Package,
  BarChart3,
} from "lucide-react";
import { useGetBookByIsbn } from "@/hooks/useBooks";
import { useAuth } from "@/context/auth-context";

const BookDetail = () => {
  const { isbn } = useParams();
  const { data: bookResp, isLoading } = useGetBookByIsbn(isbn ?? "");
  const { isAdmin } = useAuth();

  if (isLoading)
    return <div className="p-6 text-center">Loading book details...</div>;
  if (!bookResp?.success || !bookResp?.data)
    return (
      <div className="p-6 text-center text-destructive">
        Error: Book not found.
      </div>
    );

  const bookData = bookResp.data;
  const entries = bookData.entries || [];

  // Sort entries by date for the chart
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.fromDate!).getTime() - new Date(b.fromDate!).getTime()
  );

  // Calculate Aggregates
  const totalSold = entries.reduce(
    (acc, curr) => acc + (curr.soldCopies || 0),
    0
  );
  const totalRevenue = entries.reduce(
    (acc, curr) => acc + (curr.amount || 0),
    0
  );
  const currentStock =
    entries.length > 0
      ? sortedEntries[sortedEntries.length - 1].closingStock
      : 0;

  // Format data for Recharts
  const chartData = sortedEntries.map((entry) => ({
    period: new Date(entry.fromDate!).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    }),
    sales: entry.soldCopies,
    revenue: entry.amount,
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{bookData.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Hash className="h-4 w-4" /> {bookData.isbn}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> {bookData.year}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" /> ${bookData.price}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <UserIcon className="h-4 w-4" /> {bookData.user.name}
            </div>
            <Badge variant="secondary">{bookData.user.email}</Badge>
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-2">
            <EditBookDialog book={bookData} />
            <DeleteBookDialog bookId={bookData.id} bookName={bookData.name} />
          </div>
        )}
      </div>

      {/* KPI Cards Section */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Author</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold truncate">
              {bookData.user.name}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {bookData.user.email}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Copies Sold
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalSold.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all reporting periods
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹
              {totalRevenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Gross earnings from sales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStock ?? "0"}</div>
            <p className="text-xs text-muted-foreground">
              Available in warehouse
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Sales History</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monthly unit sales performance
            </p>
          </div>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="h-[350px] pt-4">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="period"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Copies Sold"
                  stroke="var(--color-chart-2)"
                  strokeWidth={3}
                  dot={{ r: 3, fill: "var(--color-chart-1)", strokeWidth: 2 }}
                  activeDot={{
                    r: 6,
                    fill: "var(--color-chart-2)",
                    strokeWidth: 0,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No sales data available for this book yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetail;
