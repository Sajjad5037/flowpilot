import {
    Box,
    Divider,
    Typography
} from "@mui/material";

export default function PerformanceAndCoreValues({

    component

}) {

    const fields = component.fields || {

        professionalAttributes: true,
        coreValues: true,
        evaluationScore: true

    };

    return (

        <Box>

            <Typography
                variant="h6"
                fontWeight={700}
            >
                {component.title || "Performance & Core Values"}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
            >
                Supervisor evaluates employee performance,
                professional attributes and core values.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {fields.professionalAttributes && (

                <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                >
                    ✓ Professional Attributes
                </Typography>

            )}

            {fields.coreValues && (

                <Typography
                    variant="body2"
                    sx={{ mb: 1 }}
                >
                    ✓ Core Values
                </Typography>

            )}

            {fields.evaluationScore && (

                <Typography
                    variant="body2"
                >
                    ✓ Total Evaluation Score
                </Typography>

            )}

        </Box>

    );

}