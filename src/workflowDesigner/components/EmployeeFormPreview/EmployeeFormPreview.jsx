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

                <>

                    <Typography
                        variant="h3"
                        fontWeight={700}
                        gutterBottom
                    >
                        HR Goal & KPI Setting Master Sheet
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight={500}
                        sx={{ mb: 3 }}
                    >

                        <strong>Employee:</strong>{" "}

                        {employee?.full_name || "-"}

                        {" | "}

                        <strong>Supervisor:</strong>{" "}

                        {employee?.supervisor_name || "-"}

                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                </>

            ) : (

                <>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                        gutterBottom
                    >
                        {isActualEmployeeEvaluation && previewMode === "supervisor"
                            ? workflow.name.replace(/Employee$/, "Supervisor")
                            : workflow.name}
                        {isActualEmployeeEvaluation && cycleTitle &&
                            ` | ${cycleTitle}`}
                        {!isActualEmployeeEvaluation &&
                            ` — ${previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} Stage`}
                    </Typography>

                    {!isActualEmployeeEvaluation && (
                        <Typography
                            color="primary"
                            fontWeight={700}
                            mb={2}
                        >
                            Preview Mode: {previewMode}
                        </Typography>
                    )}

                    <Divider sx={{ mb: 4 }} />

                </>

            )}
            {stageComponents.length === 0 && (

                <Typography
                    color="text.secondary"
                >
                    No employee form has been created yet.
                </Typography>

            )}

            {stageComponents
                .filter(component =>

                    !(

                        previewMode === "hr" &&

                        component.id === "company_information"

                    )

                )
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