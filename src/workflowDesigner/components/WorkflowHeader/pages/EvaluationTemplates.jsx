import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Stack,
    Typography,
    Paper
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import CreateEvaluationDialog from "../dialogs/CreateEvaluationDialog";
import WorkflowCard from "../components/WorkflowCard/WorkflowCard";

export default function EvaluationTemplates() {

    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);

    const [evaluations, setEvaluations] = useState([]);

    function handleCreate(evaluationName) {

        const workflow = {

            id: crypto.randomUUID(),

            name: evaluationName,

            stages: {

                employee: [],

                supervisor: [],

                hr: []

            }

        };

        setEvaluations(prev => [

            ...prev,

            workflow

        ]);

        setDialogOpen(false);

        navigate("/workflow-designer", {
            state: workflow
        });

    }

    function handleEdit(workflow) {

        navigate("/workflow-designer", {
            state: workflow
        });

    }

    function handleAssign(workflow) {

        console.log("Assign Evaluation:", workflow);

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
                        Create and manage reusable evaluation templates.
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
                        sx={{
                            mt: 1,
                            mb: 3
                        }}
                    >
                        Create your first evaluation template to begin designing your workflow.
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

                <Stack spacing={3}>

                    {evaluations.map(workflow => (

                        <WorkflowCard
                            key={workflow.id}
                            workflow={workflow}
                            onEdit={handleEdit}
                            onAssign={handleAssign}
                        />

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