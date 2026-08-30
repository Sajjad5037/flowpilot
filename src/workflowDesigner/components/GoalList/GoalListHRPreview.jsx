import {
    Box,
    Button,
    IconButton,
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

    const configuredGoals = (component.goals || []).map((goal, index) => [
        `goal_${index + 1}`,
        goal,
    ]);
    const configuredGoalKeys = new Set(
        configuredGoals.map(([goalKey]) => goalKey)
    );
    const responseOnlyGoals = Object.keys(responseGoals)
        .filter(goalKey => !configuredGoalKeys.has(goalKey))
        .map(goalKey => [goalKey, responseGoals[goalKey]]);

    const goals = isRealEvaluation
        ? (goalEntries.length > 0
            ? goalEntries
            : Array.from(
                { length: initialGoalCount },
                (_, index) => [`goal_${index + 1}`, {}]
            ))
        : [...configuredGoals, ...responseOnlyGoals];

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
                        {component.title || "Goal Review"}
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

                {isRealEvaluation && (
                    <Button
                        variant="outlined"
                        onClick={addGoal}
                        sx={{
                            alignSelf: {
                                xs: "flex-start",
                                sm: "auto",
                            },
                            flexShrink: 0,
                            borderColor: "#6EE7B7",
                            color: "#047857",
                            textTransform: "none",
                            "&:hover": {
                                borderColor: "#34D399",
                                bgcolor: "#F0FDF4",
                            },
                        }}
                    >
                        + Add Goal
                    </Button>
                )}
            </Box>

            <Stack spacing={2.5}>

                    {goals.map(([goalKey], index) => {

                        return (

                            <Box
                                key={goalKey}
                                sx={{
                                    border: "1px solid #DCE3EC",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        bgcolor: "#F8FAFC",
                                        borderBottom: "1px solid #DCE3EC",
                                        px: 2,
                                        py: 1.25,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#0F172A",
                                            fontSize: 14,
                                            fontWeight: 700,
                                        }}
                                    >
                                        Goal Item #{index + 1}
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
                                        p: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: {
                                                xs: "1fr",
                                                md: "repeat(2, minmax(0, 1fr))",
                                            },
                                            gap: 2,
                                        }}
                                    >
                                        {/* Employee */}

                                        <Box
                                            sx={{
                                                bgcolor: "#F5F8FF",
                                                border: "1px solid #D6E4FF",
                                                borderRadius: 2,
                                                p: 2,
                                                minHeight: 92,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "#173A82",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    mb: 0.75,
                                                }}
                                            >
                                                Employee Proposed Goal
                                            </Typography>

                                            <Stack spacing={1}>

                                                <Typography
                                                    sx={{
                                                        color: "#334155",
                                                        fontSize: 14,
                                                        lineHeight: 1.5,
                                                    }}
                                                >
                                                    {employeeResponses?.goal_list?.[goalKey]?.proposal || "No employee proposal."}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        color: "#64748B",
                                                        fontSize: 13,
                                                        lineHeight: 1.5,
                                                    }}
                                                >
                                                    {employeeResponses?.goal_list?.[goalKey]?.description || ""}
                                                </Typography>

                                            </Stack>

                                        </Box>

                                        {/* Supervisor */}

                                        <Box
                                            sx={{
                                                bgcolor: "#FCF8FF",
                                                border: "1px solid #E9DDF8",
                                                borderRadius: 2,
                                                p: 2,
                                                minHeight: 92,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: "#6B149D",
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    mb: 0.75,
                                                }}
                                            >
                                                Supervisor Proposed Goal
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "#334155",
                                                    fontSize: 14,
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                {supervisorResponses?.goal_list?.[goalKey]?.review ||
                                                    "No supervisor review."}
                                            </Typography>

                                        </Box>
                                    </Box>

                                    {/* HR */}

                                    <Box
                                        sx={{
                                            bgcolor: "#F3FFF8",
                                            border: "1px solid #9DECC1",
                                            borderRadius: 2,
                                            p: 2,
                                            mt: 2,
                                        }}
                                    >

                                        <Typography
                                            sx={{
                                                color: "#075B35",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                textTransform: "uppercase",
                                                mb: 1,
                                            }}
                                        >
                                            Final Agreed Goal (HR Meeting Outcome)
                                        </Typography>

                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={3}
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
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    bgcolor: "#FFFFFF",
                                                    borderRadius: 1.5,
                                                    "& fieldset": {
                                                        borderColor: "#6EE7B7",
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: "#34D399",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "#10B981",
                                                        borderWidth: 1,
                                                    },
                                                },
                                                "& .MuiInputBase-input": {
                                                    color: "#334155",
                                                    fontSize: 14,
                                                    lineHeight: 1.55,
                                                },
                                            }}
                                        />

                                    </Box>

                                </Box>

                            </Box>

                        );

                    })}

            </Stack>

        </Box>

    );

}