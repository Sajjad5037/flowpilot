import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    EMPLOYEE_EVALUATION_COMPONENTS,
} from "../registry/employeeEvaluationRegistry";


export default function AvailableEvaluationComponents({
    currentStage,
    onAddComponent,
}) {

    const availableComponents =
        EMPLOYEE_EVALUATION_COMPONENTS.filter(
            component => {

                if (!component.enabled) {
                    return false;
                }

                if (!component.stages) {
                    return true;
                }

                return component.stages.includes(
                    currentStage
                );

            }
        );


    return (

        <Stack spacing={2}>

            {availableComponents.map(component => (

                <Paper
                    key={component.id}
                    elevation={0}
                    onClick={() =>
                        onAddComponent(component)
                    }
                    sx={{
                        p: 2,
                        border:
                            "1px solid #E2E8F0",
                        borderRadius: 3,
                        bgcolor: "#FFFFFF",
                        cursor: "pointer",

                        transition:
                            "all 0.2s ease",

                        "&:hover": {
                            borderColor:
                                "#2563EB",
                            bgcolor:
                                "#EFF6FF",
                            transform:
                                "translateY(-1px)",
                            boxShadow:
                                "0 2px 6px rgba(15, 23, 42, 0.06)",
                        },
                    }}
                >

                    <Typography
                        fontSize={14}
                        fontWeight={600}
                        color="#0F172A"
                    >
                        {component.name}
                    </Typography>


                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.75,
                            lineHeight: 1.5,
                        }}
                    >
                        {component.description}
                    </Typography>


                    <Box
                        sx={{
                            display: "inline-flex",
                            mt: 1.5,
                            px: 1,
                            py: 0.4,
                            borderRadius: 1,
                            bgcolor: "#F1F5F9",
                        }}
                    >

                        <Typography
                            variant="caption"
                            color="#475569"
                            fontWeight={600}
                        >
                            {component.category}
                        </Typography>

                    </Box>

                </Paper>

            ))}


            {availableComponents.length === 0 && (

                <Box
                    sx={{
                        py: 4,
                        textAlign: "center",
                    }}
                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        No components available
                        for this stage.
                    </Typography>

                </Box>

            )}

        </Stack>

    );
}