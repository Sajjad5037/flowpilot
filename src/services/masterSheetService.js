import axios from "axios";

const API_BASE =
  import.meta.env.DEV
    ? "http://127.0.0.1:8000"
    : "https://nurpbackend-production.up.railway.app";

export async function getMasterSheet(assignmentId) {

    const response = await axios.get(

        `${API_BASE}/evaluation-master-sheets/${assignmentId}`

    );

    return response.data;

}