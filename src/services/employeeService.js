import axios from "axios";
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://nurpbackend-production.up.railway.app";
export async function getEmployees() {

    const response = await axios.get(
        `${API_BASE}/employees`
    );

    return response.data;

}

export async function createEmployee(employee) {

    const response = await axios.post(
        `${API_BASE}/employees`,
        {
            full_name: employee.fullName,
            email: employee.email,
            slack_id: employee.slackId,
            department: employee.department,
            role: employee.role
        }
    );

    return response.data;

}

export async function updateEmployee(id, employee) {

    console.log("UPDATE ID:", id);
    console.log("UPDATE DATA:", employee);

    const response = await axios.put(
        `${API_BASE}/employees/${id}`,
        {
            full_name: employee.fullName,
            email: employee.email,
            slack_id: employee.slackId,
            department: employee.department,
            role: employee.role
        }
    );

    console.log("UPDATE RESPONSE:", response.data);

    return response.data;

}

export async function deleteEmployee(id) {

    const response = await axios.delete(
        `${API_BASE}/employees/${id}`
    );

    return response.data;

}