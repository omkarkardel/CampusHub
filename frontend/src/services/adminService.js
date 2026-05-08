import api from "./api";

export const fetchAdminActivity = async () => {
  const { data } = await api.get("/admin/activity");
  return data;
};

export const fetchAllUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

export const updateRole = async (userId, role) => {
  const { data } = await api.patch(`/admin/users/${userId}/role`, { role });
  return data;
};