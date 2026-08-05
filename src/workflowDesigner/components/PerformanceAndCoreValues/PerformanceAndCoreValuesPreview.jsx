import {
    Box,
    TextField,
    Typography
} from "@mui/material";

export default function PerformanceAndCoreValuesPreview({

    component,
    previewMode,
    responses,
    onResponsesChange

}) {

    const fields = component.fields || [];

    const isSupervisor = previewMode === "supervisor";
    function updateSupervisorField(fieldId, value) {

        onResponsesChange({

            ...responses,

            performance_and_core_values: {

                ...(responses?.performance_and_core_values || {}),

                [fieldId]: value

            }

        });

    }
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
                        fontWeight={600}
                        mb={1}
                    >
                        {field.label}
                    </Typography>

                    {field.type === "textarea" && (

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            disabled={!isSupervisor}
                            placeholder={
                                isSupervisor
                                    ? `Enter ${field.label.toLowerCase()}...`
                                    : undefined
                            }
                            value={
                                responses?.performance_and_core_values?.[field.id] || ""
                            }
                            onChange={(e) => {

                                updateSupervisorField(
                                    field.id,
                                    e.target.value
                                );

                            }}
                        />

                    )}

                    {field.type === "text" && (

                        <TextField
                            fullWidth
                            disabled={!isSupervisor}
                            placeholder={
                                isSupervisor
                                    ? `Enter ${field.label.toLowerCase()}`
                                    : undefined
                            }
                            value={
                                isSupervisor
                                    ? undefined
                                    : "Supervisor response will appear here."
                            }
                        />

                    )}

                    {field.type === "number" && (

                        <TextField
                            fullWidth
                            type="number"
                            disabled={!isSupervisor}
                            placeholder={
                                isSupervisor
                                    ? "Enter value"
                                    : undefined
                            }
                            value={
                                isSupervisor
                                    ? undefined
                                    : ""
                            }
                        />

                    )}

                </Box>

            ))}

        </Box>

    );

}