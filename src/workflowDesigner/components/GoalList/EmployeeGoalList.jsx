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
                        sx={{
                            color: "#0F172A",
                            fontSize: 14,
                            fontWeight: 700,
                            lineHeight: 1.45,
                        }}
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
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            bgcolor: "#FFFFFF",
                            borderRadius: 1.5,
                            "& fieldset": {
                                borderColor: "#CBD5E1",
                            },
                            "&:hover fieldset": {
                                borderColor: "#94A3B8",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#7C3AED",
                                borderWidth: 1,
                            },
                        },
                        "& .MuiInputBase-input": {
                            color: "#334155",
                            fontSize: 14,
                        },
                    }}
                />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 2,
                p: {
                    xs: 2.5,
                    sm: 3,
                },
                mb: 4,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    alignItems: {
                        xs: "stretch",
                        sm: "flex-start",
                    },
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 2.5,
                }}
            >
                <Box>
                    <Typography
                        component="h2"
                        sx={{
                            color: "#0F172A",
                            fontSize: 18,
                            fontWeight: 700,
                            lineHeight: 1.35,
                        }}
                    >
                        {component.title || "Proposed Goals"}
                    </Typography>

                    {component.description && (
                        <Typography
                            sx={{
                                color: "#64748B",
                                fontSize: 14,
                                lineHeight: 1.5,
                                mt: 0.5,
                            }}
                        >
                            {component.description}
                        </Typography>
                    )}
                </Box>

                <Button
                    variant="outlined"
                    onClick={addGoal}
                    sx={{
                        alignSelf: {
                            xs: "flex-start",
                            sm: "auto",
                        },
                        flexShrink: 0,
                        borderColor: "#D8B4FE",
                        color: "#7C3AED",
                        textTransform: "none",
                        "&:hover": {
                            borderColor: "#A855F7",
                            bgcolor: "#FAF5FF",
                        },
                    }}
                >
                    + Add Proposed Goal
                </Button>
            </Box>

            {goals.map(([goalKey], index) => (
                <Box
                    key={goalKey}
                    sx={{
                        bgcolor: "#FAFBFD",
                        border: "1px solid #DCE3EC",
                        borderRadius: 2,
                        p: {
                            xs: 2,
                            sm: 2.5,
                        },
                        mb: index === goals.length - 1 ? 0 : 2.5,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#0F172A",
                                fontSize: 14,
                                fontWeight: 700,
                            }}
                        >
                            Goal #{index + 1}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#94A3B8",
                                    fontSize: 13,
                                    fontWeight: 500,
                                }}
                            >
                                Proposed Target
                            </Typography>

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
                        </Box>
                    </Box>

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
                                    "Target Description",
                                    index,
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
                            <Grid item xs={12} sm={6}>
                                {renderField(
                                    "Weight (%)",
                                    index,
                                    "weight"
                                )}
                            </Grid>
                        )}

                        {fields.targetDate && (
                            <Grid item xs={12} sm={6}>
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
        </Box>
    );
}
