import axios from "axios";

const API_BASE = import.meta.env.DEV
  ? "http://127.0.0.1:8000"
  : "https://nurpbackend-production.up.railway.app";

export async function getReviewCycles(year) {
  const response = await axios.get(`${API_BASE}/evaluation-cycles`, {
    params: { year },
  });

  return response.data;
}

export async function updateReviewCycle(id, sendDate) {
  const response = await axios.put(`${API_BASE}/evaluation-cycles/${id}`, {
    invitation_date: sendDate || null,
  });

  return response.data;
}