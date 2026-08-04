export const SECTION_TYPE_REGISTRY = {

    paragraph_section: {
        label: "Paragraph Section",
        description: "Narrative content such as Mission Statement, Core Values, Notes and Final Summary.",
        icon: "description",
        preview: null,
        defaultComponents: ["paragraph"]
    },

    performance_rating: {
        label: "Performance Rating",
        description: "Displays the employee performance rating scale.",
        icon: "stars",
        preview: null,
        defaultComponents: ["performance_rating_scale"]
    },

    quarter_goals: {
        label: "Quarter Goals",
        description: "Displays quarterly goals and their evaluation.",
        icon: "flag",
        preview: null,
        defaultComponents: ["quarter_goal"]
    },

    kpi_results: {
        label: "KPI Results",
        description: "Displays KPI achievements and outcomes.",
        icon: "analytics",
        preview: null,
        defaultComponents: ["kpi_result"]
    },

    extra_projects: {
        label: "Extra Projects",
        description: "Displays additional projects completed during the review period.",
        icon: "work",
        preview: null,
        defaultComponents: ["extra_project"]
    },

    notes: {
        label: "Notes",
        description: "General comments and observations.",
        icon: "notes",
        preview: null,
        defaultComponents: ["paragraph"]
    },

    moving_forward: {
        label: "Moving Forward",
        description: "Development plan and next steps.",
        icon: "trending_up",
        preview: null,
        defaultComponents: ["paragraph"]
    },

    final_summary: {
        label: "Final Summary",
        description: "Overall evaluation summary.",
        icon: "summarize",
        preview: null,
        defaultComponents: ["paragraph"]
    }

};