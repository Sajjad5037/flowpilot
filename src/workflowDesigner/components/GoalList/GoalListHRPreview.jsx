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
import { useEffect } from "react";

export default function GoalListHRPreview({

    component,
    employeeResponses,
    supervisorResponses,
    responses,
    isBuilderPreview,
    previewMode,
    isRealEvaluation,
    onResponsesChange

}) {

    console.log("DEBUG HR isBuilderPreview:", isBuilderPreview);
    console.log("DEBUG HR isRealEvaluation:", isRealEvaluation);
    console.log("DEBUG HR previewMode:", previewMode);
    console.log("DEBUG HR componentId:", component?.id);
    console.log("DEBUG HR componentGoals:", component?.goals);
    console.log("DEBUG HR goalCount:", component?.goals?.length);
    const responseGoals = responses?.goal_list || {};
    const goalEntries = Object.entries(responseGoals);
    const employeeGoalCount = Object.keys(
        employeeResponses?.goal_list || {}
    ).length;
    const supervisorGoalCount = Object.keys(
        supervisorResponses?.goal_list || {}
    ).length;
    const initialGoalCount = Math.max(
        employeeGoalCount,
        supervisorGoalCount,
        1
    );
    useEffect(() => {
        if (!isRealEvaluation || goalEntries.length > 0) {
            return;
        }

        const initialGoals = Array.from(
            { length: initialGoalCount },
            () => ({ final_goal: "" })
        );

        onResponsesChange?.({
            ...(responses || {}),
            goal_list: initialGoals.reduce((goalList, goal) => {
                const goalKey = `goal_${Object.keys(goalList).length + 1}`;
                goalList[goalKey] = goal;
                return goalList;
            }, {}),
        });
    }, [
        goalEntries.length,
        initialGoalCount,
        isRealEvaluation,
        onResponsesChange,
        responses,
    ]);

    const goals = isRealEvaluation
        ? (goalEntries.length > 0
            ? goalEntries
            : Array.from(
                { length: initialGoalCount },
                (_, index) => [`goal_${index + 1}`, {}]
            ))
        : (component.goals || []).map((goal, index) => [
            `goal_${index + 1}`,
            goal,
        ]);

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
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mb: 3
                }}
            >
                {component.title || "Goal Review"}
            </Typography>

            <Stack spacing={5}>

                    {goals.map(([goalKey], index) => {

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

                                    {isRealEvaluation && <IconButton
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
                                    </IconButton>}
                                </Box>

                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: 3
                                    }}
                                >

                                    {/* Employee */}

                                    <Box>

                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1
                                            }}
                                        >
                                            Employee Response
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

                                            <Stack spacing={1}>

                                                <Typography>
                                                    <strong>Proposal:</strong>{" "}
                                                    {employeeResponses?.goal_list?.[goalKey]?.proposal || "No employee proposal."}
                                                </Typography>

                                                <Typography>
                                                    <strong>Description:</strong>{" "}
                                                    {employeeResponses?.goal_list?.[goalKey]?.description || ""}
                                                </Typography>

                                            </Stack>

                                        </Paper>

                                    </Box>

                                    {/* Supervisor */}

                                    <Box>

                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1
                                            }}
                                        >
                                            Supervisor Response
                                        </Typography>

                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2,
                                                bgcolor: "#EFF6FF",
                                                borderLeft: "4px solid #2563EB",
                                                minHeight: 220
                                            }}
                                        >

                                            <Typography>

                                                {

                                                    supervisorResponses?.goal_list?.[goalKey]?.review ||
                                                    "No supervisor review."

                                                }

                                            </Typography>

                                        </Paper>

                                    </Box>

                                    {/* HR */}

                                    <Box>

                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1
                                            }}
                                        >
                                            Final Agreed Goal 
                                        </Typography>

                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={10}
                                            placeholder="Type Final agreed goal..."
                                            value={
                                                responses?.goal_list?.[goalKey]?.final_goal || ""
                                            }
                                            onChange={(e) => {

                                                onResponsesChange({

                                                    ...responses,

                                                    goal_list: {

                                                        ...(responses?.goal_list || {}),

                                                        [goalKey]: {

                                                            ...(responses?.goal_list?.[goalKey] || {}),

                                                            final_goal: e.target.value

                                                        }

                                                    }

                                                });

                                            }}
                                        />

                                    </Box>

                                </Box>

                            </Box>

                        );

                    })}

            </Stack>

            {isRealEvaluation && <Button
                variant="outlined"
                onClick={addGoal}
            >
                + Add Goal
            </Button>}

        </Box>

    );

}