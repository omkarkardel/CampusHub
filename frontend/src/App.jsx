import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppShell from "./layouts/AppShell";
import PublicLayout from "./layouts/PublicLayout";
import LandingPage from "./pages/LandingPage";
import ExplorePage from "./pages/ExplorePage";
import PublicEventsPage from "./pages/PublicEventsPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OAuthSuccessPage from "./pages/OAuthSuccessPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import EventsPage from "./pages/dashboard/EventsPage";
import TeamsPage from "./pages/dashboard/TeamsPage";
import ManageEventsPage from "./pages/dashboard/ManageEventsPage";
import AnnouncementsPage from "./pages/dashboard/AnnouncementsPage";
import GovernancePage from "./pages/dashboard/GovernancePage";
import ActivityPage from "./pages/dashboard/ActivityPage";
import NotFoundPage from "./pages/NotFoundPage";
import RouteTransitionLoader from "./components/common/RouteTransitionLoader";

const DashboardLayout = () => (
  <AppShell>
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="events" element={<EventsPage />} />
      <Route path="teams" element={<TeamsPage />} />
      <Route path="manage-events" element={<ManageEventsPage />} />
      <Route path="announcements" element={<AnnouncementsPage />} />
      <Route path="governance" element={<GovernancePage />} />
      <Route path="activity" element={<ActivityPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </AppShell>
);

const HomeRedirect = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />;
};

const AppRoutes = () => {
  const location = useLocation();
  const firstLoadRef = useRef(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (firstLoadRef.current) {
      firstLoadRef.current = false;
      return;
    }

    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <RouteTransitionLoader isVisible={isNavigating} />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/events" element={<PublicEventsPage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/oauth-success" element={<OAuthSuccessPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
