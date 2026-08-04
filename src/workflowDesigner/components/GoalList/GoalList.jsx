import {
    Paper,
    Typography,
    Divider,
    Grid,
    TextField
} from "@mui/material";

export default function GoalList({

    component

}) {

    const fields = component.fields || {

        goalTitle: true,

        goalDescription: true,

        successCriteria: true,

        weight: true,

        targetDate: true

    };

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: "1px solid #E5E7EB",
                borderRadius: 3
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
            >
                {component.title || "Proposed Goals"}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
            >
                {component.description ||
                    "Employees propose goals for the next quarter."}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {(component.goals || [{ id: crypto.randomUUID() }]).map((goal, index) => (

                <Paper
                    key={goal.id}
                    elevation={0}
                    sx={{
                        width: "100%",
                        p: 2,
                        mb: 3,
                        border: "1px solid #E5E7EB",
                        borderRadius: 2
                    }}
                >

                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        mb={2}
                    >
                        Goal {index + 1}
                    </Typography>

                    <Grid
                        container
                        spacing={2}
                        sx={{
                            width: "100%",
                            m: 0
                        }}
                    >

                        {fields.goalTitle && (

                            <Grid item xs={12}>

                                <TextField
                                    fullWidth
                                    label="Goal Title"
                                />

                            </Grid>

                        )}

                        {fields.goalDescription && (

                            <Grid item xs={12}>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Goal Description"
                                />

                            </Grid>

                        )}

                        {fields.successCriteria && (

                            <Grid item xs={12}>

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    label="Success Criteria"
                                />

                            </Grid>

                        )}

                        {fields.weight && (

                            <Grid item xs={6}>

                                <TextField
                                    fullWidth
                                    label="Weight (%)"
                                />

                            </Grid>

                        )}

                        {fields.targetDate && (

                            <Grid item xs={6}>

                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Target Date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />

                            </Grid>

                        )}

                    </Grid>

                </Paper>

            ))}

        </Paper>

    );

}