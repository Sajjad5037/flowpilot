import {
    Button,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function WorkflowHeader({

    workflow,

    onWorkflowChange,

    onPreview,

    onSave,

    saveMessage,

    lastSaved

}) {

    function handleNameChange(event) {

        onWorkflowChange({

            ...workflow,

            name: event.target.value

        });

    }

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                border: "1px solid #E5E7EB"
            }}
        >

            <Stack spacing={3}>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <div>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Workflow Designer
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Create an evaluation template that can later be assigned to employees.
                        </Typography>

                    </div>

                    <Stack
                        alignItems="flex-end"
                        spacing={1}
                    >

                        <Stack
                            direction="row"
                            spacing={2}
                        >

                            <Button
                                variant="outlined"
                                onClick={onPreview}
                            >
                                Preview
                            </Button>

                            <Button
                                variant="contained"
                                onClick={onSave}
                            >
                                Save Draft
                            </Button>

                        </Stack>

                        {saveMessage && (

                            <Typography
                                variant="caption"
                                color="success.main"
                            >
                                {saveMessage}

                                {lastSaved && ` Last saved: ${lastSaved}`}
                            </Typography>

                        )}

                    </Stack>

                </Stack>

                <TextField
                    fullWidth
                    label="Evaluation Name"
                    placeholder="Q2 2026 Goal & KPI Evaluation"
                    value={workflow.name}
                    onChange={handleNameChange}
                />

            </Stack>

        </Paper>

    );

}