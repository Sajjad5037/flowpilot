import axios from "axios";
const API_BASE =
  import.meta.env.DEV
    ? "http://127.0.0.1:8000"
    : "https://nurpbackend-production.up.railway.app";
console.log("Evaluation Assignment Service Loaded");
console.log("API_BASE =", API_BASE);
// --------------------------------------------------
// Get All Evaluation Assignments
// --------------------------------------------------

export async function getEvaluationAssignments() {

    const response = await axios.get(
        `${API_BASE}/evaluation-assignments`
    );

    return response.data;

}

// --------------------------------------------------
// Send Evaluation
// --------------------------------------------------

export async function sendEvaluation({

    employeeId,
    supervisorId,
    hrId,
    templateId

}) {

    const response = await axios.post(

        `${API_BASE}/evaluation-assignments`,

        {

            employee_id: employeeId,

            supervisor_id: supervisorId,

            hr_id: hrId,

            template_id: templateId

        }

    );

    return response.data;

}
// --------------------------------------------------
// Get Evaluation By Access Token
// --------------------------------------------------

export async function getEvaluationByToken(accessToken) {

    const response = await axios.get(

        `${API_BASE}/evaluation-assignments/token/${accessToken}`

    );

    return response.data;

}
// --------------------------------------------------
// Submit Employee Evaluation
// --------------------------------------------------

export async function submitEvaluation(

    assignmentId,

    responses

) {

    const response = await axios.post(

        `${API_BASE}/evaluation-assignments/${assignmentId}/submit`,

        {

            responses

        }

    );

    return response.data;

}