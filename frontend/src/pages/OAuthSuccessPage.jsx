import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchProfile } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const OAuthSuccessPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setSession } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const completeAuth = async () => {
      localStorage.setItem("campus_token", token);
      const response = await fetchProfile();
      setSession(token, response.user);
      navigate("/dashboard");
    };

    completeAuth().catch(() => {
      localStorage.removeItem("campus_token");
      navigate("/login");
    });
  }, [navigate, params, setSession]);

  return <div className="flex min-h-screen items-center justify-center">Completing Google login...</div>;
};

export default OAuthSuccessPage;