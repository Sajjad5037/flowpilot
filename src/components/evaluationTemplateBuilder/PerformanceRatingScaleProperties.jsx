import {
    Alert,
    Divider,
    Typography
} from "@mui/material";

export default function PerformanceRatingScaleProperties() {

    return (

        <>

            <Divider sx={{my:2}} />

            <Typography
                variant="subtitle1"
                fontWeight={600}
                gutterBottom
            >
                Performance Rating Scale
            </Typography>

            <Alert severity="info">

                This component uses the company standard
                Performance Rating Scale.

                No configuration is required.

            </Alert>

        </>

    );

}