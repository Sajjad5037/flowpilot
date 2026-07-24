import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from "@mui/material";

export default function AddSectionDialog({
  open,
  onClose,
  onSave
}) {
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleSave() {
    if (!form.name.trim()) return;

    onSave({
      id: Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      questions: []
    });

    setForm({
      name: "",
      description: ""
    });

    onClose();
  }

  function handleCancel() {
    setForm({
      name: "",
      description: ""
    });

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
        <Stack spacing={3} mt={1}>
          <TextField
            label="Section Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            autoFocus
          />

          <TextField
            label="Description (Optional)"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
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