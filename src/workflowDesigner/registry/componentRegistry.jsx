import CompanyInformation from "../components/CompanyInformation/CompanyInformation";
import CompanyInformationProperties from "../components/CompanyInformation/CompanyInformationProperties";
import CompanyInformationPreview from "../components/CompanyInformation/CompanyInformationPreview";

import EmployeeInformation from "../components/EmployeeInformation/EmployeeInformation";
import EmployeeInformationProperties from "../components/EmployeeInformation/EmployeeInformationProperties";
import EmployeeInformationPreview from "../components/EmployeeInformation/EmployeeInformationPreview";

import SelfAssessment from "../components/SelfAssessment/SelfAssessment";
import SelfAssessmentProperties from "../components/SelfAssessment/SelfAssessmentProperties";
import SelfAssessmentPreview from "../components/SelfAssessment/SelfAssessmentPreview";

import GoalList from "../components/GoalList/GoalList";
import GoalListProperties from "../components/GoalList/GoalListProperties";
import GoalListPreview from "../components/GoalList/GoalListPreview";

import KPIList from "../components/KPIList/KPIList";
import KPIListProperties from "../components/KPIList/KPIListProperties";
import KPIListPreview from "../components/KPIList/KPIListPreview";

import PerformanceAndCoreValues from "../components/PerformanceAndCoreValues/PerformanceAndCoreValues";
import PerformanceAndCoreValuesProperties from "../components/PerformanceAndCoreValues/PerformanceAndCoreValuesProperties";
import PerformanceAndCoreValuesPreview from "../components/PerformanceAndCoreValues/PerformanceAndCoreValuesPreview";

import PerformanceAndCoreValuesHRPreview
from "../components/PerformanceAndCoreValues/PerformanceAndCoreValuesHRPreview";

export const COMPONENT_REGISTRY = {

    company_information: {

        id: "company_information",

        name: "Company Information",

        category: "Content",

        description: "Display the company mission and core values before the employee begins the evaluation.",

        enabled: true,

        singleton: true,

        component: CompanyInformation,

        properties: CompanyInformationProperties,

        preview: CompanyInformationPreview

    },

    employee_information: {

        id: "employee_information",

        name: "Employee Information",

        category: "Workflow",

        description: "Collect employee information before the evaluation begins.",

        enabled: true,

        singleton: true,

        component: EmployeeInformation,

        properties: EmployeeInformationProperties,

        preview: EmployeeInformationPreview

    },

    self_assessment: {

        id: "self_assessment",

        name: "Self Assessment",

        category: "Workflow",

        description: "Employees answer configurable self-assessment questions.",

        enabled: true,

        singleton: true,

        component: SelfAssessment,

        properties: SelfAssessmentProperties,

        preview: SelfAssessmentPreview

    },

    goal_list: {

        id: "goal_list",

        name: "Proposed Goals",

        category: "Workflow",

        description:
            "Employees propose goals for the next quarter.",

        enabled: true,

        singleton: true,

        component: GoalList,

        properties: GoalListProperties,

        preview: GoalListPreview

    },

    kpi_list: {

        id: "kpi_list",

        name: "Proposed KPIs",

        category: "Workflow",

        description:
            "Employees propose KPIs for the upcoming quarter.",

        enabled: true,

        singleton: true,

        component: KPIList,

        properties: KPIListProperties,

        preview: KPIListPreview

    },
    performance_and_core_values: {

        id: "performance_and_core_values",

        name: "Performance & Core Values",

        category: "Supervisor",

        description:
            "Supervisor completes the performance review and evaluation.",

        enabled: true,

        singleton: true,

        fields: [],

        component: PerformanceAndCoreValues,

        properties: PerformanceAndCoreValuesProperties,

        preview: PerformanceAndCoreValuesPreview

    },

};

export const COMPONENTS = Object.values(COMPONENT_REGISTRY);