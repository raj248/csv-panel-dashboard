// src/pages/Dashboard.tsx
import { columns } from "@/components/columns/user";
import { CreateUserDialog } from "@/components/dialog/CreateUserDialog";
import { DataTable } from "@/components/table/user-table";
import { useAuth } from "@/context/auth-context";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useUsers } from "@/hooks/useUsers";
import React from "react";
import { useNavigate } from "react-router-dom";

const Authors: React.FC = () => {
  const { isAdmin } = useAuth();
  const { data: users, isLoading } = useUsers(isAdmin);
  // selectedUser;
  const navigate = useNavigate();

  useProtectedRoute();
  console.log("Inside dashboard");

  if (isLoading) return <p>Loading...</p>;
  if (!users?.success) return <p>Error: {users?.error ?? "Unknown error"}</p>;

  return (
    <div style={{ padding: 24 }} className="bg-background">
      <div className="flex justify-end mb-4">
        <CreateUserDialog />
      </div>

      <DataTable
        columns={[
          ...columns,
          // {
          //   id: "actions",
          //   header: "Actions",
          //   cell: (row) => {
          //     return (
          //       <div className="flex gap-2">
          //         <button
          //           className="text-blue-500 hover:underline"
          //           onClick={() => console.log("Edit", row.row.original)}
          //         >
          //           Edit
          //         </button>
          //         <button
          //           className="text-red-500 hover:underline"
          //           onClick={() => console.log("Delete", row.row.original)}
          //         >
          //           Delete
          //         </button>
          //       </div>
          //     );
          //   },
          // },
        ]}
        data={users.data}
        tableType="user"
        onRowClick={(user) => navigate(`/admin/authors/${user.id}`)}
        // onRowClick={(user) => setSelectedUser(user)}
      />
    </div>
  );
};

export default Authors;
