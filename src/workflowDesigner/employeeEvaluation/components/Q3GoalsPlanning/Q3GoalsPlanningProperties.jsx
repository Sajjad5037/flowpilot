import {
    Box,
    Typography,
} from "@mui/material";


export default function Q3GoalsPlanningProperties({
    component,
    onChange,
}) {

    return (

        <Box>

            <Typography
                variant="subtitle1"
                fontWeight={600}
                gutterBottom
            >
                Q3 Goals Planning
            </Typography>


            <Typography
                variant="body2"
                color="text.secondary"
            >
                Configure the Q3 goal planning experience.
                Employees, supervisors, and HR can add or
                remove goals in the actual evaluation form.
            </Typography>

        </Box>

    );
}