import {
    Box,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


export default function ProfessionalAttributesCoreValues({
    component,
    previewMode = "employee",
    supervisorResponses = {},
    onResponsesChange,
}) {

    const performanceResponses =
        supervisorResponses?.performance_and_core_values || {};

    const professionalAttributes =
        performanceResponses.professional_attributes || "";

    const coreValues =
        performanceResponses.core_values || "";

    const handleChange = (field, value) => {
        onResponsesChange?.({
            ...supervisorResponses,
            performance_and_core_values: {
                ...performanceResponses,
                [field]: value,
            },
        });
    };

    return (

        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#FFFFFF",
            }}
        >

            <Stack
                direction="row"
                spacing={2}
            >

                <Box sx={{ flex: 1, minWidth: 0 }}>

                    <Typography
                        variant="caption"
                        fontWeight={600}
                        color="#0F172A"
                        sx={{
                            display: "block",
                            mb: 0.75,
                        }}
                    >
                        Professional Attributes to Work On *
                    </Typography>

                    <TextField
                        fullWidth
                        aria-label="Professional Attributes to Work On"
                        value={professionalAttributes}
                        onChange={
                            previewMode === "supervisor"
                                ? (event) =>
                                    handleChange(
                                        "professional_attributes",
                                        event.target.value
                                    )
                                : undefined
                        }
                        slotProps={{
                            input: {
                                readOnly: previewMode === "hr",
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor:
                                    previewMode === "hr"
                                        ? "#F1F5F9"
                                        : "#FFFFFF",
                            },
                        }}
                        size="small"
                    />

                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>

                    <Typography
                        variant="caption"
                        fontWeight={600}
                        color="#0F172A"
                        sx={{
                            display: "block",
                            mb: 0.75,
                        }}
                    >
                        Core Values to Work On *
                    </Typography>

                    <TextField
                        fullWidth
                        aria-label="Core Values to Work On"
                        value={coreValues}
                        onChange={
                            previewMode === "supervisor"
                                ? (event) =>
                                    handleChange(
                                        "core_values",
                                        event.target.value
                                    )
                                : undefined
                        }
                        slotProps={{
                            input: {
                                readOnly: previewMode === "hr",
                            },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor:
                                    previewMode === "hr"
                                        ? "#F1F5F9"
                                        : "#FFFFFF",
                            },
                        }}
                        size="small"
                    />

                </Box>

            </Stack>

        </Paper>

    );

}
