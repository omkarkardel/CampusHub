import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchProfile } from "../services/authService";
import { connectSocket, disconnectSocket } from "../services/socketService";

const AuthContext = createContext(null);

const tokenKey = "campus_token";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(tokenKey));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(tokenKey)));

  useEffect(() => {
    const initialize = async () => {
      if (!token) {
        setUser(null);
        setLoading(false);
        disconnectSocket();
        return;
      }

      try {
        const profile = await fetchProfile();
        const currentUser = profile.user;
        setUser(currentUser);
        connectSocket({ userId: currentUser._id || currentUser.id, role: currentUser.role });
      } catch {
        localStorage.removeItem(tokenKey);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [token]);

  const setSession = (nextToken, nextUser) => {
    localStorage.setItem(tokenKey, nextToken);
    setToken(nextToken);
    setUser(nextUser || null);
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    setToken(null);
    setUser(null);
    disconnectSocket();
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      setSession,
      setUser,
      logout,
      isAuthenticated: Boolean(token)
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
