import { checkUserSession, logoutUser } from "../services/authApi";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isUser: boolean;
  isAdmin: boolean;
  loading: boolean;
  user: { name: string; email: string };
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: "", email: "" });

  const refresh = async () => {
    setLoading(true);
    const res = await checkUserSession().catch((err) => {
      console.error(err);
      return { success: false, data: null };
    });
    // const res = { success: true, data: { isAdmin: true } }; // dummy
    setIsUser(res.success && res.data?.isUser === true);
    setIsAdmin(res.success && res.data?.isAdmin === true);
    setUser({
      name: res.success ? res.data?.name ?? "" : "",
      email: res.success ? res.data?.email ?? "" : "",
    });

    setLoading(false);
  };

  const logout = async () => {
    await logoutUser(); // API call to clear cookie/session
    setLoading(true);
    setIsUser(false);
  };

  useEffect(() => {
    refresh();
    console.log("Refreshing user state");
  }, []);

  return (
    <AuthContext.Provider
      value={{ isUser, isAdmin, loading, user, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
