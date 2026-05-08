import api from "./api";

export const fetchEvents = async (params = {}) => {
  const { data } = await api.get("/events", { params });
  return data;
};

export const fetchJoinedEvents = async () => {
  const { data } = await api.get("/events/joined/me");
  return data;
};

export const rsvpEvent = async (eventId) => {
  const { data } = await api.post(`/events/${eventId}/rsvp`);
  return data;
};

export const fetchEventRecommendations = async () => {
  const { data } = await api.get("/events/recommendations");
  return data;
};

export const createEvent = async (payload) => {
  const { data } = await api.post("/events", payload);
  return data;
};

export const updateEvent = async (eventId, payload) => {
  const { data } = await api.patch(`/events/${eventId}`, payload);
  return data;
};

export const deleteEvent = async (eventId) => {
  const { data } = await api.delete(`/events/${eventId}`);
  return data;
};