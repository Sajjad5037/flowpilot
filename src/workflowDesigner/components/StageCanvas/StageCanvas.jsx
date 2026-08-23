import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { COMPONENT_REGISTRY } from "../../registry/componentRegistry";

export default function StageCanvas({

    currentStage,

    components = [],

    selectedComponent,

    onRemoveComponent,

    onSelectComponent

}) {

    const stageTitle =
        currentStage.charAt(0).toUpperCase() +
        currentStage.slice(1);

    return (

        <Paper
            elevation={0}
            sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                display: "flex",
                flexDirection: "column"
            }}
        >

            {/* Header */}

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    {stageTitle} Stage
                </Typography>

                <Button
                    variant="contained"
                    disabled
                >
                    + Add Component
                </Button>

            </Stack>

            {/* Canvas */}

            <Box
                sx={{
                    flex: 1,
                    border: "2px dashed #D1D5DB",
                    borderRadius: 3,
                    bgcolor: "#FAFAFA",
                    p: 3,
                    overflowY: "auto"
                }}
            >

                {components.length === 0 ? (

                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}
                    >

                        <Typography
                            variant="h6"
                            color="text.secondary"
                        >
                            No components added yet
                        </Typography>

                        <Typography
                            color="text.secondary"
                            mt={1}
                        >
                            Select a component from the left panel to begin building this stage.
                        </Typography>

                    </Box>

                ) : (

                    <Stack spacing={3}>

                        {components.map(component => {

                            const ComponentRenderer =
                                COMPONENT_REGISTRY[component.id]?.component;

                            return (

                                <Paper
                                    key={component.instanceId}
                                    elevation={0}
                                    onClick={() => onSelectComponent(component)}
                                    sx={{
                                        position: "relative",
                                        overflow: "hidden",
                                        cursor: "pointer",
                                        borderRadius: 3,
                                        transition: "0.2s",

                                        border:
                                            selectedComponent?.instanceId === component.instanceId
                                                ? "2px solid #2563EB"
                                                : "1px solid #E5E7EB",

                                        "&:hover": {
                                            borderColor: "#2563EB",
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                                        }
                                    }}
                                >

                                    <IconButton
                                        size="small"
                                        aria-label={`Remove ${component.name}`}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            onRemoveComponent?.(component.instanceId);
                                        }}
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            zIndex: 1,
                                            color: "#DC2626",
                                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                                            "&:hover": {
                                                backgroundColor: "#FEE2E2",
                                            },
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>

                                    {ComponentRenderer ? (

                                        <ComponentRenderer
                                            component={component}
                                        />

                                    ) : (

                                        <Box p={3}>

                                            <Typography
                                                fontWeight={700}
                                            >
                                                {component.name}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                mt={1}
                                            >
                                                No renderer has been registered for this component.
                                            </Typography>

                                        </Box>

                                    )}

                                </Paper>

                            );

                        })}

                    </Stack>

                )}

            </Box>

        </Paper>

    );

}