import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import CreateEvaluationDialog from "../dialogs/CreateEvaluationDialog";

export default function EvaluationTemplates() {

    const navigate = useNavigate();

    const [evaluations, setEvaluations] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);

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

        console.log(
            "NEW EMPLOYEE EVALUATION BUILDER",
            workflow
        );

        return;
    }

}

    return (

        <Box
            sx={{
                p: 4,
                bgcolor: "#F5F7FB",
                minHeight: "100vh"
            }}
        >

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Evaluation Templates
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        Create reusable evaluation templates that can later be assigned to employees.
                    </Typography>

                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setDialogOpen(true)}
                >
                    Create Evaluation
                </Button>

            </Stack>

            {evaluations.length === 0 ? (

                <Paper
                    elevation={0}
                    sx={{
                        p: 8,
                        borderRadius: 3,
                        border: "1px solid #E5E7EB",
                        textAlign: "center"
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        No Evaluation Templates Yet
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 1, mb: 3 }}
                    >
                        Create your first evaluation template to begin building your workflow.
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setDialogOpen(true)}
                    >
                        Create Evaluation
                    </Button>

                </Paper>

            ) : (

                <Stack spacing={2}>

                    {evaluations.map(evaluation => (

                        <Paper
                            key={evaluation.id}
                            elevation={0}
                            sx={{
                                p: 3,
                                border: "1px solid #E5E7EB",
                                borderRadius: 3
                            }}
                        >

                            <Typography
                                variant="h6"
                                fontWeight={600}
                            >
                                {evaluation.name}
                            </Typography>

                            <Typography
                                color="text.secondary"
                                mt={1}
                            >
                                Employee Components: {evaluation.stages.employee.length}
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                Supervisor Components: {evaluation.stages.supervisor.length}
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                HR Components: {evaluation.stages.hr.length}
                            </Typography>

                        </Paper>

                    ))}

                </Stack>

            )}

            <CreateEvaluationDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onCreate={handleCreate}
            />

        </Box>

    );

}