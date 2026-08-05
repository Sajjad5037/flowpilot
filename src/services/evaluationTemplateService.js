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

    getAll: async () => {

        const response = await axios.get(

            `${API_BASE}/evaluation-templates`

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

    }

};

export default evaluationTemplateService;