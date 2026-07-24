import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";

import { useState } from "react";

export default function CreateTemplateDialog({
    open,
    onClose,
    onCreate
}) {

    const [form, setForm] = useState({
        name: "",
        audience: "Employee",
        category: "Quarterly Evaluation",
        description: ""
    });

    function handleChange(event) {

        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

    }

    function handleContinue() {

        onCreate(form);

        setForm({
            name: "",
            audience: "Employee",
            category: "Quarterly Evaluation",
            description: ""
        });

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle>

                Create Evaluation Template

            </DialogTitle>

            <DialogContent>

                <Stack spacing={3} mt={1}>

                    <TextField
                        label="Template Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        select
                        label="Audience"
                        name="audience"
                        value={form.audience}
                        onChange={handleChange}
                    >

                        <MenuItem value="Employee">
                            Employee
                        </MenuItem>

                        <MenuItem value="Supervisor">
                            Supervisor
                        </MenuItem>

                        <MenuItem value="Leadership">
                            Leadership
                        </MenuItem>

                        <MenuItem value="Contractor">
                            Contractor
                        </MenuItem>

                    </TextField>

                    <TextField
                        select
                        label="Evaluation Type"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >

                        <MenuItem value="Quarterly Evaluation">
                            Quarterly Evaluation
                        </MenuItem>

                        <MenuItem value="Annual Review">
                            Annual Review
                        </MenuItem>

                        <MenuItem value="Probation Review">
                            Probation Review
                        </MenuItem>

                    </TextField>

                    <TextField
                        multiline
                        rows={4}
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleContinue}
                >
                    Continue
                </Button>

            </DialogActions>

        </Dialog>

    );

}