import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import CreateEvaluationDialog from "../dialogs/CreateEvaluationDialog";
import evaluationTemplateService from "../../services/evaluationTemplateService";

function getWorkflowTypeLabel(workflowType) {

    const labels = {
        employee_evaluation: "Employee Evaluation",
        employee_goal_kpi: "Goal & KPI Settings",
        goal_kpi_setting: "Goal & KPI Settings"
    };

    return labels[workflowType] || workflowType;

}

export default function WorkflowDesigner() {

    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);

    const [templates, setTemplates] = useState([]);
    const [showInactive, setShowInactive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        loadTemplates();

    }, [showInactive]);

    async function loadTemplates() {

        setLoading(true);
        setError("");

        try {

            const data = await evaluationTemplateService.getAll(showInactive);

            setTemplates(data);

        } catch (loadError) {

            setError("Unable to load evaluation templates.");

        } finally {

            setLoading(false);

        }

    }

    function handleCreate(evaluation) {

    const workflow = {

        id: crypto.randomUUID(),

        name: evaluation.name,

        type: evaluation.type,

        stages: {

            employee: [],
            supervisor: [],
            hr: []

        }

    };

    // Existing Employee Goal & KPI workflow
    if (evaluation.type === "employee_goal_kpi") {

        navigate(
            `/workflow-editor/${workflow.id}`,
            {
                state: workflow
            }
        );

        return;
    }

    // New Employee Evaluation workflow
    if (evaluation.type === "employee_evaluation") {

        navigate(
            `/employee-evaluation-builder/${workflow.id}`,
            {
                state: workflow
            }
        );

        return;
    }

}

    async function handleDeactivate(template) {

        if (!window.confirm(
            `Are you sure you want to deactivate "${template.name}"?`
        )) {
            return;
        }

        try {

            await evaluationTemplateService.delete(template.id);

            await loadTemplates();

        } catch (deleteError) {

            setError(
                deleteError.response?.data?.detail ||
                "Unable to deactivate evaluation template."
            );

        }

    }

    async function handleActivate(template) {

        if (!window.confirm(
            `Are you sure you want to activate "${template.name}"?`
        )) {
            return;
        }

        try {

            await evaluationTemplateService.activate(template.id);

            await loadTemplates();

        } catch (activateError) {

            setError(
                activateError.response?.data?.detail ||
                "Unable to activate evaluation template."
            );

        }

    }

    const visibleTemplates = showInactive
        ? templates.filter(template => template.status === "inactive")
        : templates;

    return (

        <Box p={4}>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >

                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    Evaluation Templates
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => setDialogOpen(true)}
                >
                    + New Template
                </Button>

            </Stack>

            <Typography
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Manage your saved evaluation workflow templates.
            </Typography>

            <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 3 }}
            >

                <Button
                    size="small"
                    variant={!showInactive ? "contained" : "outlined"}
                    onClick={() => setShowInactive(false)}
                >
                    Active
                </Button>

                <Button
                    size="small"
                    variant={showInactive ? "contained" : "outlined"}
                    onClick={() => setShowInactive(true)}
                >
                    Inactive
                </Button>

            </Stack>

            {loading ? (

                <Typography color="text.secondary">
                    Loading evaluation templates...
                </Typography>

            ) : error ? (

                <Typography color="error">
                    {error}
                </Typography>

            ) : visibleTemplates.length === 0 ? (

                <Typography color="text.secondary">

                    No evaluation templates found.

                </Typography>

            ) : (

                <Paper
                    variant="outlined"
                    sx={{
                        overflow: "hidden",
                        borderColor: "divider"
                    }}
                >

                    {visibleTemplates.map((template, index) => (

                        <Stack

                            key={template.id}

                            direction={{ xs: "column", sm: "row" }}
                            spacing={{ xs: 2, sm: 3 }}
                            justifyContent="space-between"
                            alignItems={{ xs: "stretch", sm: "center" }}
                            sx={{
                                p: 2.5,
                                borderBottom: index < visibleTemplates.length - 1
                                    ? "1px solid"
                                    : "none",
                                borderColor: "divider"
                            }}

                        >

                            <Box sx={{ minWidth: 0, flex: 1 }}>

                                <Typography fontWeight={600}>
                                    {template.name}
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                    sx={{ mt: 0.5 }}
                                >
                                    {getWorkflowTypeLabel(template.workflow_type)}
                                </Typography>

                            </Box>

                            <Stack
                                direction="row"
                                spacing={1.5}
                                alignItems="center"
                                justifyContent="flex-end"
                            >

                                <Chip
                                    label={template.status}
                                    size="small"
                                    color={template.status === "active" ? "success" : "default"}
                                />

                                {showInactive ? (

                                    <Button
                                        variant="outlined"
                                        onClick={() => handleActivate(template)}
                                    >
                                        Activate
                                    </Button>

                                ) : (

                                    <>

                                        <Button
                                            variant="outlined"
                                            onClick={() => {

                                                const workflow = {
                                                    ...(template.workflow_json || {}),
                                                    id: template.id,
                                                    name: template.name,
                                                    workflow_type: template.workflow_type
                                                };

                                                const builderPath =
                                                    template.workflow_type === "employee_evaluation"
                                                        ? "employee-evaluation-builder"
                                                        : "workflow-editor";

                                                navigate(`/${builderPath}/${template.id}`, {
                                                    state: workflow
                                                });

                                            }}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeactivate(template)}
                                        >
                                            Deactivate
                                        </Button>

                                    </>

                                )}

                            </Stack>

                        </Stack>

                    ))}

                </Paper>

            )}

            <CreateEvaluationDialog

                open={dialogOpen}

                onClose={() => setDialogOpen(false)}

                onCreate={handleCreate}

            />

        </Box>

    );

}