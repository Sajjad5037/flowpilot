import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function GoalListSupervisorPreview({

    component,
    responses,
    employeeResponses,
    isBuilderPreview,
    previewMode,
    isRealEvaluation,
    onResponsesChange

}) {

    console.log("DEBUG Supervisor isBuilderPreview:", isBuilderPreview);
    console.log("DEBUG Supervisor isRealEvaluation:", isRealEvaluation);
    console.log("DEBUG Supervisor previewMode:", previewMode);
    console.log("DEBUG Supervisor componentId:", component?.id);
    console.log("DEBUG Supervisor componentGoals:", component?.goals);
    console.log("DEBUG Supervisor goalCount:", component?.goals?.length);
    const responseGoals = responses?.goal_list || {};
    const responseGoalEntries = Object.entries(responseGoals);
    const goals = isRealEvaluation
        ? (responseGoalEntries.length > 0
            ? responseGoalEntries
            : [["goal_1", {}]])
        : (component.goals || []).map((goal, index) => [
            `goal_${index + 1}`,
            goal,
        ]);

    function updateGoalReview(goalKey, value) {

    onResponsesChange({

        ...responses,

        goal_list: {

            ...(responses?.goal_list || {}),

            [goalKey]: {

                ...(responses?.goal_list?.[goalKey] || {}),

                review: value

            }

        }

    });

}

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

    return (

        <Box sx={{ mb: 4 }}>

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                {component.title || "Proposed Goals"}
            </Typography>

            <Stack spacing={5}>

                {!isRealEvaluation && goals.length === 0 ? (

                    <Typography color="text.secondary">

                        No goals configured.

                    </Typography>

                ) : (

                    goals.map(([goalKey], index) => {

                        return (

                            <Box key={goalKey}>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                    >
                                        Goal {index + 1}
                                    </Typography>

                                    {isRealEvaluation && (
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
                                </Box>

                                <Box>

                                    {/* Employee Goal x

                                        <Box>

                                            <Typography
                                                fontWeight={600}
                                                mb={1}
                                            >
                                                Employee Proposal
                                            </Typography>

                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: 2,
                                                    bgcolor: "#F3F4F6",
                                                    borderLeft: "4px solid #64748B",
                                                    minHeight: 220
                                                }}
                                            >

                                                <Typography>

                                                    {employeeResponses?.goal_list?.[goalKey]?.proposal ||
                                                        "No proposal submitted."}

                                                </Typography>

                                            </Paper>

                                        </Box>
                                    {/* Employee Goal */}
                                    {/* Supervisor Review */}

                                    <Box>

                                        

                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={2}
                                            placeholder="Enter supervisor feedback..."
                                            value={
                                                responses?.goal_list?.[goalKey]?.review || ""
                                            }
                                            onChange={(e) => {

                                                updateGoalReview(
                                                    goalKey,
                                                    e.target.value
                                                );

                                            }}
                                        />

                                    </Box>

                                </Box>

                            </Box>

                        );

                    })

                )}

            </Stack>

            {isRealEvaluation && (
                <Button
                    variant="outlined"
                    onClick={addGoal}
                    sx={{ mt: 2 }}
                >
                    + Add Goal
                </Button>
            )}

        </Box>

    );

}