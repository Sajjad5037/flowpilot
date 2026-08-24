import axios from "axios";

const API_BASE =
  import.meta.env.DEV
    ? "http://127.0.0.1:8000"
    : "https://nurpbackend-production.up.railway.app";
const evaluationTemplateService = {

    create: async (template) => {

        const response = await axios.post(

            `${API_BASE}/evaluation-templates`,

            template

        );

        return response.data;

    },

    getAll: async (includeInactive = false) => {

        const query = includeInactive
            ? "?include_inactive=true"
            : "";

        const response = await axios.get(

            `${API_BASE}/evaluation-templates${query}`

        );

        return response.data;

    },

    getById: async (id) => {

        const response = await axios.get(

            `${API_BASE}/evaluation-templates/${id}`

        );

        return response.data;

    },

    update: async (id, template) => {

        const response = await axios.put(

            `${API_BASE}/evaluation-templates/${id}`,

            template

        );

        return response.data;

    },

    delete: async (id) => {

        const response = await axios.delete(

            `${API_BASE}/evaluation-templates/${id}`

        );

        return response.data;

    },

    activate: async (id) => {

        const response = await axios.patch(

            `${API_BASE}/evaluation-templates/${id}/activate`

        );

        return response.data;

    }

};

export default evaluationTemplateService;