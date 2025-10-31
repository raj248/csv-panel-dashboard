import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserSession } from "../services/authApi"; // must return { success, data: { isAdmin } }

export const useProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await checkUserSession().catch((e) => {
          console.log(e);
        });
        if (res === undefined) {
          navigate("/", { replace: true });
          return;
        }
        // const res = { success: true, data: { isAdmin: true } }; // dummy
        if (!res.data?.isAdmin && res.data?.isUser) {
          // alert("Unauthorized access.");
          navigate("/overview", { replace: true });
        }
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
