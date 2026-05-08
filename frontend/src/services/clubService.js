import api from "./api";

export const fetchClubs = async () => {
  const { data } = await api.get("/clubs");
  return data;
};

export const fetchClubRegistrations = async () => {
  const { data } = await api.get("/clubs/admin/registrations");
  return data;
};

export const sendAnnouncement = async (message) => {
  const { data } = await api.post("/clubs/admin/announcements", { message });
  return data;
};

export const fetchClubAnalytics = async () => {
  const { data } = await api.get("/clubs/admin/analytics");
  return data;
};