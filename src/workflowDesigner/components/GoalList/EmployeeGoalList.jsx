import {
    Box,
    Button,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function EmployeeGoalList({
    component,
    responses = {},
    isBuilderPreview,
    previewMode,
    isRealEvaluation,
    onResponsesChange,
}) {
    console.log("DEBUG EmployeeGoal isBuilderPreview:", isBuilderPreview);
    console.log("DEBUG EmployeeGoal isRealEvaluation:", isRealEvaluation);
    console.log("DEBUG EmployeeGoal previewMode:", previewMode);
    console.log("DEBUG EmployeeGoal componentId:", component?.id);
    console.log("DEBUG EmployeeGoal componentGoals:", component?.goals);
    console.log("DEBUG EmployeeGoal goalCount:", component?.goals?.length);
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

    const responseGoals = responses?.goal_list || {};
    const goalEntries = Object.entries(responseGoals);
    const goals = goalEntries.length > 0
        ? goalEntries
        : [["goal_1", {}]];

    function updateGoals(updatedGoals) {
        onResponsesChange?.({
            ...responses,
            goal_list: updatedGoals.reduce((goalList, [, goal]) => {
                const goalKey = `goal_${Object.keys(goalList).length + 1}`;
                goalList[goalKey] = goal;
                return goalList;
            }, {}),
        });
    }

    function updateGoalField(goalIndex, fieldName, value) {
        const updatedGoals = goals.map(([goalKey, goal], index) => (
            index === goalIndex
                ? [goalKey, { ...goal, [fieldName]: value }]
                : [goalKey, goal]
        ));

        updateGoals(updatedGoals);
    }

    function addGoal() {
        updateGoals([
            ...goals,
            ["goal_new", {}],
        ]);
    }

    function removeGoal(goalIndex) {
        updateGoals(
            goals.filter(([,], index) => index !== goalIndex)
        );
    }

    function renderField(
        label,
        goalIndex,
        fieldName,
        props = {},
        headingAction = null
    ) {
        const value = goals[goalIndex][1]?.[fieldName] || "";

        return (
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                    }}
                >
                    <Typography
                        variant="body1"
                        fontWeight={600}
                    >
                        {label}
                    </Typography>

                    {headingAction}
                </Box>

                <TextField
                    fullWidth
                    variant="outlined"
                    value={value}
                    onChange={(event) => {
                        updateGoalField(
                            goalIndex,
                            fieldName,
                            event.target.value
                        );
                    }}
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

            {goals.map(([goalKey], index) => (
                <Box
                    key={goalKey}
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
                                    index,
                                    "proposal",
                                    {},
                                    <IconButton
                                        size="small"
                                        aria-label={`Remove Goal ${index + 1}`}
                                        onClick={() => removeGoal(index)}
                                        sx={{
                                            color: "#DC2626",
                                            "&:hover": {
                                                backgroundColor: "#FEE2E2",
                                            },
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
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
                                    index,
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
                                    index,
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
                                    index,
                                    "weight"
                                )}
                            </Grid>
                        )}

                        {fields.targetDate && (
                            <Grid item xs={6}>
                                {renderField(
                                    "Target Date",
                                    index,
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
            ))}

            <Button
                variant="outlined"
                onClick={addGoal}
            >
                + Add Goal
            </Button>
        </Box>
    );
}
