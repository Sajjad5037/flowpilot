import {
    Box,
    Typography
} from "@mui/material";

export default function PerformanceAndCoreValuesHRPreview({

    component,
    supervisorResponses,
    responses = {},

}) {

    const fields = component.fields || [];
    
    return (

        <Box
            sx={{
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 2,
                p: {
                    xs: 2.5,
                    sm: 3,
                },
                mb: 4,
            }}
        >

            <Typography
                component="h2"
                sx={{
                    color: "#0F172A",
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    mb: component.description ? 0.5 : 2.5,
                }}
            >
                {component.title || "Performance & Core Values"}
            </Typography>

            {component.description && (
                <Typography
                    sx={{
                        color: "#64748B",
                        fontSize: 14,
                        lineHeight: 1.5,
                        mb: 2.5,
                    }}
                >
                    {component.description}
                </Typography>
            )}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 2,
                }}
            >
                {fields.map(field => (

                    <Box
                        key={field.id}
                        sx={{
                            bgcolor: "#F3FFF8",
                            border: "1px solid #9DECC1",
                            borderRadius: 2,
                            p: 2,
                        }}
                    >

                        <Typography
                            sx={{
                                color: "#075B35",
                                fontSize: 12,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                mb: 1,
                            }}
                        >
                            Final Agreed {field.label}
                        </Typography>

                        <Box
                            sx={{
                                minHeight: field.type === "textarea" ? 56 : 40,
                                display: "flex",
                                alignItems: "center",
                                bgcolor: "#FFFFFF",
                                border: "1px solid #D8E4DE",
                                borderRadius: 1.5,
                                px: 1.5,
                                py: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#334155",
                                    fontSize: 14,
                                    lineHeight: 1.55,
                                    whiteSpace: "pre-wrap",
                                    overflowWrap: "anywhere",
                                }}
                            >
                                {responses?.performance_and_core_values?.[field.id] ??
                                    supervisorResponses?.performance_and_core_values?.[field.id] ??
                                    "No supervisor response."}
                            </Typography>
                        </Box>

                    </Box>

                ))}
            </Box>

        </Box>

    );

}