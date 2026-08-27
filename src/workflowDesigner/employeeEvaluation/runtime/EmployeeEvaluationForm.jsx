import {
    Box,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import SelfAssessment
    from "../components/SelfAssessment/SelfAssessment";
import CompanyInformation
    from "../components/CompanyInformation/CompanyInformation";
import GoalSelfEvaluation
    from "../components/GoalSelfEvaluation/GoalSelfEvaluation";
import KPIResults
    from "../components/KPIResults/KPIResults";

import ProfessionalAttributesCoreValues
    from "../components/ProfessionalAttributesCoreValues/ProfessionalAttributesCoreValues";
    
import KPIReviewPlanning
    from "../components/KPIReviewPlanning/KPIReviewPlanning";
import ExtraProjects
    from "../components/ExtraProjects/ExtraProjects";
import DiscussionNotesFeedback
    from "../components/DiscussionNotesFeedback/DiscussionNotesFeedback";
import Q3FeedbackProposedGoals
    from "../components/Q3FeedbackProposedGoals/Q3FeedbackProposedGoals";
import Q3GoalsPlanning
    from "../components/Q3GoalsPlanning/Q3GoalsPlanning";


export default function EmployeeEvaluationForm({
    workflow,
    employee,
    previewMode = "employee",
    responses = {},
    onResponsesChange,
    employeeResponses = {},
    supervisorResponses = {},
    hrResponses = {},
}) {

    const employeeInformation =
        workflow?.stages?.employee?.find(
            component => component.id === "employee_information"
        );

    const employeeComponents = workflow?.stages?.employee || [];
    const supervisorComponents = workflow?.stages?.supervisor || [];
    const hrComponents = workflow?.stages?.hr || [];

    const employeeOnlyComponentIds = [
        "self_assessment",
    ];

    const sharedEmployeeComponents =
        employeeComponents.filter(
            component =>
                !employeeOnlyComponentIds.includes(
                    component.id
                )
        );

    const sharedSupervisorComponents =
        supervisorComponents.filter(
            component =>
                [
                    "q3_goals_planning",
                ].includes(component.id)
        );

    function getFormComponents() {

        if (previewMode === "employee") {

            return [
                ...employeeComponents,
                ...sharedSupervisorComponents.filter(
                    supervisorComponent =>
                        !employeeComponents.some(
                            employeeComponent =>
                                employeeComponent.instanceId ===
                                supervisorComponent.instanceId
                        )
                ),
            ];

        }

        if (previewMode === "supervisor") {

            return [
                ...sharedEmployeeComponents,
                ...supervisorComponents,
            ];

        }

        if (previewMode === "hr") {

            return [
                ...sharedEmployeeComponents,
                ...supervisorComponents,
                ...hrComponents,
            ];

        }

        return [];

    }

    const formComponents = getFormComponents();

    function renderComponent(component) {

        switch (component.id) {

            case "company_information":
                return (
                    <CompanyInformation
                        key={component.instanceId}
                        component={component}
                    />
                );

            case "self_assessment":
                return (
                    <SelfAssessment
                        key={component.instanceId}
                        component={component}
                    />
                );

            case "goal_self_evaluation":
                return (
                    <GoalSelfEvaluation
                        key={component.instanceId}
                        component={component}
                        previewMode={previewMode}
                        reviewCycleMonths={employee?.review_cycle_months}
                        finalizedGoals={employee?.finalized_goals || []}
                        responses={responses}
                        onResponsesChange={onResponsesChange}
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                        hrResponses={hrResponses}
                    />
                );

            case "kpi_results":
                return (
                    <KPIResults
                        key={component.instanceId}
                        component={component}
                        previewMode={previewMode}
                        finalizedKpis={employee?.finalized_kpis || []}
                        reviewCycle={employee?.review_cycle}
                        reviewCycleMonths={employee?.review_cycle_months || []}
                        responses={responses}
                        onResponsesChange={onResponsesChange}
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                        hrResponses={hrResponses}
                    />
                );

            case "professional_attributes_core_values":
                if (
                    previewMode !== "supervisor" &&
                    previewMode !== "hr"
                ) {
                    return null;
                }

                return (
                    <ProfessionalAttributesCoreValues
                        key={component.instanceId}
                        component={component}
                        previewMode={previewMode}
                        responses={responses}
                        onResponsesChange={onResponsesChange}
                        supervisorResponses={supervisorResponses}
                    />
                );

            case "kpi_review_planning":
                return (
                    <KPIReviewPlanning
                        key={component.instanceId}
                        component={component}
                        previewMode={previewMode}
                        reviewCycle={employee?.review_cycle}
                        responses={responses}
                        onResponsesChange={onResponsesChange}
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                        hrResponses={hrResponses}
                    />
                );

            case "extra_projects":
                return (
                    <ExtraProjects
                        key={component.instanceId}
                        component={component}
                        previewMode={previewMode}
                        responses={responses}
                        onResponsesChange={onResponsesChange}
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                        hrResponses={hrResponses}
                    />
                );

            case "discussion_notes_feedback":
                return (
                    <DiscussionNotesFeedback
                        key={component.instanceId}
                        component={component}
                        previewMode={previewMode}
                        responses={responses}
                        onResponsesChange={onResponsesChange}
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                        reviewCycle={employee?.review_cycle}
                    />
                );

            case "q3_feedback_proposed_goals":
                return (
                    <Q3FeedbackProposedGoals
                        key={component.instanceId}
                        component={component}
                        previewMode={previewMode}
                        responses={responses}
                        onResponsesChange={onResponsesChange}
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                        reviewCycle={employee?.review_cycle}
                    />
                );

            case "q3_goals_planning":
                return (
                    <Q3GoalsPlanning
                        key={component.instanceId}
                        component={component}
                        previewMode={previewMode}
                        responses={responses}
                        onResponsesChange={onResponsesChange}
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                    />
                );

            default:
                return null;

        }

    }

    if (!employeeInformation) {

        return (

            <Box
                sx={{
                    width: "100%",
                    bgcolor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 2,
                    px: 3,
                    py: 3,
                }}
            >

                <Typography
                    sx={{
                        color: "#475569",
                        fontSize: 15,
                    }}
                >
                    Employee Information is not configured for this evaluation.
                </Typography>

            </Box>

        );

    }

    return (

        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}
        >

            <Box
                sx={{
                    width: "100%",
                    bgcolor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 2,
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
                    px: {
                        xs: 2,
                        sm: 3,
                    },
                    py: 3,
                }}
            >

            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                spacing={{
                    xs: 2.5,
                    md: 8,
                }}
            >

                <PrimaryInformationItem
                    label="EMPLOYEE NAME"
                    value={employee?.full_name}
                />

                <PrimaryInformationItem
                    label="SUPERVISOR"
                    value={employee?.supervisor_name}
                />

            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={{
                    xs: 2.5,
                    sm: 3,
                }}
            >

                <SecondaryInformationItem
                    label="Email"
                    value={employee?.email}
                />

                <SecondaryInformationItem
                    label="Department"
                    value={employee?.department}
                />

                <SecondaryInformationItem
                    label="Review Cycle"
                    value={employee?.review_cycle}
                />

            </Stack>

            </Box>

            {formComponents.map(renderComponent)}

        </Box>

    );
}


function PrimaryInformationItem({
    label,
    value,
}) {

    return (

        <Box sx={{ flex: 1, minWidth: 0 }}>

            <Typography
                sx={{
                    color: "#94A3B8",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: 0.5,
                    mb: 0.5,
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    color: "#0F172A",
                    fontSize: {
                        xs: 20,
                        sm: 24,
                    },
                    fontWeight: 700,
                    overflowWrap: "anywhere",
                }}
            >
                {value || "-"}
            </Typography>

        </Box>

    );
}


function SecondaryInformationItem({
    label,
    value,
}) {

    return (

        <Box sx={{ flex: 1, minWidth: 0 }}>

            <Typography
                sx={{
                    color: "#94A3B8",
                    fontSize: 13,
                    mb: 0.5,
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    color: "#0F172A",
                    fontSize: 14,
                    fontWeight: 500,
                    overflowWrap: "anywhere",
                }}
            >
                {value || "-"}
            </Typography>

        </Box>

    );
}
