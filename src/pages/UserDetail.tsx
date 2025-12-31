// src/pages/admin/UserDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useUserById } from "@/hooks/useUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditUserDialog } from "@/components/dialog/EditUserDialog";
import { DeleteUserDialog } from "@/components/dialog/DeleteUserDialog";
import { Mail } from "lucide-react";
import { useAuth } from "@/context/auth-context";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading } = useUserById(id ?? "");
  const { user: currentUser } = useAuth();

  if (isLoading) return <p>Loading user details...</p>;
  if (!user?.success || !user?.data)
    return <p>Error: User not found or an error occurred.</p>;

  const userData = user.data;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <p className="text-muted-foreground">
            User Management ID: {userData.id}
          </p>
        </div>
        <div className="flex gap-3">
          <EditUserDialog user={user.data} />
          {currentUser.email !== userData.email && (
            <DeleteUserDialog
              userId={userData.id}
              userName={userData.name}
              onSuccess={() => navigate("/admin/authors")}
            />
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contact</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{userData.email}</div>
          </CardContent>
        </Card>
        {/* Additional KPI Cards like 'Total Books Published' or 'Lifetime Sales' */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Author's Published Books</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            DataTable for this specific author's books goes here...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailPage;
