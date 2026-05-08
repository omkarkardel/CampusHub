import { useAuth } from "../../context/AuthContext";
import StudentDashboard from "./StudentDashboard";
import ClubAdminDashboard from "./ClubAdminDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";

const DashboardHome = () => {
  const { user } = useAuth();

  if (user?.role === "club_admin") return <ClubAdminDashboard />;
  if (user?.role === "super_admin") return <SuperAdminDashboard />;

  return <StudentDashboard />;
};

export default DashboardHome;