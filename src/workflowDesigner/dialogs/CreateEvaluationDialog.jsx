import { useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function CreateEvaluationDialog({

    open,
    onClose,
    onCreate

}) {

    const [evaluationType, setEvaluationType] = useState("");

    const [evaluationName, setEvaluationName] = useState("");

    function handleCreate() {

        if (!evaluationType || !evaluationName.trim()) {
            return;
        }

        onCreate({

            type: evaluationType,

            name: evaluationName.trim()

        });

        setEvaluationType("");

        setEvaluationName("");

        onClose();

    }

    function handleCancel() {

        setEvaluationType("");

        setEvaluationName("");

        onClose();

    }

    return (

        <Dialog
            open={open}
            onClose={handleCancel}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle>
                Create Evaluation
            </DialogTitle>

            <DialogContent>

                <Stack spacing={3} mt={1}>

                    <Typography
                        color="text.secondary"
                    >
                        Choose the type of evaluation you want to create.
                    </Typography>

                    {/* Evaluation Type */}

                    <TextField
                        select
                        fullWidth
                        label="Evaluation Type"
                        value={evaluationType}
                        onChange={(event) =>
                            setEvaluationType(event.target.value)
                        }
                    >

                        <MenuItem value="">
                            Select Evaluation Type
                        </MenuItem>

                        <MenuItem value="employee_goal_kpi">
                            Employee Goal & KPI
                        </MenuItem>

                        <MenuItem value="employee_evaluation">
                            Employee Evaluation
                        </MenuItem>

                    </TextField>

                    {evaluationType && (

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {evaluationType === "employee_goal_kpi"
                                ? "Goal and KPI setting for new employees."
                                : "Performance evaluation for existing employees."
                            }
                        </Typography>

                    )}

                    {/* Evaluation Name */}

                    {evaluationType && (

                        <TextField
                            autoFocus
                            fullWidth
                            label="Evaluation Name"
                            placeholder={
                                evaluationType === "employee_goal_kpi"
                                    ? "Q2 2026 Goal & KPI Evaluation"
                                    : "Q2 2026 Employee Evaluation"
                            }
                            value={evaluationName}
                            onChange={(event) =>
                                setEvaluationName(event.target.value)
                            }
                        />

                    )}

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button onClick={handleCancel}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={
                        !evaluationType ||
                        !evaluationName.trim()
                    }
                >
                    Create
                </Button>

            </DialogActions>

        </Dialog>

    );

}