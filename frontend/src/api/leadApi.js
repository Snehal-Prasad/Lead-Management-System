import axiosClient from "./axiosClient";

export const getLeads = (params) => axiosClient.get("/leads", { params });
export const getLeadById = (id) => axiosClient.get(`/leads/${id}`);
export const createLead = (data) => axiosClient.post("/leads", data);
export const updateLead = (id, data) => axiosClient.put(`/leads/${id}`, data);
export const updateLeadStatus = (id, status) =>
  axiosClient.patch(`/leads/${id}/status`, { status });
export const addNote = (id, text) =>
  axiosClient.post(`/leads/${id}/notes`, { text });
export const deleteLead = (id) => axiosClient.delete(`/leads/${id}`);
export const getDashboardMetrics = () => axiosClient.get("/dashboard/metrics");
