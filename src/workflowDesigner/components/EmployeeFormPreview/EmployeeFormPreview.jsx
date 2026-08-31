import {
    Box,
    Divider,
    Typography
} from "@mui/material";
import { useLocation } from "react-router-dom";

import { COMPONENT_REGISTRY } from "../../registry/componentRegistry";
import previewData from "../../preview/previewData";
import SelfAssessmentSupervisorPreview from "../SelfAssessment/SelfAssessmentSupervisorPreview";
import SelfAssessmentHRPreview from "../SelfAssessment/SelfAssessmentHRPreview";
import GoalListSupervisorPreview from "../GoalList/GoalListSupervisorPreview";
import GoalListHRPreview from "../GoalList/GoalListHRPreview";
import EmployeeGoalList from "../GoalList/EmployeeGoalList";
import EmployeeKPIList from "../KPIList/EmployeeKPIList";
import KPIListSupervisorPreview from "../KPIList/KPIListSupervisorPreview";
import KPIListHRPreview from "../KPIList/KPIListHRPreview";
import PerformanceAndCoreValuesHRPreview
from "../PerformanceAndCoreValues/PerformanceAndCoreValuesHRPreview";
export default function EmployeeFormPreview({

    workflow,
    previewMode,
    isBuilderPreview = false,
    reviewCycle,
    employee,
    employeeResponses,
    supervisorResponses,
    hrResponses,
    setEmployeeResponses,
    setSupervisorResponses,
    setHrResponses

}) {
    const location = useLocation();
    const isActualEmployeeEvaluation =
        !isBuilderPreview && location.pathname.startsWith("/evaluation/");
    const isRealEvaluation = isActualEmployeeEvaluation;
    console.log("DEBUG EmployeeFormPreview isBuilderPreview:", isBuilderPreview);
    console.log("DEBUG EmployeeFormPreview previewMode:", previewMode);
    console.log("DEBUG EmployeeFormPreview pathname:", location.pathname);
    console.log("DEBUG EmployeeFormPreview workflowName:", workflow?.name);
    console.log("DEBUG EmployeeFormPreview isRealEvaluation:", isRealEvaluation);
    const cycleTitle = reviewCycle?.split(" (")[0];

    let stageComponents;

    if (previewMode === "employee") {

        stageComponents = workflow.stages.employee;

    }
    else if (previewMode === "supervisor") {

        // Supervisor first reviews the completed employee form
        stageComponents = workflow.stages.employee;

    }
    else {

        // HR also starts by reviewing the employee submission
        stageComponents = workflow.stages.employee;

    }

    return (

        <Box>

            {previewMode === "hr" ? (

                <Box
                    sx={{
                        bgcolor: "#F1F5F9",
                        textAlign: "center",
                        px: {
                            xs: 2,
                            sm: 4,
                        },
                        py: {
                            xs: 2.5,
                            sm: 3,
                        },
                        mb: 4,
                    }}
                >
                    <Typography
                        component="h1"
                        sx={{
                            color: "#061A3A",
                            fontFamily: "Georgia, 'Times New Roman', serif",
                            fontSize: {
                                xs: 25,
                                sm: 31,
                            },
                            fontWeight: 800,
                            lineHeight: 1.15,
                            letterSpacing: 0,
                            textTransform: "uppercase",
                            overflowWrap: "anywhere",
                        }}
                    >
                        Goal &amp; KPI HR Master Sheet
                    </Typography>

                    <Typography
                        sx={{
                            color: "#60708A",
                            fontSize: {
                                xs: 12,
                                sm: 14,
                            },
                            fontWeight: 500,
                            lineHeight: 1.4,
                            letterSpacing: 0,
                            textTransform: "uppercase",
                            mt: 0.75,
                        }}
                    >
                        Alignment &amp; Final Approval Phase
                    </Typography>

                </Box>

            ) : (

                <Box
                    sx={{
                        bgcolor: "#F1F5F9",
                        textAlign: "center",
                        px: {
                            xs: 2,
                            sm: 4,
                        },
                        py: {
                            xs: 2.5,
                            sm: 3,
                        },
                        mb: 4,
                    }}
                >

                    <Typography
                        component="h1"
                        sx={{
                            color: "#061A3A",
                            fontFamily: "Georgia, 'Times New Roman', serif",
                            fontSize: {
                                xs: 25,
                                sm: 31,
                            },
                            fontWeight: 800,
                            lineHeight: 1.15,
                            letterSpacing: 0,
                            textTransform: "uppercase",
                            overflowWrap: "anywhere",
                        }}
                    >
                        {isActualEmployeeEvaluation && previewMode === "supervisor"
                            ? workflow.name.replace(/Employee$/, "Supervisor")
                            : workflow.name}
                        {isActualEmployeeEvaluation && cycleTitle &&
                            ` | ${cycleTitle}`}
                        {!isActualEmployeeEvaluation &&
                            ` — ${previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} Stage`}
                    </Typography>

                    <Typography
                        sx={{
                            color: "#60708A",
                            fontSize: {
                                xs: 12,
                                sm: 14,
                            },
                            fontWeight: 500,
                            lineHeight: 1.4,
                            letterSpacing: 0,
                            textTransform: "uppercase",
                            mt: 0.75,
                        }}
                    >
                        {isActualEmployeeEvaluation
                            ? `${previewMode} stage`
                            : `Preview Mode: ${previewMode}`}
                    </Typography>

                </Box>

            )}
            {stageComponents.length === 0 && (

                <Typography
                    color="text.secondary"
                >
                    No employee form has been created yet.
                </Typography>

            )}

            {stageComponents
                .map(component => {

                    let PreviewComponent =
                        COMPONENT_REGISTRY[component.id]?.preview;

                if (
                    component.id === "self_assessment" &&
                    previewMode === "supervisor"
                ) {

                    PreviewComponent = SelfAssessmentSupervisorPreview;

                }

                if (
                    component.id === "self_assessment" &&
                    previewMode === "hr"
                ) {

                    PreviewComponent = SelfAssessmentHRPreview;

                }


                if (!PreviewComponent) {
                    return null;
                }
                if (
                    component.id === "goal_list" &&
                    previewMode === "employee" &&
                    isRealEvaluation
                ) {

                    PreviewComponent = EmployeeGoalList;

                }
                if (
                    component.id === "goal_list" &&
                    previewMode === "supervisor"
                ) {

                    PreviewComponent = GoalListSupervisorPreview;

                }

                if (
                    component.id === "goal_list" &&
                    previewMode === "hr"
                ) {

                    PreviewComponent = GoalListHRPreview;

                }
                if (
                    component.id === "kpi_list" &&
                    previewMode === "employee" &&
                    isRealEvaluation
                ) {

                    PreviewComponent = EmployeeKPIList;

                }
                if (
                    component.id === "kpi_list" &&
                    previewMode === "supervisor"
                ) {

                    PreviewComponent = KPIListSupervisorPreview;

                }

                if (
                    component.id === "kpi_list" &&
                    previewMode === "hr"
                ) {

                    PreviewComponent = KPIListHRPreview;

                }
                if (
                    component.id === "performance_and_core_values" &&
                    previewMode === "hr"
                ) {

                    PreviewComponent = PerformanceAndCoreValuesHRPreview;

                }

                return (

                    <Box
                        key={component.instanceId}
                        mb={4}
                    >

                        <PreviewComponent
                            component={component}
                            previewMode={previewMode}
                            isBuilderPreview={isBuilderPreview}
                            isRealEvaluation={isRealEvaluation}
                            previewData={previewData}
                            employee={employee}
                            responses={
                                previewMode === "employee"
                                    ? employeeResponses
                                    : previewMode === "supervisor"
                                    ? supervisorResponses
                                    : hrResponses
                            }

                            employeeResponses={employeeResponses}

                            supervisorResponses={supervisorResponses}

                            onResponsesChange={
                                previewMode === "employee"
                                    ? setEmployeeResponses
                                    : previewMode === "supervisor"
                                    ? setSupervisorResponses
                                    : setHrResponses
                            }
                        />

                    </Box>

                );

            })}
            {previewMode !== "employee" &&
                workflow.stages.supervisor.map(component => {

                    let PreviewComponent =
                        COMPONENT_REGISTRY[component.id]?.preview;

                    if (
                        component.id === "performance_and_core_values" &&
                        previewMode === "hr"
                    ) {

                        PreviewComponent = PerformanceAndCoreValuesHRPreview;

                    }

                    if (!PreviewComponent) {
                        return null;
                    }

                    return (

                        <Box
                            key={component.instanceId}
                            mb={4}
                        >

                            <PreviewComponent
                                component={component}
                                previewMode={previewMode}
                                employee={employee}
                                previewData={previewData}
                                responses={
                                    previewMode === "supervisor"
                                        ? supervisorResponses
                                        : hrResponses
                                }
                                employeeResponses={employeeResponses}
                                supervisorResponses={supervisorResponses}
                                onResponsesChange={
                                    previewMode === "supervisor"
                                        ? setSupervisorResponses
                                        : setHrResponses
                                }
                            />

                        </Box>

                    );

                })
            }


        </Box>

    );

}