import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField
} from "@mui/material";

import {
    createEmployee,
    updateEmployee
} from "../../services/employeeService";

const roleOptions = [
    "Employee",
    "Supervisor",
    "HR",
    "Admin"
];

export default function AddEmployeeDialog({

    open,
    onClose,
    onSaved,
    employee

}) {

    const emptyForm = {

        fullName: "",
        email: "",
        slackId: "",
        department: "",
        role: ""

    };

    const [form, setForm] = useState(emptyForm);

    const isEditing = employee != null;
    console.log("=======================");
    console.log("EMPLOYEE PROP");
    console.log(employee);
    console.log("isEditing =", isEditing);
    console.log("=======================");

    useEffect(() => {

        if (employee) {

            setForm({

                fullName: employee.full_name ?? employee.fullName ?? "",
                email: employee.email ?? "",
                slackId: employee.slack_id ?? employee.slackId ?? "",
                department: employee.department ?? "",
                role: employee.role ?? ""

            });

        }

        else {

            setForm(emptyForm);

        }

    }, [employee, open]);

    function handleChange(event) {

        const { name, value } = event.target;

        setForm(prev => ({

            ...prev,

            [name]: value

        }));

    }

    async function handleSave() {
      console.log("Saving...");
      console.log("isEditing =", isEditing);

      if (isEditing) {

          console.log("UPDATE");

      }
      else {

          console.log("CREATE");

      }

        try {

            if (isEditing) {

                await updateEmployee(
                    employee.id,
                    form
                );

            }

            else {

                await createEmployee(form);

            }

            onSaved?.();

            onClose();

        }

        catch (error) {

            console.error(error);

            alert("Unable to save employee.");

        }

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                {isEditing
                    ? "Edit Employee"
                    : "Add Employee"}

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

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
                            select
                            fullWidth
                            label="Role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >

                            {roleOptions.map(role => (

                                <MenuItem
                                    key={role}
                                    value={role}
                                >

                                    {role}

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

                    {isEditing
                        ? "Update Employee"
                        : "Save Employee"}

                </Button>

            </DialogActions>

        </Dialog>

    );

}