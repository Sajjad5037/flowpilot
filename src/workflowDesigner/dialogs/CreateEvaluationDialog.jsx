import { useState } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function CreateEvaluationDialog({

    open,
    onClose,
    onCreate

}) {

    const [evaluationName, setEvaluationName] = useState("");

    function handleCreate() {

        if (!evaluationName.trim()) {
            return;
        }

        onCreate(evaluationName);

        setEvaluationName("");

        onClose();

    }

    function handleCancel() {

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

                    <Typography color="text.secondary">

                        Give your evaluation a meaningful name. You will build the workflow after creating it.

                    </Typography>

                    <TextField
                        autoFocus
                        fullWidth
                        label="Evaluation Name"
                        placeholder="Q2 2026 Goal & KPI Evaluation"
                        value={evaluationName}
                        onChange={(event) =>
                            setEvaluationName(event.target.value)
                        }
                    />

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button onClick={handleCancel}>

                    Cancel

                </Button>

                <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={!evaluationName.trim()}
                >

                    Create

                </Button>

            </DialogActions>

        </Dialog>

    );

}