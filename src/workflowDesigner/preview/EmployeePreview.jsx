import {
    Box,
    Divider,
    Paper,
    Typography
} from "@mui/material";

export default function EmployeePreview() {

    return (

        <Paper
            elevation={0}
            sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                bgcolor: "#FFFFFF",
                minHeight: 600
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
            >
                Employee Goal & KPI Form
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mt: 1 }}
            >
                This is where the employee version of the workflow will be rendered.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Box
                sx={{
                    p: 3,
                    border: "2px dashed #CBD5E1",
                    borderRadius: 2,
                    bgcolor: "#F8FAFC",
                    textAlign: "center"
                }}
            >

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Employee Workflow Preview
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    Business components will appear here as they are added to the Employee Stage.
                </Typography>

            </Box>

        </Paper>

    );

}