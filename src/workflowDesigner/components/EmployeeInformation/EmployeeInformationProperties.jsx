import {
    Paper,
    Typography,
    Divider,
    Stack,
    FormControlLabel,
    Checkbox,
    TextField
} from "@mui/material";

export default function EmployeeInformationProperties({

    component,
    onChange

}) {

    const fields = component.fields || {};
    const entityLabel =
    component.entityLabel || "Employee";

    function updateField(fieldName, checked) {

        onChange({

            ...component,

            fields: {

                ...fields,

                [fieldName]: checked

            }

        });

    }
    function updateEntityLabel(value) {

    onChange({

        ...component,

        entityLabel: value

    });

}

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
            >
                {entityLabel} Information
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
            >
                Select which fields should appear in the employee information section.
            </Typography>
            <TextField
                fullWidth
                label="Entity Label"
                value={component.entityLabel ?? "Employee"}
                onChange={(e) =>
                    updateEntityLabel(e.target.value)
                }
                helperText="Example: Employee, Contractor, Consultant, Volunteer"
            />

            <Divider sx={{ my: 3 }} />

            <Stack spacing={1}>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.employeeName ?? true}
                            onChange={(e) =>
                                updateField("employeeName", e.target.checked)
                            }
                        />
                    }
                    label="Employee Name"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.supervisor ?? true}
                            onChange={(e) =>
                                updateField("supervisor", e.target.checked)
                            }
                        />
                    }
                    label="Supervisor"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.department ?? true}
                            onChange={(e) =>
                                updateField("department", e.target.checked)
                            }
                        />
                    }
                    label="Department"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.position ?? true}
                            onChange={(e) =>
                                updateField("position", e.target.checked)
                            }
                        />
                    }
                    label="Position"
                />

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                >
                    Optional Fields
                </Typography>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.phoneNumber ?? false}
                            onChange={(e) =>
                                updateField("phoneNumber", e.target.checked)
                            }
                        />
                    }
                    label="Phone Number"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.employeeId ?? false}
                            onChange={(e) =>
                                updateField("employeeId", e.target.checked)
                            }
                        />
                    }
                    label="Employee ID"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.officeLocation ?? false}
                            onChange={(e) =>
                                updateField("officeLocation", e.target.checked)
                            }
                        />
                    }
                    label="Office Location"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.costCentre ?? false}
                            onChange={(e) =>
                                updateField("costCentre", e.target.checked)
                            }
                        />
                    }
                    label="Cost Centre"
                />

            </Stack>

        </Paper>

    );

}