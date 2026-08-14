import {
    Box,
    Typography,
} from "@mui/material";

import {
    EMPLOYEE_EVALUATION_REGISTRY,
} from "../registry/employeeEvaluationRegistry";

export default function EvaluationPropertiesPanel({
    component,
    onChange,
}) {

    if (!component) {
        return (
            <Box
                sx={{
                    minHeight: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    p: 3,
                }}
            >
                <Box>

                    <Typography
                        fontWeight={600}
                        color="#475569"
                    >
                        Select a component
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={1}
                    >
                        Select a component from the form canvas
                        to configure its properties.
                    </Typography>

                </Box>
            </Box>
        );
    }

    const registryComponent =
        EMPLOYEE_EVALUATION_REGISTRY[component.id];

    if (!registryComponent) {
        return (
            <Typography
                color="error"
                variant="body2"
            >
                Component configuration not found.
            </Typography>
        );
    }

    const PropertiesComponent =
        registryComponent.properties;

    if (!PropertiesComponent) {
        return (
            <Typography
                color="text.secondary"
                variant="body2"
            >
                This component has no configurable properties.
            </Typography>
        );
    }

    return (
        <Box>

            <PropertiesComponent
                component={component}
                onChange={onChange}
            />

        </Box>
    );
}