import {
    Box,
    Paper,
    Typography
} from "@mui/material";

export default function PerformanceAndCoreValuesHRPreview({

    component,
    supervisorResponses

}) {

    const fields = component.fields || [];

    
    
    return (

        <Box sx={{ mb: 4 }}>

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mb: 1
                }}
            >
                {component.title || "Performance & Core Values"}
            </Typography>

            {fields.map(field => (

    <Box
        key={field.id}
        sx={{ mb: 3 }}
    >

        <Typography
            fontWeight={700}
            mb={1}
        >
            {field.label}
        </Typography>

        <Paper
            elevation={0}
            sx={{
                p: 2,
                bgcolor: "#F3F4F6",
                borderLeft: "4px solid #2563EB",
                minHeight:
                    field.type === "textarea"
                        ? 120
                        : "auto"
            }}
        >

            <Typography>

                {supervisorResponses?.performance_and_core_values?.[field.id] ||
                    "No supervisor response."}

            </Typography>

        </Paper>

    </Box>

))}

        </Box>

    );

}