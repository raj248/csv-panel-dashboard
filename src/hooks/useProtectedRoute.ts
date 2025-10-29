import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserSession } from "../services/authApi"; // must return { success, data: { isAdmin } }

export const useProtectAdminRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await checkUserSession();
        // const res = { success: true, data: { isAdmin: true } }; // dummy
        if (!res.success || !res.data?.isUser) {
          // alert("Session expired or unauthorized access.");
          navigate("/", { replace: true });
        }
      } catch (err) {
        // alert("Error validating session.");
        navigate("/", { replace: true });
      }
    };

    checkSession();
  }, [navigate]);
};
