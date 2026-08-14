import {
    Box,
    Checkbox,
    FormControlLabel,
    Stack,
    Typography,
} from "@mui/material";

export default function EmployeeInformationProperties({
    component,
    onChange,
}) {

    const fields = component?.fields || {
        employeeName: true,
        supervisor: true,
        department: true,
        reviewCycle: true,
        employmentType: true,
        dueDate: true,
    };

    function handleFieldChange(field, checked) {

        onChange({
            ...component,
            fields: {
                ...fields,
                [field]: checked,
            },
        });

    }

    return (

        <Stack spacing={3}>

            <Box>

                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                >
                    Employee Information
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                >
                    Choose which employee and evaluation information
                    should appear on the form.
                </Typography>

            </Box>

            <Stack spacing={1}>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.employeeName}
                            onChange={(event) =>
                                handleFieldChange(
                                    "employeeName",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Employee Name"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.supervisor}
                            onChange={(event) =>
                                handleFieldChange(
                                    "supervisor",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Supervisor"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.department}
                            onChange={(event) =>
                                handleFieldChange(
                                    "department",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Department"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.reviewCycle}
                            onChange={(event) =>
                                handleFieldChange(
                                    "reviewCycle",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Review Cycle"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.employmentType}
                            onChange={(event) =>
                                handleFieldChange(
                                    "employmentType",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Employment Type"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fields.dueDate}
                            onChange={(event) =>
                                handleFieldChange(
                                    "dueDate",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Due Date"
                />

            </Stack>

        </Stack>

    );
}