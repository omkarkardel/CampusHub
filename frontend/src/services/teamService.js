import api from "./api";

export const fetchTeams = async (eventId) => {
  const { data } = await api.get("/teams", { params: eventId ? { eventId } : {} });
  return data;
};

export const createTeam = async (payload) => {
  const { data } = await api.post("/teams", payload);
  return data;
};

export const joinTeam = async (teamId) => {
  const { data } = await api.post(`/teams/${teamId}/join`);
  return data;
};

export const fetchTeammateSuggestions = async (eventId) => {
  const { data } = await api.get(`/teams/suggestions/${eventId}`);
  return data;
};