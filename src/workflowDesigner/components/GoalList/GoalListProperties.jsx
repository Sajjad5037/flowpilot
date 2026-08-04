import {
    Paper,
    Typography,
    Divider,
    Stack,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button
} from "@mui/material";

export default function GoalListProperties({

    component,

    onChange

}) {

    const fields = component.fields || {

        goalTitle: true,

        goalDescription: true,

        successCriteria: true,

        weight: true,

        targetDate: true

    };
    const goals = component.goals || [

        {
            id: crypto.randomUUID()
        }

    ];

    function handleFieldChange(field) {

        onChange({

            ...component,

            goals,

            fields: {

                ...fields,

                [field]: !fields[field]

            }

        })

    }
    function handleDeleteGoal(goalId) {

        // Don't allow removing the last remaining goal
        if (goals.length === 1) {
            return;
        }

        onChange({

            ...component,

            fields,

            goals: goals.filter(goal => goal.id !== goalId)

        });

    }
    function handleAddGoal() {

        onChange({

            ...component,

            fields,

            goals: [

                ...goals,

                {

                    id: crypto.randomUUID()

                }

            ]

        });

    }

    return (

        <Paper
            elevation={0}
            sx={{
                p: 2
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
            >
                Proposed Goals
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2}>

                <TextField
                    label="Section Title"
                    value={
                        component.title ||
                        "Proposed Goals"
                    }
                    onChange={(event) =>
                        onChange({

                            ...component,

                            goals,

                            title: event.target.value

                        })
                    }
                />

                <TextField
                    label="Description"
                    multiline
                    rows={3}
                    value={
                        component.description ||
                        "Employees propose goals for the next quarter."
                    }
                    onChange={(event) =>
                        onChange({

                            ...component,

                            goals,

                            description: event.target.value

                        })
                    }
                />

                <Divider />

                <Typography
                    variant="subtitle2"
                    fontWeight={700}
                >
                    Fields
                </Typography>

                <FormGroup>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.goalTitle}
                                onChange={() =>
                                    handleFieldChange("goalTitle")
                                }
                            />
                        }
                        label="Goal Title"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.goalDescription}
                                onChange={() =>
                                    handleFieldChange("goalDescription")
                                }
                            />
                        }
                        label="Goal Description"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.successCriteria}
                                onChange={() =>
                                    handleFieldChange("successCriteria")
                                }
                            />
                        }
                        label="Success Criteria"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.weight}
                                onChange={() =>
                                    handleFieldChange("weight")
                                }
                            />
                        }
                        label="Weight (%)"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.targetDate}
                                onChange={() =>
                                    handleFieldChange("targetDate")
                                }
                            />
                        }
                        label="Target Date"
                    />

                </FormGroup>
                <Divider />

                <Typography
                    variant="subtitle2"
                    fontWeight={700}
                >
                    Goals
                </Typography>

                {goals.map((goal, index) => (

                    <Stack
                        key={goal.id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Typography variant="body2">
                            Goal {index + 1}
                        </Typography>

                        <Button
                            size="small"
                            color="error"
                            onClick={() => handleDeleteGoal(goal.id)}
                            disabled={goals.length === 1}
                        >
                            Delete
                        </Button>

                    </Stack>

                ))}

                <Button
                    variant="outlined"
                    onClick={handleAddGoal}
                >
                    + Add Goal
                </Button>


            </Stack>

        </Paper>

    );

}