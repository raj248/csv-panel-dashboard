// src/pages/Dashboard.tsx
import { columns } from "@/components/columns/user";
import { DataTable } from "@/components/table/user-table";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useUsers } from "@/hooks/useUsers";
import React, { useState } from "react";

const Dashboard: React.FC = () => {
  useProtectedRoute();
  const { data: users, isLoading } = useUsers();
  const [selectedUser, setSelectedUser] = useState<any>(null);

  if (isLoading) return <p>Loading...</p>;
  if (!users?.success) return <p>Error: {users?.error ?? "Unknown error"}</p>;

  console.log(users?.data.length);
  return (
    <div style={{ padding: 24 }} className="bg-background">
      <DataTable
        columns={[
          ...columns,
          {
            id: "actions",
            header: "Actions",
            cell: (row) => {
              return (
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => console.log("Edit", row.row.original)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => console.log("Delete", row.row.original)}
                  >
                    Delete
                  </button>
                </div>
              );
            },
          },
        ]}
        data={users.data}
        tableType="user"
        onRowClick={(user) => setSelectedUser(user)}
      />
    </div>
  );
};

export default Dashboard;
