import {
    Button,
    Chip,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

export default function WorkflowCard({

    workflow,

    onEdit,

    onAssign

}) {

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                transition: "0.2s",
                "&:hover": {
                    borderColor: "#2563EB",
                    boxShadow: 2
                }
            }}
        >

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
            >

                <Stack spacing={1}>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {workflow.name}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        Employee Stage: {workflow.stages.employee.length} Components
                    </Typography>

                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        Supervisor Stage: {workflow.stages.supervisor.length} Components
                    </Typography>

                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        HR Stage: {workflow.stages.hr.length} Components
                    </Typography>

                </Stack>

                <Chip
                    label="Draft"
                    color="primary"
                    variant="outlined"
                />

            </Stack>

            <Stack
                direction="row"
                spacing={2}
                mt={3}
            >

                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(workflow)}
                >
                    Edit Workflow
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<AssignmentIndIcon />}
                    onClick={() => onAssign(workflow)}
                >
                    Assign
                </Button>

            </Stack>

        </Paper>

    );

}