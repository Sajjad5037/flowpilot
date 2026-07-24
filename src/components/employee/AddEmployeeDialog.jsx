import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import { createEmployee } from "../../services/employeeService";

const templateOptions = [
  "Employee Evaluation",
  "Leadership Evaluation",
];

export default function AddEmployeeDialog({
  open,
  onClose,
  onSaved,
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    slackId: "",
    department: "",
    jobTitle: "",
    template: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSave() {
    await createEmployee(form);

    if (onSaved) {
      onSaved(form);
    }

    setForm({
      fullName: "",
      email: "",
      slackId: "",
      department: "",
      jobTitle: "",
      template: "",
    });

    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Add Employee</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Slack ID"
              name="slackId"
              value={form.slackId}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Role / Job Title"
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Evaluation Template"
              name="template"
              value={form.template}
              onChange={handleChange}
            >
              {templateOptions.map((template) => (
                <MenuItem key={template} value={template}>
                  {template}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save Employee
        </Button>
      </DialogActions>
    </Dialog>
  );
}