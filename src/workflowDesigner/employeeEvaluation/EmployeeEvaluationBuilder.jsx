import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
    Box,
    Button,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import AvailableEvaluationComponents
    from "./components/AvailableEvaluationComponents";

import EvaluationStageCanvas
    from "./components/EvaluationStageCanvas";

import EvaluationPropertiesPanel
    from "./components/EvaluationPropertiesPanel";

import EvaluationPreview
    from "./components/EvaluationPreview";

import EvaluationStageTabs
    from "./components/EvaluationStageTabs";


export default function EmployeeEvaluationBuilder() {

    const location = useLocation();

    const incomingWorkflow = location.state;


    /*
     * Controls whether the full form preview is open.
     */
    const [previewOpen, setPreviewOpen] =
        useState(false);


    /*
     * Current builder stage.
     *
     * This is also what determines which form
     * will be shown when Preview is clicked.
     */
    const [currentStage, setCurrentStage] =
        useState("employee");


    const [selectedComponent, setSelectedComponent] =
        useState(null);


    /*
     * Normalise the workflow so the new builder
     * always uses:
     *
     * employee
     * supervisor
     * hr
     */
    const [workflow, setWorkflow] = useState(() => {

        if (incomingWorkflow) {

            return {

                ...incomingWorkflow,

                stages: {

                    employee:
                        incomingWorkflow.stages?.employee || [],

                    supervisor:
                        incomingWorkflow.stages?.supervisor || [],

                    hr:
                        incomingWorkflow.stages?.hr ||
                        incomingWorkflow.stages?.system ||
                        []

                }

            };

        }


        return {

            id: crypto.randomUUID(),

            name: "Untitled Employee Evaluation",

            type: "employee_evaluation",

            stages: {

                employee: [],

                supervisor: [],

                hr: []

            }

        };

    });


    /*
     * Add a component to the currently selected
     * builder stage.
     */
    function handleAddComponent(component) {

        const newComponent = {

            ...component,

            instanceId: crypto.randomUUID(),

        };


        setWorkflow(prev => ({

            ...prev,

            stages: {

                ...prev.stages,

                [currentStage]: [

                    ...(prev.stages[currentStage] || []),

                    newComponent

                ]

            }

        }));


        setSelectedComponent(newComponent);

    }


    /*
     * Update properties of the selected component.
     */
    function handleComponentChange(updatedComponent) {

        setSelectedComponent(updatedComponent);


        setWorkflow(prev => ({

            ...prev,

            stages: {

                ...prev.stages,

                [currentStage]:

                    (prev.stages[currentStage] || []).map(
                        component =>

                            component.instanceId ===
                            updatedComponent.instanceId

                                ? updatedComponent

                                : component

                    )

            }

        }));

    }


    /*
     * Change Employee / Supervisor / HR tab.
     */
    function handleStageChange(stage) {

        setCurrentStage(stage);


        /*
         * Only select components that actually
         * belong to the selected stage.
         */
        setSelectedComponent(

            workflow.stages[stage]?.[0] || null

        );

    }


    return (

        <Box
            sx={{
                p: 3,
                minHeight: "100vh",
                bgcolor: "#F5F7FB"
            }}
        >


            {/* ================================================= */}
            {/* BUILDER HEADER */}
            {/* ================================================= */}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                    border: "1px solid #E5E7EB"
                }}
            >

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Box>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            Employee Evaluation Builder
                        </Typography>


                        <Typography
                            color="text.secondary"
                            mt={0.5}
                        >
                            {workflow.name}
                        </Typography>

                    </Box>


                    {/* Preview / Save buttons */}

                    <Stack
                        direction="row"
                        spacing={2}
                    >

                        <Button
                            variant="outlined"
                            onClick={() =>
                                setPreviewOpen(true)
                            }
                        >
                            Preview
                        </Button>


                        <Button
                            variant="contained"
                        >
                            Save Draft
                        </Button>

                    </Stack>

                </Stack>

            </Paper>


            {/* ================================================= */}
            {/* EMPLOYEE / SUPERVISOR / HR TABS */}
            {/* ================================================= */}

            <Paper
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    border: "1px solid #E5E7EB"
                }}
            >

                <EvaluationStageTabs
                    currentStage={currentStage}
                    onStageChange={handleStageChange}
                />

            </Paper>


            {/* ================================================= */}
            {/* BUILDER PANELS */}
            {/* ================================================= */}

            <Stack
                direction="row"
                spacing={3}
                sx={{
                    minHeight: 650
                }}
            >


                {/* ================================================= */}
                {/* COMPONENT LIST */}
                {/* ================================================= */}

                <Paper
                    elevation={0}
                    sx={{
                        width: 280,
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid #E5E7EB",
                        overflowY: "auto"
                    }}
                >

                    <Typography
                        variant="h6"
                        mb={2}
                    >
                        Components
                    </Typography>


                    <AvailableEvaluationComponents
                        currentStage={currentStage}
                        onAddComponent={handleAddComponent}
                    />

                </Paper>


                {/* ================================================= */}
                {/* STAGE CANVAS */}
                {/* ================================================= */}

                <Paper
                    elevation={0}
                    sx={{
                        width: 400,
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid #E5E7EB",
                        overflowY: "auto"
                    }}
                >

                    <Typography
                        variant="h6"
                        mb={2}
                    >
                        {currentStage === "employee"
                            ? "Employee Stage"
                            : currentStage === "supervisor"
                            ? "Supervisor Stage"
                            : "HR Stage"
                        }
                    </Typography>


                    <EvaluationStageCanvas

                        currentStage={currentStage}

                        components={
                            workflow.stages[currentStage] || []
                        }

                        selectedComponent={
                            selectedComponent
                        }

                        onSelectComponent={
                            setSelectedComponent
                        }

                    />

                </Paper>


                {/* ================================================= */}
                {/* PROPERTIES */}
                {/* ================================================= */}

                <Paper
                    elevation={0}
                    sx={{
                        width: 320,
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid #E5E7EB",
                        overflowY: "auto"
                    }}
                >

                    <Typography
                        variant="h6"
                        mb={2}
                    >
                        Properties
                    </Typography>


                    <EvaluationPropertiesPanel
                        component={selectedComponent}
                        onChange={
                            handleComponentChange
                        }
                    />

                </Paper>
                {/* ================================================= */}
                {/* LIVE PREVIEW */}
                {/* ================================================= */}

                <Paper
                    elevation={0}
                    sx={{
                        flex: 1,
                        minWidth: 420,
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid #E5E7EB",
                        overflowY: "auto",
                        bgcolor: "#FFFFFF",
                    }}
                >

                    <Typography
                        variant="h6"
                        mb={1}
                    >
                        {currentStage === "employee"
                            ? "Employee Preview"
                            : currentStage === "supervisor"
                            ? "Supervisor Preview"
                            : "HR Preview"
                        }
                    </Typography>


                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={3}
                    >
                        Preview of what the{" "}
                        {currentStage === "employee"
                            ? "employee"
                            : currentStage === "supervisor"
                            ? "supervisor"
                            : "HR"
                        }{" "}
                        will see.
                    </Typography>


                    <EvaluationPreview
                        workflow={workflow}
                        previewMode={currentStage}
                    />

                </Paper>

            </Stack>


            {/* ================================================= */}
            {/* FULL FORM PREVIEW */}
            {/* ================================================= */}

            <EvaluationPreview

                open={previewOpen}

                onClose={() =>
                    setPreviewOpen(false)
                }

                workflow={workflow}

                /*
                 * This is the important part.
                 *
                 * Preview uses whichever tab the
                 * admin currently has selected.
                 */
                previewMode={currentStage}

            />

        </Box>

    );

}