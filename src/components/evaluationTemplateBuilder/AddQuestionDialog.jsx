import { useState } from "react";
import { QUESTION_TYPES } from "../../constants/questionTypes";
import {
    QUESTION_DEFAULTS,
    QUESTION_REGISTRY
} from "../../constants/questionRegistry";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    ListSubheader,
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
    const selectedTypeLabel =
        QUESTION_TYPES.find(type => type.value === form.type)?.label || "Question";

    

    const hideStandardFields =
        QUESTION_REGISTRY[form.type]?.hideStandardFields ?? false;

    const buttonText =
        hideStandardFields
            ? `Create ${selectedTypeLabel}`
            : `Create ${selectedTypeLabel} Question`;    

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

        if (!hideStandardFields && !form.label.trim()) {
            return;
        }

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

                Add Component

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

                        <ListSubheader>
                            Content
                        </ListSubheader>

                        <MenuItem value="heading">
                            Heading
                        </MenuItem>

                        <MenuItem value="paragraph">
                            Paragraph
                        </MenuItem>
                        <MenuItem value="information_card">
                            Information Card
                        </MenuItem>

                        <ListSubheader>
                            Questions
                        </ListSubheader>

                        <MenuItem value="short_text">
                            Short Text
                        </MenuItem>

                        <MenuItem value="long_text">
                            Long Text
                        </MenuItem>

                        <MenuItem value="number">
                            Number
                        </MenuItem>

                        <MenuItem value="yes_no">
                            Yes / No
                        </MenuItem>

                        <MenuItem value="rating">
                            Rating
                        </MenuItem>

                        <MenuItem value="multiple_choice">
                            Multiple Choice
                        </MenuItem>

                        <MenuItem value="checkbox">
                            Checkbox Group
                        </MenuItem>

                        <MenuItem value="dropdown">
                            Dropdown
                        </MenuItem>

                        <MenuItem value="date">
                            Date
                        </MenuItem>

                        <ListSubheader>
                            Evaluation
                        </ListSubheader>

                        <MenuItem value="performance_rating_scale">
                            Performance Rating Scale
                        </MenuItem>

                        <MenuItem
                            disabled
                        >
                            Quarter Goal (Coming Soon)
                        </MenuItem>

                        <MenuItem
                            disabled
                        >
                            KPI Table (Coming Soon)
                        </MenuItem>

                        <MenuItem
                            disabled
                        >
                            Leadership Block (Coming Soon)
                        </MenuItem>

                    </TextField>

                    {!hideStandardFields && (

                        <TextField
                            fullWidth
                            label="Question Label"
                            name="label"
                            value={form.label}
                            onChange={handleChange}
                        />

                    )}

                    {!hideStandardFields && (

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Help Text"
                            name="helpText"
                            value={form.helpText}
                            onChange={handleChange}
                        />

                    )}

                    {!hideStandardFields && (

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={form.required}
                                    onChange={handleCheckbox}
                                />
                            }
                            label="Required"
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
                    onClick={handleSave}
                >
                    {buttonText}
                </Button>

            </DialogActions>

        </Dialog>

    );

}