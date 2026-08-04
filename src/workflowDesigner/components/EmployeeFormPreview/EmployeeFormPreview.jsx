import {
    Box,
    Divider,
    Typography
} from "@mui/material";

import { COMPONENT_REGISTRY } from "../../registry/componentRegistry";
import previewData from "../../preview/previewData";
import SelfAssessmentSupervisorPreview from "../SelfAssessment/SelfAssessmentSupervisorPreview";
import SelfAssessmentHRPreview from "../SelfAssessment/SelfAssessmentHRPreview";
import GoalListSupervisorPreview from "../GoalList/GoalListSupervisorPreview";
import GoalListHRPreview from "../GoalList/GoalListHRPreview";
import KPIListSupervisorPreview from "../KPIList/KPIListSupervisorPreview";
import KPIListHRPreview from "../KPIList/KPIListHRPreview";

export default function EmployeeFormPreview({

    workflow,
    previewMode,
    employeeResponses,
    supervisorResponses,
    setEmployeeResponses,
    setSupervisorResponses

}) {
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

            <Typography
                variant="h4"
                fontWeight={700}
                gutterBottom
            >
                {workflow.name} — {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} Stage
            </Typography>
            <Typography
                color="primary"
                fontWeight={700}
                mb={2}
            >
                Preview Mode: {previewMode}
            </Typography>
            <Divider sx={{ mb: 4 }} />
            {stageComponents.length === 0 && (

                <Typography
                    color="text.secondary"
                >
                    No employee form has been created yet.
                </Typography>

            )}

            {stageComponents.map(component => {

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
                return (

                    <Box
                        key={component.instanceId}
                        mb={4}
                    >

                        <PreviewComponent
                            component={component}
                            previewMode={previewMode}
                            previewData={previewData}
                            responses={
                                previewMode === "employee"
                                    ? employeeResponses
                                    : supervisorResponses
                            }
                            employeeResponses={employeeResponses}
                            onResponsesChange={
                                previewMode === "employee"
                                    ? setEmployeeResponses
                                    : setSupervisorResponses
                            }
                        />

                    </Box>

                );

            })}
            {previewMode !== "employee" &&
                workflow.stages.supervisor.map(component => {

                    let PreviewComponent =
                        COMPONENT_REGISTRY[component.id]?.preview;

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
                                previewData={previewData}
                                responses={supervisorResponses}
                                employeeResponses={employeeResponses}
                                onResponsesChange={setSupervisorResponses}
                            />

                        </Box>

                    );

                })
            }


        </Box>

    );

}