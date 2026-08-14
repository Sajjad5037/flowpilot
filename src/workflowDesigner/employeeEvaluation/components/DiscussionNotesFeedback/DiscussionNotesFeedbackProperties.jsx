import {
    Box,
    Typography,
} from "@mui/material";


export default function DiscussionNotesFeedbackProperties({
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
                Discussion Notes & Feedback
            </Typography>


            <Typography
                variant="body2"
                color="text.secondary"
            >
                Employees and supervisors provide their
                discussion notes separately. HR can review
                both responses together.
            </Typography>

        </Box>

    );
}