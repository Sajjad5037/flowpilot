import { useState } from "react";
import { QUESTION_TYPES } from "../../constants/questionTypes";
import { QUESTION_DEFAULTS } from "../../constants/questionRegistry";

import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";

export default function AddQuestionDialog({
    open,
    onClose,
    onSave
}) {

    const [form, setForm] = useState({
        type: "short_text",
        label: "",
        helpText: "",
        required: true
    });

    function handleChange(event) {

        const { name, value } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    }

    function handleCheckbox(event) {

        setForm(prev => ({
            ...prev,
            required: event.target.checked
        }));

    }

    function resetForm() {

        setForm({
            type: "short_text",
            label: "",
            helpText: "",
            required: true
        });

    }

    function handleSave() {

        if (!form.label.trim()) return;

        const question = {
            id: crypto.randomUUID(),
            ...form,
            ...(QUESTION_DEFAULTS[form.type] || {})
        };

        onSave(question);

        resetForm();
        onClose();

    }

    function handleCancel() {

        resetForm();
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

                Add Question

            </DialogTitle>

            <DialogContent>

                <Stack
                    spacing={3}
                    mt={1}
                >

                    <TextField
                        select
                        fullWidth
                        label="Question Type"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                    >

                        {QUESTION_TYPES.map((type) => (

                            <MenuItem
                                key={type.value}
                                value={type.value}
                            >
                                {type.label}
                            </MenuItem>

                        ))}

                    </TextField>

                    <TextField
                        fullWidth
                        label="Question Label"
                        name="label"
                        value={form.label}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Help Text"
                        name="helpText"
                        value={form.helpText}
                        onChange={handleChange}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.required}
                                onChange={handleCheckbox}
                            />
                        }
                        label="Required"
                    />

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button onClick={handleCancel}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={!form.label.trim()}
                >
                    Create Question
                </Button>

            </DialogActions>

        </Dialog>

    );

}