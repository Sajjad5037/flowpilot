import {
    Paper,
    Typography,
    Grid,
    TextField,
    Divider
} from "@mui/material";

export default function EmployeeInformation({

    component

}) {

    const fields = component?.fields || {};
    const entityLabel =
    component?.entityLabel || "Employee";

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                mb: 3
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
            >
                {entityLabel} Information
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
            >
                Basic information collected before the evaluation begins.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid
                container
                spacing={2}
            >

                {(fields.employeeName ?? true) && (

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={`${entityLabel} Name`}
                            placeholder="John Smith"
                        />
                    </Grid>

                )}

                {(fields.supervisor ?? true) && (

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Supervisor"
                            placeholder="Sarah Johnson"
                        />
                    </Grid>

                )}

                {(fields.department ?? true) && (

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Department"
                            placeholder="Engineering"
                        />
                    </Grid>

                )}

                {(fields.position ?? true) && (

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Position"
                            placeholder="Senior Developer"
                        />
                    </Grid>

                )}

                {(fields.phoneNumber ?? false) && (

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            placeholder="+61 400 000 000"
                        />
                    </Grid>

                )}

                {(fields.employeeId ?? false) && (

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={`${entityLabel} ID`}
                            placeholder="EMP-1001"
                        />
                    </Grid>

                )}

                {(fields.officeLocation ?? false) && (

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Office Location"
                            placeholder="Sydney Office"
                        />
                    </Grid>

                )}

                {(fields.costCentre ?? false) && (

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Cost Centre"
                            placeholder="Operations"
                        />
                    </Grid>

                )}

            </Grid>

        </Paper>

    );

}