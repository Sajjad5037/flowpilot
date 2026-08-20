import EmployeeInformation
    from "../components/EmployeeInformation/EmployeeInformation";

import EmployeeInformationProperties
    from "../components/EmployeeInformation/EmployeeInformationProperties";

import EmployeeInformationPreview
    from "../components/EmployeeInformation/EmployeeInformationPreview";


import CompanyInformation
    from "../components/CompanyInformation/CompanyInformation";

import CompanyInformationProperties
    from "../components/CompanyInformation/CompanyInformationProperties";

import CompanyInformationPreview
    from "../components/CompanyInformation/CompanyInformationPreview";


import SelfAssessment
    from "../components/SelfAssessment/SelfAssessment";

import SelfAssessmentProperties
    from "../components/SelfAssessment/SelfAssessmentProperties";

import SelfAssessmentPreview
    from "../components/SelfAssessment/SelfAssessmentPreview";

    
import GoalSelfEvaluation
    from "../components/GoalSelfEvaluation/GoalSelfEvaluation";

import GoalSelfEvaluationProperties
    from "../components/GoalSelfEvaluation/GoalSelfEvaluationProperties";

import GoalSelfEvaluationPreview
    from "../components/GoalSelfEvaluation/GoalSelfEvaluationPreview";

import KPIResults
    from "../components/KPIResults/KPIResults";

import KPIResultsProperties
    from "../components/KPIResults/KPIResultsProperties";

import KPIResultsPreview
    from "../components/KPIResults/KPIResultsPreview";

import KPIReviewPlanning
    from "../components/KPIReviewPlanning/KPIReviewPlanning";

import KPIReviewPlanningProperties
    from "../components/KPIReviewPlanning/KPIReviewPlanningProperties";

import KPIReviewPlanningPreview
    from "../components/KPIReviewPlanning/KPIReviewPlanningPreview";

import ExtraProjects
    from "../components/ExtraProjects/ExtraProjects";

import ExtraProjectsProperties
    from "../components/ExtraProjects/ExtraProjectsProperties";

import ExtraProjectsPreview
    from "../components/ExtraProjects/ExtraProjectsPreview";

import DiscussionNotesFeedback
    from "../components/DiscussionNotesFeedback/DiscussionNotesFeedback";

import DiscussionNotesFeedbackProperties
    from "../components/DiscussionNotesFeedback/DiscussionNotesFeedbackProperties";

import DiscussionNotesFeedbackPreview
    from "../components/DiscussionNotesFeedback/DiscussionNotesFeedbackPreview";

import Q3GoalsPlanning
    from "../components/Q3GoalsPlanning/Q3GoalsPlanning";

import Q3GoalsPlanningProperties
    from "../components/Q3GoalsPlanning/Q3GoalsPlanningProperties";

import Q3GoalsPlanningPreview
    from "../components/Q3GoalsPlanning/Q3GoalsPlanningPreview";

import ProfessionalAttributesCoreValues
    from "../components/ProfessionalAttributesCoreValues/ProfessionalAttributesCoreValues";

import ProfessionalAttributesCoreValuesProperties
    from "../components/ProfessionalAttributesCoreValues/ProfessionalAttributesCoreValuesProperties";

import ProfessionalAttributesCoreValuesPreview
    from "../components/ProfessionalAttributesCoreValues/ProfessionalAttributesCoreValuesPreview";

import Q3FeedbackProposedGoals
    from "../components/Q3FeedbackProposedGoals/Q3FeedbackProposedGoals";

import Q3FeedbackProposedGoalsProperties
    from "../components/Q3FeedbackProposedGoals/Q3FeedbackProposedGoalsProperties";

import Q3FeedbackProposedGoalsPreview
    from "../components/Q3FeedbackProposedGoals/Q3FeedbackProposedGoalsPreview";

export const EMPLOYEE_EVALUATION_REGISTRY = {

    /*
     * ==========================================
     * EMPLOYEE INFORMATION
     * ==========================================
     *
     * Admin configures this under Employee.
     *
     * It is inherited by Supervisor and HR
     * when they view the actual form.
     *
     * It does NOT appear in their component
     * lists because they should not add it again.
     */

    employee_information: {

        id: "employee_information",

        name: "Employee Information",

        category: "Basic Information",

        description:
            "Displays employee and evaluation information.",

        enabled: true,

        singleton: true,

        stages: [
            "employee"
        ],

        component:
            EmployeeInformation,

        properties:
            EmployeeInformationProperties,

        preview:
            EmployeeInformationPreview

    },


    /*
     * ==========================================
     * COMPANY INFORMATION
     * ==========================================
     *
     * Admin configures this under Employee.
     *
     * Supervisor and HR can see this information
     * in the actual form.
     *
     * It does NOT appear in their component lists.
     */

    company_information: {

        id: "company_information",

        name: "Company Information",

        category: "Content",

        description:
            "Displays the company's mission, core values, and self-rating guide.",

        enabled: true,

        singleton: true,

        stages: [
            "employee"
        ],

        component:
            CompanyInformation,

        properties:
            CompanyInformationProperties,

        preview:
            CompanyInformationPreview

    },


    /*
     * ==========================================
     * SELF ASSESSMENT
     * ==========================================
     *
     * Admin configures this under Employee.
     *
     * This is PRIVATE employee content.
     *
     * Supervisor must NOT see it.
     *
     * HR must NOT see it.
     *
     * It therefore appears only in the Employee
     * component list and Employee preview.
     */

    self_assessment: {

        id: "self_assessment",

        name: "Self Assessment",

        category: "Employee",

        description:
            "Instructions and guidance employees see before completing their self-assessment.",

        enabled: true,

        singleton: true,

        stages: [
            "employee"
        ],

        component:
            SelfAssessment,

        properties:
            SelfAssessmentProperties,

        preview:
            SelfAssessmentPreview

    },
    goal_self_evaluation: {

        id: "goal_self_evaluation",

        name: "Quarterly Goals Self-Evaluation",

        category: "Employee",

        description:
            "Allows employees to review their quarterly goals and provide a self-rating and feedback.",

        enabled: true,

        singleton: false,

        stages: [
            "employee"
        ],

        component:
            GoalSelfEvaluation,

        properties:
            GoalSelfEvaluationProperties,

        preview:
            GoalSelfEvaluationPreview

    },
    kpi_results: {
        id: "kpi_results",
        name: "KPI Results",
        category: "Performance",
        description:
            "Displays quarterly KPI results and role-specific KPI evaluation controls.",
        enabled: true,
        singleton: true,
        stages: ["employee"],
        component: KPIResults,
        properties: KPIResultsProperties,
        preview: KPIResultsPreview
    },
    kpi_review_planning: {
        id: "kpi_review_planning",
        name: "Q3 KPI Review & Planning",
        category: "Performance",
        description:
            "Allows employees and supervisors to propose KPI changes and HR to consolidate and finalize Q3 KPIs.",
        enabled: true,
        singleton: true,
        stages: ["employee", "supervisor", "hr"],
        component: KPIReviewPlanning,
        properties: KPIReviewPlanningProperties,
        preview: KPIReviewPlanningPreview,
    },
    extra_projects: {

        id: "extra_projects",

        name:
            "Extra Projects or Accomplishments",

        category:
            "Employee",

        description:
            "Allows employees to record additional projects or assignments completed during the quarter.",

        enabled: true,

        singleton: true,

        stages: [
            "employee"
        ],

        component:
            ExtraProjects,

        properties:
            ExtraProjectsProperties,

        preview:
            ExtraProjectsPreview,

    },
    discussion_notes_feedback: {

        id: "discussion_notes_feedback",

        name:
            "Discussion Notes & Feedback",

        category:
            "Employee",

        description:
            "Allows employees and supervisors to provide discussion notes and feedback for their evaluation meeting.",

        enabled: true,

        singleton: true,

        stages: [
            "employee"
        ],

        component:
            DiscussionNotesFeedback,

        properties:
            DiscussionNotesFeedbackProperties,

        preview:
            DiscussionNotesFeedbackPreview,

    },
    q3_feedback_proposed_goals: {

        id: "q3_feedback_proposed_goals",

        name: "Q3 Feedback & Proposed Goals",

        category: "Employee",

        description:
            "Allows employees to provide feedback and propose goals for Q3.",

        enabled: true,

        singleton: true,

        stages: [
            "employee"
        ],

        component:
            Q3FeedbackProposedGoals,

        properties:
            Q3FeedbackProposedGoalsProperties,

        preview:
            Q3FeedbackProposedGoalsPreview,

    },
    q3_goals_planning: {

        id: "q3_goals_planning",

        name: "Q3 Goals Planning",

        category: "Performance",

        description:
            "Allows employees, supervisors, and HR to propose, review, and finalize goals for Q3.",

        enabled: true,

        singleton: true,

        stages: [
            "employee"
        ],

        component:
            Q3GoalsPlanning,

        properties:
            Q3GoalsPlanningProperties,

        preview:
            Q3GoalsPlanningPreview,

    },
    professional_attributes_core_values: {

        id: "professional_attributes_core_values",

        name: "Professional Attributes & Core Values",

        category: "Performance",

        description:
            "Collects the professional attributes and core values the employee should work on.",

        enabled: true,

        singleton: true,

        stages: [
            "supervisor"
        ],

        component:
            ProfessionalAttributesCoreValues,

        properties:
            ProfessionalAttributesCoreValuesProperties,

        preview:
            ProfessionalAttributesCoreValuesPreview,

    },
    

};


export const EMPLOYEE_EVALUATION_COMPONENTS =
    Object.values(
        EMPLOYEE_EVALUATION_REGISTRY
    );