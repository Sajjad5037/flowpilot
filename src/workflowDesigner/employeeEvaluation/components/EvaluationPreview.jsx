import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import {
    EMPLOYEE_EVALUATION_REGISTRY,
} from "../registry/employeeEvaluationRegistry";


export default function EvaluationPreview({
    open,
    onClose,
    workflow,
    previewMode = "employee",
}) {

    if (!workflow) {
        return null;
    }


    const employeeComponents =
        workflow.stages?.employee || [];

    const supervisorComponents =
        workflow.stages?.supervisor || [];

    const hrComponents =
        workflow.stages?.hr || [];


    /*
     * Employee-only components that should NOT
     * be inherited by Supervisor or HR.
     */

    const employeeOnlyComponentIds = [
        "self_assessment",
    ];


    /*
     * Employee components that are shared with
     * Supervisor and HR.
     */

    const sharedEmployeeComponents =
        employeeComponents.filter(
            component =>
                !employeeOnlyComponentIds.includes(
                    component.id
                )
        );


    const sharedSupervisorComponents =
        supervisorComponents.filter(
            component =>
                [
                    "q3_goals_planning",
                ].includes(component.id)
        );


    /*
     * ==========================================
     * BUILD THE ACTUAL FORM COMPONENTS
     * ==========================================
     *
     * Employee:
     *   Employee components
     *
     * Supervisor:
     *   Shared Employee components
     *   +
     *   Supervisor components
     *
     * HR:
     *   Shared Employee components
     *   +
     *   Supervisor components
     *   +
     *   HR components
     */

    function getFormComponents() {

        if (previewMode === "employee") {

            return [
                ...employeeComponents,
                ...sharedSupervisorComponents.filter(
                    supervisorComponent =>
                        !employeeComponents.some(
                            employeeComponent =>
                                employeeComponent.instanceId ===
                                supervisorComponent.instanceId
                        )
                ),
            ];

        }


        if (previewMode === "supervisor") {

            return [
                ...sharedEmployeeComponents,
                ...supervisorComponents,
            ];

        }


        if (previewMode === "hr") {

            return [
                ...sharedEmployeeComponents,
                ...supervisorComponents,
                ...hrComponents,
            ];

        }


        return [];

    }


    const formComponents =
        getFormComponents();


    /*
     * ==========================================
     * RENDER ACTUAL FORM
     * ==========================================
     */

    function renderForm() {

        return (

            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                }}
            >

                {formComponents.length === 0 ? (

                    <Box
                        sx={{
                            py: 8,
                            textAlign: "center",
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            No components have been
                            added to this evaluation yet.
                        </Typography>

                    </Box>

                ) : (

                    <Stack
                        spacing={4}
                    >

                        {formComponents.map(
                            (component) => {

                                const registryComponent =
                                    EMPLOYEE_EVALUATION_REGISTRY[
                                        component.id
                                    ];


                                if (!registryComponent) {
                                    return null;
                                }


                                const PreviewComponent =
                                    registryComponent.preview;


                                if (!PreviewComponent) {
                                    return null;
                                }


                                return (

                                    <Box
                                        key={
                                            component.instanceId
                                        }
                                        sx={{
                                            width: "100%",
                                        }}
                                    >

                                        <PreviewComponent
                                            component={
                                                component
                                            }
                                            previewMode={
                                                previewMode
                                            }
                                        />

                                    </Box>

                                );

                            }
                        )}

                    </Stack>

                )}

            </Box>

        );

    }


    /*
     * ==========================================
     * INLINE PREVIEW
     * ==========================================
     *
     * This is the fourth panel inside the
     * builder.
     */

    if (open === undefined) {

        return (

            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#FFFFFF",
                    overflowY: "auto",
                }}
            >

                <Box
                    sx={{
                        maxWidth: 1000,
                        mx: "auto",
                        px: 3,
                        py: 3,
                    }}
                >

                    {renderForm()}

                </Box>

            </Box>

        );

    }


    /*
     * ==========================================
     * FULL PREVIEW DIALOG
     * ==========================================
     */

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            scroll="paper"
        >

            <DialogTitle
                sx={{
                    px: 4,
                    py: 2.5,
                    borderBottom:
                        "1px solid #E5E7EB",
                }}
            >

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >

                    <Box>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            color="#0F172A"
                        >
                            Employee Evaluation
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            {workflow.name}
                        </Typography>

                    </Box>


                    <IconButton
                        onClick={onClose}
                        aria-label="Close preview"
                    >

                        <CloseIcon />

                    </IconButton>

                </Stack>

            </DialogTitle>


            <DialogContent
                sx={{
                    backgroundColor: "#F5F7FB",
                    p: 4,
                }}
            >

                <Box
                    sx={{
                        maxWidth: 1050,
                        mx: "auto",

                        backgroundColor: "#FFFFFF",

                        border:
                            "1px solid #E2E8F0",

                        borderRadius: 3,

                        px: 4,
                        py: 4,

                        boxShadow:
                            "0 2px 8px rgba(15, 23, 42, 0.04)",
                    }}
                >

                    {renderForm()}

                </Box>

            </DialogContent>

        </Dialog>

    );

}