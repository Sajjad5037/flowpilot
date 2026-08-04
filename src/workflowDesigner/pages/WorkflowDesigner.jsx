import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CreateEvaluationDialog from "../dialogs/CreateEvaluationDialog";

export default function WorkflowDesigner() {

    const navigate = useNavigate();

    const [dialogOpen, setDialogOpen] = useState(false);

    const [workflows, setWorkflows] = useState([]);

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

        setWorkflows(prev => [...prev, workflow]);

        navigate(`/workflow-editor/${workflow.id}`, {

            state: workflow

        });

    }

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

            {workflows.length === 0 ? (

                <Typography color="text.secondary">

                    No evaluations created yet.

                </Typography>

            ) : (

                workflows.map(workflow => (

                    <Button

                        key={workflow.id}

                        fullWidth

                        sx={{
                            justifyContent: "flex-start",
                            mb: 2
                        }}

                        onClick={() =>
                            navigate(`/workflow-editor/${workflow.id}`, {

                                state: workflow

                            })
                        }

                    >

                        {workflow.name}

                    </Button>

                ))

            )}

            <CreateEvaluationDialog

                open={dialogOpen}

                onClose={() => setDialogOpen(false)}

                onCreate={handleCreate}

            />

        </Box>

    );

}