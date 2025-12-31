// src/pages/Dashboard.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "@/components/columns/user";
import { CreateUserDialog } from "@/components/dialog/CreateUserDialog";
import { DataTable } from "@/components/table/user-table";
import { useAuth } from "@/context/auth-context";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useUsers } from "@/hooks/useUsers";
import { BookOpen, DollarSign, Users } from "lucide-react";

const WEEKLY_SALES_DATA = [
  { week: "Week 1", units: 45, revenue: 850 },
  { week: "Week 2", units: 52, revenue: 1100 },
  { week: "Week 3", units: 38, revenue: 720 },
  { week: "Week 4", units: 65, revenue: 1400 },
  { week: "Week 5", units: 48, revenue: 980 },
  { week: "Week 6", units: 70, revenue: 1650 },
  { week: "Week 7", units: 61, revenue: 1300 },
  { week: "Week 8", units: 85, revenue: 1900 },
];

const Dashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const { data: users, isLoading } = useUsers(isAdmin);

  useProtectedRoute();

  if (isLoading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-8 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {isAdmin ? "Publisher Dashboard" : "Author Dashboard"}
        </h1>
        {isAdmin && <CreateUserDialog />}
      </div>

      {/* --- KPI SECTION --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Units Sold
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">464</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$9,900</div>
            <p className="text-xs text-green-500 font-medium">Trending Up</p>
          </CardContent>
        </Card>
        {isAdmin && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Authors
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users?.data?.length || 0}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Weekly Units Sold</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="units"
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue Trends ($)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* --- ADMIN ONLY: USER MANAGEMENT --- */}
      {isAdmin && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <DataTable
            columns={[
              ...columns,
              {
                id: "actions",
                header: "Actions",
                cell: () => (
                  <div className="flex gap-2">
                    <button className="text-sm text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-sm text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
            data={users?.data || []}
            tableType="user"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
