import {
    Box,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

export default function GoalListPreview({
    component,
    previewMode,
    responses = {},
    onResponsesChange,
}) {
    console.log("GOAL PREVIEW RESPONSES:", responses);
    const fields =
        component?.fields &&
        !Array.isArray(component.fields) &&
        Object.keys(component.fields).length > 0
            ? component.fields
            : {
                goalTitle: true,
                goalDescription: true,
                successCriteria: true,
                weight: true,
                targetDate: true,
            };

    const goals = component.goals || [
        {
            id: "preview-goal-1",
        },
    ];
    console.log(
        "GOAL PREVIEW RESPONSES:",
        responses
    );

    console.log(
        "GOAL PREVIEW GOAL 1:",
        responses?.goal_list?.goal_1
    );
    console.log("GOAL PREVIEW COMPONENT:", component);
console.log("GOAL PREVIEW GOALS:", component?.goals);

    function updateGoalField(goalKey, fieldName, value) {
        onResponsesChange?.({
            ...responses,

            goal_list: {
                ...(responses?.goal_list || {}),

                [goalKey]: {
                    ...(responses?.goal_list?.[goalKey] || {}),
                    [fieldName]: value,
                },
            },
        });
    }

    function renderField(
        label,
        goalKey,
        fieldName,
        props = {}
    ) {
        const value =
            responses?.goal_list?.[goalKey]?.[fieldName] || "";

        return (
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{
                        mb: 1,
                    }}
                >
                    {label}
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    value={value}
                    onChange={(e) => {
                        updateGoalField(
                            goalKey,
                            fieldName,
                            e.target.value
                        );
                    }}
                    disabled={previewMode !== "employee"}
                    {...props}
                />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                mb: 4,
            }}
        >
            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                {component.title || "Proposed Goals"}
            </Typography>

            {goals.map((goal, index) => {
                const goalKey = `goal_${index + 1}`;

                return (
                    <Box
                        key={goal.id}
                        sx={{
                            mb: 5,
                        }}
                    >
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                width: "100%",
                                m: 0,
                            }}
                        >
                            {fields.goalTitle && (
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    {renderField(
                                        `Goal ${index + 1} Proposal`,
                                        goalKey,
                                        "proposal"
                                    )}
                                </Grid>
                            )}

                            {fields.goalDescription && (
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    {renderField(
                                        "Goal Description",
                                        goalKey,
                                        "description",
                                        {
                                            multiline: true,
                                            rows: 3,
                                        }
                                    )}
                                </Grid>
                            )}

                            {fields.successCriteria && (
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    {renderField(
                                        "Success Criteria",
                                        goalKey,
                                        "successCriteria",
                                        {
                                            multiline: true,
                                            rows: 2,
                                        }
                                    )}
                                </Grid>
                            )}

                            {fields.weight && (
                                <Grid item xs={6}>
                                    {renderField(
                                        "Weight (%)",
                                        goalKey,
                                        "weight"
                                    )}
                                </Grid>
                            )}

                            {fields.targetDate && (
                                <Grid item xs={6}>
                                    {renderField(
                                        "Target Date",
                                        goalKey,
                                        "targetDate",
                                        {
                                            type: "date",
                                            InputLabelProps: {
                                                shrink: true,
                                            },
                                        }
                                    )}
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                );
            })}
        </Box>
    );
}