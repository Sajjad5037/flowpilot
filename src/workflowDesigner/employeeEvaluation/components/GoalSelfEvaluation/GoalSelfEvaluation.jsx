import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function GoalSelfEvaluation({
    component,
    previewMode = "employee",
    reviewCycleMonths = ["April", "May", "June"],
    finalizedGoals = [],
    responses = {},
    onResponsesChange,
    employeeResponses = {},
    supervisorResponses = {},
    hrResponses = {},
}) {

    const settings =
        component?.settings || {};

    const showTargetDescription =
        settings.showTargetDescription !== false;

    const showMonthlyProgress =
        settings.showMonthlyProgress !== false;

    const allowEmployeeRating =
        settings.allowEmployeeRating !== false;

    const allowEmployeeNotes =
        settings.allowEmployeeNotes !== false;

    const allowSupervisorRating =
        settings.allowSupervisorRating !== false;

    const allowSupervisorNotes =
        settings.allowSupervisorNotes !== false;

    const showEmployeeRating =
        settings.showEmployeeRating !== false;

    const showSupervisorRating =
        settings.showSupervisorRating !== false;

    const allowFinalAgreedRating =
        settings.allowFinalAgreedRating !== false;


    const monthlyProgress =
        settings.monthlyProgress || {};

    const months =
        Array.isArray(reviewCycleMonths) &&
        reviewCycleMonths.length === 3
            ? reviewCycleMonths
            : ["April", "May", "June"];


    const employeeRating =
        previewMode === "hr"
            ? employeeResponses?.goal_self_evaluation?.employee_rating ?? ""
            : previewMode === "employee"
            ? responses?.goal_self_evaluation?.employee_rating ?? ""
            : "";

    const handleEmployeeRatingChange = (
        goalId,
        value
    ) => {

        if (typeof onResponsesChange !== "function") {
            return;
        }

        const currentRatings =
            responses?.goal_self_evaluation
                ?.employee_rating_by_goal || {};

        onResponsesChange({
            ...responses,
            goal_self_evaluation: {
                ...(responses?.goal_self_evaluation || {}),
                employee_rating_by_goal: {
                    ...currentRatings,
                    [goalId]: value,
                },
            },
        });

    };


    const handleSupervisorRatingChange = (
        goalId,
        value
    ) => {

        if (typeof onResponsesChange !== "function") {
            return;
        }

        const currentRatings =
            responses?.goal_self_evaluation
                ?.supervisor_rating_by_goal || {};

        onResponsesChange({
            ...responses,
            goal_self_evaluation: {
                ...(responses?.goal_self_evaluation || {}),
                supervisor_rating_by_goal: {
                    ...currentRatings,
                    [goalId]: value,
                },
            },
        });

    };


    const handleHrMonthlyProgressChange = (
        goalId,
        month,
        value
    ) => {

        if (typeof onResponsesChange !== "function") {
            return;
        }

        const currentProgressByGoal =
            responses?.goal_self_evaluation?.monthly_progress_by_goal || {};

        const currentGoalProgress =
            currentProgressByGoal[goalId] || {};

        onResponsesChange({
            ...responses,
            goal_self_evaluation: {
                ...(responses?.goal_self_evaluation || {}),
                monthly_progress_by_goal: {
                    ...currentProgressByGoal,
                    [goalId]: {
                        ...currentGoalProgress,
                        [month]: value,
                    },
                },
            },
        });

    };


    const handleHrCompletionDateChange = (goalId, value) => {

        if (typeof onResponsesChange !== "function") {
            return;
        }

        const currentCompletionDates =
            responses?.goal_self_evaluation?.completion_date_by_goal || {};

        onResponsesChange({
            ...responses,
            goal_self_evaluation: {
                ...(responses?.goal_self_evaluation || {}),
                completion_date_by_goal: {
                    ...currentCompletionDates,
                    [goalId]: value,
                },
            },
        });

    };


    const handleHrTargetDescriptionChange = (goalId, value) => {

        if (typeof onResponsesChange !== "function") {
            return;
        }

        const currentGoalDescriptions =
            responses?.goal_self_evaluation?.target_description_by_goal || {};

        onResponsesChange({
            ...responses,
            goal_self_evaluation: {
                ...(responses?.goal_self_evaluation || {}),
                target_description_by_goal: {
                    ...currentGoalDescriptions,
                    [goalId]: value,
                },
            },
        });

    };


    const handleHrAddGoal = () => {

        if (typeof onResponsesChange !== "function") {
            return;
        }

        const currentGoals =
            Array.isArray(
                responses?.goal_self_evaluation?.hr_goals
            )
                ? responses.goal_self_evaluation.hr_goals
                : (
                    Array.isArray(finalizedGoals)
                        ? finalizedGoals
                        : []
                );

        const newGoal = {
            id: `hr-goal-${Date.now()}`,
            description: "",
            targetDescription: "",
        };

        onResponsesChange({
            ...responses,
            goal_self_evaluation: {
                ...(responses?.goal_self_evaluation || {}),
                hr_goals: [
                    ...currentGoals,
                    newGoal,
                ],
            },
        });

    };


    const handleHrRemoveGoal = (goalId) => {

        if (typeof onResponsesChange !== "function") {
            return;
        }

        const currentGoals =
            Array.isArray(
                responses?.goal_self_evaluation?.hr_goals
            )
                ? responses.goal_self_evaluation.hr_goals
                : (
                    Array.isArray(finalizedGoals)
                        ? finalizedGoals
                        : []
                );

        onResponsesChange({
            ...responses,
            goal_self_evaluation: {
                ...(responses?.goal_self_evaluation || {}),
                hr_goals: currentGoals.filter(
                    goal => goal.id !== goalId
                ),
            },
        });

    };


    const handleHrFinalRatingChange = (goalId, value) => {

        if (typeof onResponsesChange !== "function") {
            return;
        }

        const currentRatings =
            responses?.goal_self_evaluation?.final_rating_by_goal || {};

        onResponsesChange({
            ...responses,
            goal_self_evaluation: {
                ...(responses?.goal_self_evaluation || {}),
                final_rating_by_goal: {
                    ...currentRatings,
                    [goalId]: value,
                },
            },
        });

    };


    const supervisorRating =
        settings.supervisorRating ||
        "3. Meets Expectation";


    const employeeNotes =
        settings.employeeNotes || "";


    const supervisorNotes =
        settings.supervisorNotes ||
        "Solid progress made on bench additions.";


    const finalRating =
        settings.finalRating || "";


    const sectionWeight =
        settings.sectionWeight ||
        "50%";


    const goalWeight =
        settings.goalWeight ||
        "12.5%";


    const totalPoints =
        settings.totalPoints ||
        "9.375 pts";


    const completionDate =
        settings.completionDate ||
        "--";


    const ratingOptions = [

        "1. Poor",

        "2. Below Expectation",

        "3. Meets Expectation",

        "4. Above Expectation",

        "5. Fully Sent",

    ];


    /*
     * ==========================================
     * EMPLOYEE PREVIEW
     * ==========================================
     */

    if (previewMode === "employee") {

        const employeeGoals =
            Array.isArray(
                hrResponses?.goal_self_evaluation?.hr_goals
            )
                ? hrResponses.goal_self_evaluation.hr_goals
                : (
                    Array.isArray(finalizedGoals)
                        ? finalizedGoals
                        : []
                );

        return (

            <Box>

                <Box sx={{ mb: 3 }}>

                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#0F172A",
                        }}
                    >
                        Quarterly Goals Self-Evaluation
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: "#64748B",
                            mt: 0.5,
                            fontStyle: "italic",
                        }}
                    >
                        (Goals are based on the final agreements from the previous
                        goal-setting meeting.)
                    </Typography>

                </Box>


                {employeeGoals.map((goal, index) => {
                    const goalId = goal.id || `goal-${index}`;

                    const hrMonthlyProgress =
                        hrResponses?.goal_self_evaluation
                            ?.monthly_progress_by_goal?.[goalId] || {};

                    const displayedMonthlyProgress =
                        Object.keys(hrMonthlyProgress).length > 0
                            ? hrMonthlyProgress
                            : monthlyProgress;

                    const finalMonth = months[months.length - 1];

                    const finalMonthHasData =
                        Boolean(
                            hrMonthlyProgress?.[finalMonth]?.trim()
                        );

                    const employeeGoalRating =
                        responses?.goal_self_evaluation
                            ?.employee_rating_by_goal?.[goalId] || "";

                    return (

                    <Box
                        key={goal.id || index}
                        sx={{
                            mb: 4,
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: 14,
                                fontWeight: 700,
                                mb: 1.5,
                            }}
                        >
                            Goal #{index + 1}
                        </Typography>


                        <GoalProgressTable
                            targetDescription={
                                hrResponses?.goal_self_evaluation
                                    ?.target_description_by_goal?.[goalId] ??
                                goal.description ??
                                goal.targetDescription ??
                                "--"
                            }
                            monthlyProgress={displayedMonthlyProgress}
                            showTargetDescription={
                                showTargetDescription
                            }
                            showMonthlyProgress={
                                showMonthlyProgress
                            }
                            months={months}
                        />


                        {allowEmployeeRating && (

                        <Box
                            sx={{
                                mt: 2,
                                p: 2,
                                border:
                                    "1px solid #BFDBFE",
                                borderRadius: 2,
                                bgcolor: "#F8FBFF",
                            }}
                        >

                            <Typography
                                fontSize={13}
                                fontWeight={700}
                                mb={1}
                            >
                                Select Your Self-Rating
                            </Typography>


                            <Select
                                fullWidth
                                size="small"
                                value={employeeGoalRating}
                                onChange={(event) =>
                                    handleEmployeeRatingChange(
                                        goalId,
                                        event.target.value
                                    )
                                }
                                disabled={!finalMonthHasData}
                            >

                                {ratingOptions.map(
                                    option => (

                                        <MenuItem
                                            key={option}
                                            value={option}
                                        >
                                            {option}
                                        </MenuItem>

                                    )
                                )}

                            </Select>


                            {allowEmployeeNotes && (

                                <TextField
                                    fullWidth
                                    size="small"
                                    sx={{ mt: 2 }}
                                    placeholder="Add notes or feedback..."
                                    value={employeeNotes}
                                    multiline
                                    minRows={2}
                                />

                            )}

                        </Box>

                        )}

                    </Box>

                    );
                })}

            </Box>

        );

    }


    /*
     * ==========================================
     * SUPERVISOR PREVIEW
     * ==========================================
     */

    if (previewMode === "supervisor") {

        const supervisorGoals =
            Array.isArray(
                hrResponses?.goal_self_evaluation?.hr_goals
            )
                ? hrResponses.goal_self_evaluation.hr_goals
                : (
                    Array.isArray(finalizedGoals)
                        ? finalizedGoals
                        : []
                );

        return (

            <Box>

                <Typography
                    sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#0F172A",
                        mb: 3,
                    }}
                >
                    Quarterly Goals Evaluation
                </Typography>


                {supervisorGoals.map((goal, index) => {
                    const goalId = goal.id || `goal-${index}`;

                    const hrMonthlyProgress =
                        hrResponses?.goal_self_evaluation
                            ?.monthly_progress_by_goal?.[goalId] || {};

                    const displayedMonthlyProgress =
                        Object.keys(hrMonthlyProgress).length > 0
                            ? hrMonthlyProgress
                            : monthlyProgress;

                    const finalMonth = months[months.length - 1];

                    const finalMonthHasData =
                        Boolean(
                            hrMonthlyProgress?.[finalMonth]?.trim()
                        );

                    const supervisorGoalRating =
                        responses?.goal_self_evaluation
                            ?.supervisor_rating_by_goal?.[goalId] || "";

                    return (

                    <Box
                        key={goal.id || index}
                        sx={{
                            mb: 4,
                        }}
                    >

                    <Typography
                        sx={{
                            fontSize: 14,
                            fontWeight: 700,
                            mb: 1.5,
                        }}
                    >
                        Goal #{index + 1}
                    </Typography>


                    <GoalProgressTable
                        targetDescription={
                            hrResponses?.goal_self_evaluation
                                ?.target_description_by_goal?.[goalId] ??
                            goal.description ??
                            goal.targetDescription ??
                            "--"
                        }
                        monthlyProgress={displayedMonthlyProgress}
                        showTargetDescription={
                            showTargetDescription
                        }
                        showMonthlyProgress={
                            showMonthlyProgress
                        }
                            months={months}
                    />


                    {(allowSupervisorRating ||
                        allowSupervisorNotes) && (

                        <Box
                            sx={{
                                mt: 2,
                                p: 2,
                                border:
                                    "1px solid #E9D5FF",
                                borderRadius: 2,
                                bgcolor: "#FCF8FF",
                            }}
                        >

                            {allowSupervisorRating && (

                                <>
                                    <Typography
                                        fontSize={13}
                                        fontWeight={700}
                                        mb={1}
                                    >
                                        Select Supervisor Rating *
                                    </Typography>


                                    <Select
                                        fullWidth
                                        size="small"
                                        value={
                                            supervisorGoalRating || ""
                                        }
                                        onChange={(event) =>
                                            handleSupervisorRatingChange(
                                                goalId,
                                                event.target.value
                                            )
                                        }
                                        disabled={!finalMonthHasData}
                                    >

                                        <MenuItem value="">
                                            Select Rating
                                        </MenuItem>

                                        {ratingOptions.map(
                                            option => (

                                                <MenuItem
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </MenuItem>

                                            )
                                        )}

                                    </Select>

                                </>

                            )}


                            {allowSupervisorNotes && (

                                <TextField
                                    fullWidth
                                    size="small"
                                    sx={{ mt: 2 }}
                                    value={
                                        supervisorNotes
                                    }
                                    multiline
                                    minRows={2}
                                    placeholder="Supervisor notes..."
                                />

                            )}

                        </Box>

                    )}

                    </Box>

                    );
                })}

            </Box>

        );

    }


    /*
     * ==========================================
     * HR PREVIEW
     * ==========================================
     */

    if (previewMode === "hr") {

        const hrGoals =
            Array.isArray(
                responses?.goal_self_evaluation?.hr_goals
            )
                ? responses.goal_self_evaluation.hr_goals
                : (
                    Array.isArray(finalizedGoals)
                        ? finalizedGoals
                        : []
                );

        const hrGoalSelfEvaluation =
            responses?.goal_self_evaluation || {};

        return (

            <Box>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    mb={3}
                >

                    <Typography
                        sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#0F172A",
                        }}
                    >
                        Quarterly Goals
                    </Typography>


                    <Box
                        sx={{
                            px: 1.5,
                            py: 0.6,
                            border:
                                "1px solid #CBD5E1",
                            borderRadius: 1.5,
                            bgcolor: "#F8FAFC",
                            fontSize: 12,
                            fontWeight: 600,
                        }}
                    >
                        Section Weight: {sectionWeight}
                    </Box>

                </Stack>


                <Box
                    sx={{
                        mb: 4,
                    }}
                >

                    {hrGoals.map((goal, index) => (

                        (() => {
                        const goalId = goal.id || `goal-${index}`;

                        const hrMonthlyProgress =
                            hrGoalSelfEvaluation.monthly_progress_by_goal?.[goalId] || {};

                        const finalMonth = months[months.length - 1];

                        const finalMonthHasData =
                            Boolean(
                                hrMonthlyProgress?.[finalMonth]?.trim()
                            );

                        const hrCompletionDate =
                            hrGoalSelfEvaluation.completion_date_by_goal?.[goalId] || "";

                        const finalRating =
                            hrGoalSelfEvaluation.final_rating_by_goal?.[goalId] || "";

                        const employeeGoalRating =
                            employeeResponses?.goal_self_evaluation
                                ?.employee_rating_by_goal?.[goalId] || "";

                        const supervisorGoalRating =
                            supervisorResponses?.goal_self_evaluation
                                ?.supervisor_rating_by_goal?.[goalId] || "";

                        return <Box
                            key={goalId}
                            sx={{
                                mb: 4,
                            }}
                        >

                        <HRGoalTable
                            targetDescription={
                                responses?.goal_self_evaluation
                                    ?.target_description_by_goal?.[goalId] ??
                                goal.description ??
                                goal.targetDescription ??
                                "--"
                            }
                            monthlyProgress={
                                hrMonthlyProgress
                            }
                            completionDate={
                                hrCompletionDate
                            }
                            onMonthlyProgressChange={
                                handleHrMonthlyProgressChange
                            }
                            onTargetDescriptionChange={
                                handleHrTargetDescriptionChange
                            }
                            goalId={goalId}
                            onCompletionDateChange={
                                handleHrCompletionDateChange
                            }
                            months={months}
                            goalHeader={
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mb={2}
                                >

                                    <Typography
                                        sx={{
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: "#7C3AED",
                                        }}
                                    >
                                        Goal # {index + 1}
                                    </Typography>


                                    <Stack
                                        direction="row"
                                        spacing={2}
                                    >

                                        <Typography
                                            sx={{
                                                fontSize: 13,
                                            }}
                                        >
                                            Goal Weight:{" "}
                                            <strong>
                                                {goalWeight}
                                            </strong>
                                        </Typography>


                                        <Typography
                                            sx={{
                                                fontSize: 13,
                                            }}
                                        >
                                            Total Points:{" "}
                                            <strong>
                                                {totalPoints}
                                            </strong>
                                        </Typography>

                                    </Stack>

                                    <IconButton
                                        size="small"
                                        color="error"
                                        aria-label={`Remove Goal ${index + 1}`}
                                        onClick={() => handleHrRemoveGoal(goalId)}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>

                                </Stack>
                            }
                        />


                        <Box
                            sx={{
                                mt: 2,
                                display: "grid",
                                gridTemplateColumns:
                                    {
                                        xs: "1fr",
                                        md: "1fr 1fr 1fr",
                                    },
                                gap: 2,
                            }}
                        >

                            {console.log("HR GOAL RATING DEBUG", {
                                goalId,
                                employeeGoalRating,
                                supervisorGoalRating:
                                    supervisorResponses?.goal_self_evaluation
                                        ?.supervisor_rating_by_goal?.[goalId] || "",
                                hrFinalRating: finalRating,
                                employeeRatingByGoal:
                                    employeeResponses?.goal_self_evaluation
                                        ?.employee_rating_by_goal,
                                supervisorRatingByGoal:
                                    supervisorResponses?.goal_self_evaluation
                                        ?.supervisor_rating_by_goal,
                                hrFinalRatingByGoal:
                                    responses?.goal_self_evaluation
                                        ?.final_rating_by_goal,
                            })}

                            <RatingBox
                                label="Employee Selection"
                                value={
                                    employeeGoalRating
                                }
                            />


                            <RatingBox
                                label="Supervisor Selection"
                                value={
                                    supervisorGoalRating
                                }
                            />


                            <Box
                                sx={{
                                    p: 2,
                                    border:
                                        "1px solid #BFDBFE",
                                    borderRadius: 2,
                                    bgcolor: "#F8FBFF",
                                }}
                            >

                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: "#2563EB",
                                        mb: 1,
                                    }}
                                >
                                    Final Agreed Rating
                                    (Meeting Decision)
                                </Typography>


                                <Select
                                    fullWidth
                                    size="small"
                                    value={
                                        finalRating
                                    }
                                    disabled={!finalMonthHasData}
                                    onChange={(event) =>
                                        handleHrFinalRatingChange(
                                            goalId,
                                            event.target.value
                                        )
                                    }
                                >

                                    <MenuItem value="">
                                        Select Rating
                                    </MenuItem>

                                    {ratingOptions.map(
                                        option => (

                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>

                                        )
                                    )}

                                </Select>

                            </Box>

                        </Box>

                        </Box>;
                        })()

                    ))}

                    <Button
                        variant="outlined"
                        onClick={handleHrAddGoal}
                        sx={{ mt: 2 }}
                    >
                        + Add Goal
                    </Button>

                </Box>


            </Box>

        );

    }


    return null;

}


/*
 * ==========================================
 * EMPLOYEE / SUPERVISOR TABLE
 * ==========================================
 */

function GoalProgressTable({
    targetDescription,
    monthlyProgress,
    showTargetDescription = true,
    showMonthlyProgress = true,
    months = ["April", "May", "June"],
}) {

    return (

        <Box
            sx={{
                width: "100%",
                border:
                    "1px solid #CBD5E1",
                overflow: "hidden",
            }}
        >

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "1.2fr 1fr 1fr 1fr",
                }}
            >

                <Box
                    sx={{
                        p: 1.5,
                        bgcolor: "#F8FAFC",
                        borderRight:
                            "1px solid #CBD5E1",
                        borderBottom:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        Target Description
                    </Typography>

                </Box>


                <Box
                    sx={{
                        gridColumn: "span 3",
                        p: 1.5,
                        bgcolor: "#F8FAFC",
                        textAlign: "center",
                        borderBottom:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        Monthly Progress Tracking
                    </Typography>


                    <Typography
                        sx={{
                            fontSize: 10,
                            color: "text.secondary",
                        }}
                    >
                        (Synced from Master Sheet)
                    </Typography>

                </Box>


                <Box
                    sx={{
                        p: 1.2,
                        bgcolor: "#F8FAFC",
                        borderRight:
                            "1px solid #CBD5E1",
                    }}
                />


                {months.map(
                    month => (

                        <Box
                            key={month}
                            sx={{
                                p: 1.2,
                                bgcolor: "#F8FAFC",
                                textAlign: "center",
                                borderRight:
                                    month !== months[months.length - 1]
                                        ? "1px solid #CBD5E1"
                                        : "none",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                }}
                            >
                                {month}
                            </Typography>

                        </Box>

                    )
                )}


                <Box
                    sx={{
                        p: 1.5,
                        minHeight: 80,
                        borderRight:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            color: "#334155",
                        }}
                    >
                        {targetDescription}
                    </Typography>

                </Box>


                {months.map(
                    month => (

                        <Box
                            key={month}
                            sx={{
                                p: 1.5,
                                minHeight: 80,
                                borderRight:
                                    month !== months[months.length - 1]
                                        ? "1px solid #CBD5E1"
                                        : "none",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    color: "#334155",
                                }}
                            >
                                {
                                    monthlyProgress[
                                        month
                                    ] || "--"
                                }
                            </Typography>

                        </Box>

                    )
                )}

            </Box>

        </Box>

    );

}


/*
 * ==========================================
 * HR TABLE
 * ==========================================
 */

function HRGoalTable({
    goalId,
    targetDescription,
    monthlyProgress,
    completionDate,
    onMonthlyProgressChange,
    onCompletionDateChange,
    onTargetDescriptionChange,
    months = [],
    showTargetDescription = true,
    showMonthlyProgress = true,
    goalHeader,
}) {
    return (

        <Box
            className="pdf-goal-table-block"
            sx={{
                width: "100%",
                minWidth: 0,
                border:
                    "1px solid #CBD5E1",
                overflow: "hidden",
            }}
        >

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "2fr 0.8fr 0.8fr 0.8fr 0.8fr",
                }}
            >

                <Box
                    sx={{
                        gridColumn: "1 / -1",
                    }}
                >
                    {goalHeader}
                </Box>

                <Box
                    sx={{
                        p: 1.5,
                        bgcolor: "#F8FAFC",
                        borderRight:
                            "1px solid #CBD5E1",
                        borderBottom:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        Goals
                    </Typography>

                </Box>


                <Box
                    sx={{
                        gridColumn: "span 3",
                        p: 1.5,
                        bgcolor: "#F8FAFC",
                        textAlign: "center",
                        borderBottom:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        Defined Completion
                    </Typography>

                </Box>


                <Box
                    sx={{
                        p: 1.5,
                        bgcolor: "#F8FAFC",
                        textAlign: "center",
                        borderBottom:
                            "1px solid #CBD5E1",
                    }}
                >

                    <Typography
                        sx={{
                            fontSize: 13,
                            fontWeight: 700,
                        }}
                    >
                        Completion Date
                    </Typography>

                </Box>


                <Box
                    sx={{
                        p: 1.2,
                        bgcolor: "#F8FAFC",
                        borderRight:
                            "1px solid #CBD5E1",
                    }}
                />


                {months.map(
                    month => (

                        <Box
                            key={month}
                            sx={{
                                p: 1.2,
                                bgcolor: "#F8FAFC",
                                textAlign: "center",
                                borderRight:
                                    "1px solid #CBD5E1",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                }}
                            >
                                {month}
                            </Typography>

                        </Box>

                    )
                )}


                <Box
                    sx={{
                        p: 1.2,
                        bgcolor: "#F8FAFC",
                    }}
                />


                <Box
                    sx={{
                        p: 1,
                        borderRight:
                            "1px solid #CBD5E1",
                    }}
                >

                    <TextField
                        fullWidth
                        multiline
                        minRows={1}
                        maxRows={4}
                        value={targetDescription || ""}
                        onChange={(event) =>
                            onTargetDescriptionChange(
                                goalId,
                                event.target.value
                            )
                        }
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#FFFFFF",
                                alignItems: "flex-start",
                            },
                            "& .MuiInputBase-input": {
                                fontSize: 13,
                                overflowWrap: "anywhere",
                            },
                        }}
                    />

                </Box>


                {months.map(
                    month => (

                        <Box
                            key={month}
                            sx={{
                                p: 1,
                                borderRight:
                                    "1px solid #CBD5E1",
                            }}
                        >

                            <TextField
                                fullWidth
                                size="small"
                                value={monthlyProgress[month] || ""}
                                onChange={(event) =>
                                    onMonthlyProgressChange(
                                        goalId,
                                        month,
                                        event.target.value
                                    )
                                }
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#FFFFFF",
                                    },
                                    "& .MuiInputBase-input": {
                                        fontSize: 13,
                                    },
                                }}
                            />

                        </Box>

                    )
                )}


                <Box
                    sx={{
                        p: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                    <TextField
                        fullWidth
                        size="small"
                        type="date"
                        value={completionDate || ""}
                        onChange={(event) =>
                            onCompletionDateChange(
                                goalId,
                                event.target.value
                            )
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#FFFFFF",
                            },
                            "& .MuiInputBase-input": {
                                fontSize: 13,
                            },
                        }}
                    />

                </Box>

            </Box>

        </Box>

    );

}

/*
 * ==========================================
 * HR RATING BOX
 * ==========================================
 */

function RatingBox({
    label,
    value,
}) {

    return (

        <Box
            sx={{
                p: 2,
                border:
                    "1px solid #CBD5E1",
                borderRadius: 2,
                bgcolor: "#F8FAFC",
            }}
        >

            <Typography
                sx={{
                    fontSize: 13,
                    color: "#475569",
                    mb: 1,
                }}
            >
                {label}
            </Typography>


            <Typography
                sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#0F172A",
                }}
            >
                {value}
            </Typography>

        </Box>

    );

}