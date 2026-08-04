import {
    Paper,
    Typography,
    Stack,
    Divider,
    Chip,
    Button
} from "@mui/material";

import { COMPONENTS } from "../../registry/componentRegistry";

export default function AvailableComponents({

    currentStage,

    onAddComponent,

    onNewEvaluation

}) {
    const components = COMPONENTS.filter(component => {

        if (currentStage === "employee") {

            return component.category !== "Supervisor";

        }

        if (currentStage === "supervisor") {

            return component.category === "Supervisor";

        }

        if (currentStage === "hr") {

            return component.category === "HR";

        }

        return false;

    });
    const groupedComponents = components.reduce((groups, component) => {

        if (!groups[component.category]) {

            groups[component.category] = [];

        }

        groups[component.category].push(component);

        return groups;

    }, {});

    return (

        <Paper
            elevation={0}
            sx={{
                height: "100%",
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                p: 3,
                overflowY: "auto"
            }}
        >

            <Button
                fullWidth
                variant="outlined"
                sx={{
                    mb: 3
                }}
                onClick={() => {

                    if (
                        window.confirm(
                            "Start a new evaluation? Any unsaved changes will be lost."
                        )
                    ) {

                        onNewEvaluation?.();

                    }

                }}
            >
                + New Evaluation
            </Button>

            <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
            >
                {currentStage === "employee"
                    ? "Employee Components"
                    : currentStage === "supervisor"
                        ? "Supervisor Components"
                        : "HR Components"}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
            >
                {currentStage === "employee"
                    ? "Click a component to add it to the employee stage."
                    : currentStage === "supervisor"
                        ? "Supervisor-only components appear here."
                        : "HR-only components appear here."}
            </Typography>
            {components.length === 0 && (

                <Typography
                    color="text.secondary"
                >
                    No {currentStage} components available yet.
                </Typography>

            )}

            {Object.entries(groupedComponents).map(([category, components]) => (

                <Stack
                    key={category}
                    spacing={1.5}
                    mb={3}
                >

                    <Typography
                        variant="overline"
                        color="text.secondary"
                    >
                        {category}
                    </Typography>

                    {components.map(component => (

                        <Paper
                            key={component.id}
                            elevation={0}
                            onClick={() => {

                                console.log("Clicked Component:", component);

                                console.log("Clicked Component Fields:", component.fields);

                                onAddComponent?.(component);

                            }}
                            sx={{
                                p: 2,
                                border: "1px solid #E5E7EB",
                                borderRadius: 2,
                                cursor: "pointer",
                                transition: "all .2s ease",

                                "&:hover": {
                                    bgcolor: "#F8FAFC",
                                    borderColor: "#2563EB",
                                    transform: "translateY(-2px)"
                                }
                            }}
                        >

                            <Typography
                                fontWeight={600}
                            >
                                {component.name}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 0.5
                                }}
                            >
                                {component.description}
                            </Typography>

                            <Chip
                                size="small"
                                label={category}
                                sx={{
                                    mt: 1
                                }}
                            />

                        </Paper>

                    ))}

                    <Divider />

                </Stack>

            ))}

        </Paper>

    );

}