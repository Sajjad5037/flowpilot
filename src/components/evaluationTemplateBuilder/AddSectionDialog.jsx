import { useState } from "react";

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

import { SECTION_TYPE_REGISTRY } from "../../constants/sectionTypeRegistry";

const DEFAULT_SECTION_TYPE = Object.keys(SECTION_TYPE_REGISTRY)[0];

const INITIAL_FORM = {
    type: DEFAULT_SECTION_TYPE,
    name: ""
};

export default function AddSectionDialog({
    open,
    onClose,
    onSave
}) {

    const [form, setForm] = useState(INITIAL_FORM);

    function handleChange(event) {

        const { name, value } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    }

    function resetForm() {

        setForm(INITIAL_FORM);

    }

    function handleSave() {

        if (!form.name.trim()) {
            return;
        }

        onSave({
            id: Date.now(),
            type: form.type,
            name: form.name.trim(),
            questions: []
        });

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
                Add Section
            </DialogTitle>

            <DialogContent>

                <Stack
                    spacing={3}
                    sx={{
                        mt: 2
                    }}
                >

                    <TextField
                      select
                      label="Section Type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                          shrink: true
                      }}
                  >

                        {Object.entries(SECTION_TYPE_REGISTRY).map(([key, section]) => (

                            <MenuItem
                                key={key}
                                value={key}
                            >
                                {section.label}
                            </MenuItem>

                        ))}

                    </TextField>

                    <TextField
                        label="Section Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        autoFocus
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
                    disabled={!form.name.trim()}
                >
                    Save Section
                </Button>

            </DialogActions>

        </Dialog>

    );

}