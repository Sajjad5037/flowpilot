import {
    Box,
    Stack,
    Typography,
} from "@mui/material";

import {
    EMPLOYEE_EVALUATION_REGISTRY,
} from "../registry/employeeEvaluationRegistry";


export default function EvaluationStageCanvas({

    currentStage,

    components = [],

    selectedComponent,

    onSelectComponent,

}) {

    /*
     * The canvas only shows components that belong
     * to the currently selected stage.
     *
     * Employee tab    → employee components
     * Supervisor tab  → supervisor components
     * HR tab          → HR components
     *
     * Previous-stage components are NOT shown here.
     *
     * They will only appear in the actual Preview.
     */


    if (components.length === 0) {

        return (

            <Box
                sx={{
                    minHeight: 500,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    border:
                        "1px dashed #CBD5E1",

                    borderRadius: 3,

                    bgcolor: "#F8FAFC",

                    p: 4,

                    textAlign: "center",
                }}
            >

                <Box>

                    <Typography
                        fontWeight={600}
                        color="#475569"
                    >
                        No components added yet
                    </Typography>


                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={1}
                    >
                        Select a component from the
                        left panel to add it to this
                        stage.
                    </Typography>

                </Box>

            </Box>

        );

    }


    return (

        <Stack spacing={2}>

            {components.map((component, index) => {

                const registryComponent =
                    EMPLOYEE_EVALUATION_REGISTRY[
                        component.id
                    ];


                if (!registryComponent) {
                    return null;
                }


                const Component =
                    registryComponent.component;


                const isSelected =
                    selectedComponent?.instanceId ===
                    component.instanceId;


                return (

                    <Box
                        key={component.instanceId}

                        sx={{
                            border: isSelected
                                ? "2px solid #2563EB"
                                : "1px solid #E2E8F0",

                            borderRadius: 3,

                            bgcolor: "#FFFFFF",

                            overflow: "hidden",

                            cursor: "pointer",

                            boxShadow: isSelected
                                ? "0 0 0 2px rgba(37, 99, 235, 0.08)"
                                : "0 1px 3px rgba(15, 23, 42, 0.04)",

                            transition:
                                "all 0.2s ease",

                            "&:hover": {
                                borderColor: "#2563EB",
                            },
                        }}
                    >

                        {/* ================================= */}
                        {/* COMPONENT HEADER                  */}
                        {/* ================================= */}

                        <Box
                            sx={{
                                px: 2,

                                py: 1.5,

                                bgcolor: "#F8FAFC",

                                borderBottom:
                                    "1px solid #E2E8F0",
                            }}
                        >

                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="space-between"
                            >

                                <Box>

                                    <Typography
                                        fontSize={14}
                                        fontWeight={700}
                                        color="#0F172A"
                                    >
                                        {index + 1}.{" "}
                                        {registryComponent.name}
                                    </Typography>


                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Component {index + 1}
                                    </Typography>

                                </Box>


                                <Typography
                                    variant="caption"
                                    sx={{
                                        px: 1,

                                        py: 0.4,

                                        borderRadius: 1,

                                        bgcolor: "#EFF6FF",

                                        color: "#2563EB",

                                        fontWeight: 600,
                                    }}
                                >
                                    {currentStage}
                                </Typography>

                            </Stack>

                        </Box>


                        {/* ================================= */}
                        {/* COMPONENT BODY                    */}
                        {/* ================================= */}

                        <Box
                            onClick={() =>
                                onSelectComponent(component)
                            }

                            sx={{
                                p: 2.5,

                                bgcolor: "#FFFFFF",
                            }}
                        >

                            <Component
                                component={component}
                                previewMode={currentStage}
                            />

                        </Box>

                    </Box>

                );

            })}

        </Stack>

    );

}