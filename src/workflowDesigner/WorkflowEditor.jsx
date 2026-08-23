import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
    Box,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import AvailableComponents from "./components/AvailableComponents/AvailableComponents";
import StageSelector from "./components/StageSelector/StageSelector";
import StageCanvas from "./components/StageCanvas/StageCanvas";
import { COMPONENT_REGISTRY } from "./registry/componentRegistry";
import WorkflowHeader from "./components/WorkflowHeader/WorkflowHeader";
import EmployeeFormPreview from "./components/EmployeeFormPreview/EmployeeFormPreview";
import EmployeeFormPreviewDialog from "./components/EmployeeFormPreview/EmployeeFormPreviewDialog";
import evaluationTemplateService from "../services/evaluationTemplateService";
import {
    getEvaluationPreviewResponses,
} from "../services/evaluationPreviewResponseService";
export default function Builder() {

    const location = useLocation();

    const incomingWorkflow = location.state;

    const [currentStage, setCurrentStage] = useState("employee");
    const [previewMode, setPreviewMode] = useState("employee");
    const [saveMessage, setSaveMessage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [lastSaved, setLastSaved] = useState("");
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [employeeResponses, setEmployeeResponses] = useState({});
    const [supervisorResponses, setSupervisorResponses] = useState({});
    const [hrResponses, setHrResponses] = useState({});

    useEffect(() => {

        getEvaluationPreviewResponses()
            .then((response) => {
                setEmployeeResponses(response.employee_responses || {});
                setSupervisorResponses(response.supervisor_responses || {});
                setHrResponses(response.hr_responses || {});
            });

    }, []);

    const [workflow, setWorkflow] = useState(

        incomingWorkflow ?? {

            name: "Untitled Evaluation",

            stages: {

                employee: [],

                supervisor: [],

                hr: []

            }

        }

    );

    function handleAddComponent(component) {

        console.log("================================");
        console.log("ADDING COMPONENT");
        console.log("================================");

        console.log("Current Stage:", currentStage);

        console.log("Component from Registry:", component);
        console.log("Registry fields:", component.fields);

        const registryComponent =
            COMPONENT_REGISTRY[component.id];

        console.log("Registry Lookup:", registryComponent);
        console.log("Registry Lookup Fields:", registryComponent?.fields);

        console.log("Registry Component:", registryComponent);

        // Prevent duplicate singleton components
        if (registryComponent?.singleton) {

            const existingComponent =
                workflow.stages[currentStage].find(
                    item => item.id === component.id
                );

            console.log("Existing Component:", existingComponent);

            if (existingComponent) {

                console.log("Singleton already exists. Selecting existing component.");

                setSelectedComponent(existingComponent);

                return;

            }

        }

        const newComponent = {

            ...component,

            fields: component.fields ?? [],

            instanceId: crypto.randomUUID()

        };

        console.log("New Component:", newComponent);

        console.log(
            "Fields on New Component:",
            newComponent.fields
        );

        setWorkflow(prev => {

            const updatedWorkflow = {

                ...prev,

                stages: {

                    ...prev.stages,

                    [currentStage]: [

                        ...prev.stages[currentStage],

                        newComponent

                    ]

                }

            };

            console.log("Updated Workflow:", updatedWorkflow);

            console.log(
                "Updated Stage Components:",
                updatedWorkflow.stages[currentStage]
            );

            return updatedWorkflow;

        });

        console.log("Selecting Component:", newComponent);

        setSelectedComponent(newComponent);

    }
    function handleComponentChange(updatedComponent) {
        
        console.log("====================");
        console.log("UPDATED COMPONENT");
        console.log(updatedComponent);

        console.log("FIELDS:");
        console.log(updatedComponent.fields);

        console.log("FULL JSON:");
        console.log(JSON.stringify(updatedComponent, null, 2));
        console.log("====================");

        // Update the selected component

        setSelectedComponent(updatedComponent);

        // Update the workflow

        setWorkflow(prev => ({

            ...prev,

            stages: {

                ...prev.stages,

                [currentStage]:

                    prev.stages[currentStage].map(component =>

                        component.instanceId === updatedComponent.instanceId
                            ? updatedComponent
                            : component

                    )

            }

        }));

    }

    function handleRemoveComponent(componentId) {

        setWorkflow(prev => ({

            ...prev,

            stages: {

                ...prev.stages,

                [currentStage]:
                    (prev.stages[currentStage] || []).filter(
                        component => component.instanceId !== componentId
                    )

            }

        }));

        setSelectedComponent(prev =>
            prev?.instanceId === componentId ? null : prev
        );

    }
    async function handleSave() {

        try {

            const response = await evaluationTemplateService.create({

                name: workflow.name,

                workflow_type: "goal_kpi_setting",

                workflow_json: workflow

            });

            console.log("Template Saved:", response);

            setSaveMessage("✓ Draft saved successfully.");

            setLastSaved(
                new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            );

        }

        catch (error) {

            console.error(error);

            alert("Failed to save template.");

        }

    }
    function handleNewEvaluation() {

        setWorkflow({

            name: "Untitled Evaluation",

            stages: {

                employee: [],

                supervisor: [],

                hr: []

            }

        });

        setSelectedComponent(null);

        setCurrentStage("employee");

        setSaveMessage("");

        setLastSaved("");

    }

    const PropertiesComponent =
        selectedComponent
            ? COMPONENT_REGISTRY[selectedComponent.id]?.properties
            : null;
    

    return (

        <Box
            sx={{
                p: 3,
                height: "100vh",
                bgcolor: "#F5F7FB"
            }}
        >

            <WorkflowHeader
                workflow={workflow}
                onWorkflowChange={setWorkflow}
                onPreview={() => setPreviewOpen(true)}
                onSave={handleSave}
                saveMessage={saveMessage}
                lastSaved={lastSaved}
            />

            <StageSelector
                currentStage={currentStage}
                onStageChange={(stage) => {

                    console.log("Stage Changed:", stage);

                    setCurrentStage(stage);
                    setPreviewMode(stage);

                    const firstComponent =
                        workflow.stages[stage][0] || null;

                    setSelectedComponent(firstComponent);

                }}
            />

            <Stack
                direction="row"
                spacing={3}
                sx={{
                    height: "calc(100% - 120px)"
                }}
            >

                {/* LEFT PANEL */}

                <Box
                    sx={{
                        width: 320
                    }}
                >
                    <AvailableComponents
                        currentStage={currentStage}
                        onAddComponent={handleAddComponent}
                        onNewEvaluation={handleNewEvaluation}
                    />
                </Box>

                {/* CENTER PANEL */}

                <StageCanvas
                    currentStage={currentStage}
                    components={workflow.stages[currentStage]}
                    selectedComponent={selectedComponent}
                    onRemoveComponent={handleRemoveComponent}
                    onSelectComponent={setSelectedComponent}
                />

                {/* RIGHT PANEL */}

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

                    {!selectedComponent && (

                        <Typography color="text.secondary">

                            Select a component to edit its properties.

                        </Typography>

                    )}

                    {selectedComponent && !PropertiesComponent && (

                        <Typography color="text.secondary">

                            This component doesn't have a properties editor yet.

                        </Typography>

                    )}

                    {selectedComponent && PropertiesComponent && (

                        <PropertiesComponent
                            component={selectedComponent}
                            onChange={handleComponentChange}
                        />

                    )}

                </Paper>
                {/* PREVIEW PANEL */}

                <Paper
                    elevation={0}
                    sx={{
                        width: 500,
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid #E5E7EB",
                        overflowY: "auto",
                        bgcolor: "#FFFFFF"
                    }}
                >

                    <Typography
                        variant="h6"
                        mb={3}
                    >
                        Employee Preview
                    </Typography>

                    <EmployeeFormPreview
                        workflow={workflow}
                        previewMode={previewMode}
                        isBuilderPreview
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                        hrResponses={hrResponses}
                        setEmployeeResponses={setEmployeeResponses}
                        setSupervisorResponses={setSupervisorResponses}
                        setHrResponses={setHrResponses}
                    />

                </Paper>


            </Stack>
            <EmployeeFormPreviewDialog
                open={previewOpen}
                workflow={workflow}
                previewMode={previewMode}
                isBuilderPreview
                employeeResponses={employeeResponses}
                supervisorResponses={supervisorResponses}
                hrResponses={hrResponses}
                setEmployeeResponses={setEmployeeResponses}
                setSupervisorResponses={setSupervisorResponses}
                setHrResponses={setHrResponses}
                onClose={() => setPreviewOpen(false)}
            />

        </Box>

    );

}